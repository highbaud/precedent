/**
 * Optional AI refinement. The curated template is always the base and the
 * fallback — on ANY error the caller keeps the original text. Supports several
 * popular providers; the user brings their own key, stored only in this browser.
 *
 * NOTE: all of these calls go directly from the browser with the user's key in
 * page context (Anthropic additionally needs the dangerous-direct-browser-access
 * header). Acceptable for a local, single-user advocacy tool; not for a shared
 * deployment.
 */

export type Provider = "anthropic" | "openai" | "xai" | "google" | "openrouter";

export interface ProviderDef {
  id: Provider;
  label: string;
  keyPlaceholder: string;
  /** where to get a key */
  keysUrl: string;
  models: { id: string; label: string }[];
}

export const PROVIDERS: ProviderDef[] = [
  {
    id: "anthropic",
    label: "Anthropic (Claude)",
    keyPlaceholder: "sk-ant-…",
    keysUrl: "https://console.anthropic.com/settings/keys",
    models: [
      { id: "claude-opus-4-7", label: "Claude Opus 4.7 (most capable)" },
      { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (balanced)" },
      { id: "claude-haiku-4-5-20251001", label: "Claude Haiku 4.5 (fastest)" },
    ],
  },
  {
    id: "openai",
    label: "OpenAI (GPT)",
    keyPlaceholder: "sk-…",
    keysUrl: "https://platform.openai.com/api-keys",
    models: [
      { id: "gpt-4.1", label: "GPT-4.1 (most capable)" },
      { id: "gpt-4o", label: "GPT-4o (balanced)" },
      { id: "gpt-4o-mini", label: "GPT-4o mini (fastest)" },
    ],
  },
  {
    id: "xai",
    label: "xAI (Grok)",
    keyPlaceholder: "xai-…",
    keysUrl: "https://console.x.ai/",
    models: [
      { id: "grok-3", label: "Grok 3" },
      { id: "grok-3-mini", label: "Grok 3 mini (fastest)" },
      { id: "grok-2-latest", label: "Grok 2" },
    ],
  },
  {
    id: "google",
    label: "Google (Gemini)",
    keyPlaceholder: "AIza…",
    keysUrl: "https://aistudio.google.com/app/apikey",
    models: [
      { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash (fast)" },
      { id: "gemini-1.5-pro", label: "Gemini 1.5 Pro (capable)" },
      { id: "gemini-1.5-flash", label: "Gemini 1.5 Flash (fastest)" },
    ],
  },
  {
    id: "openrouter",
    label: "OpenRouter (any model)",
    keyPlaceholder: "sk-or-…",
    keysUrl: "https://openrouter.ai/keys",
    models: [
      { id: "anthropic/claude-sonnet-4.6", label: "Claude Sonnet 4.6" },
      { id: "openai/gpt-4.1", label: "GPT-4.1" },
      { id: "google/gemini-2.0-flash-001", label: "Gemini 2.0 Flash" },
      { id: "meta-llama/llama-3.3-70b-instruct", label: "Llama 3.3 70B" },
    ],
  },
];

const PROVIDER_STORAGE = "precedent.provider";
const keyStorage = (p: Provider) => `precedent.key.${p}`;
const modelStorage = (p: Provider) => `precedent.model.${p}`;

export function getProvider(): Provider {
  const p = localStorage.getItem(PROVIDER_STORAGE) as Provider | null;
  return p && PROVIDERS.some((d) => d.id === p) ? p : "anthropic";
}
export function setProvider(p: Provider): void {
  localStorage.setItem(PROVIDER_STORAGE, p);
}

export function getApiKey(provider: Provider = getProvider()): string {
  return localStorage.getItem(keyStorage(provider)) ?? "";
}
export function setApiKey(provider: Provider, key: string): void {
  if (key) localStorage.setItem(keyStorage(provider), key);
  else localStorage.removeItem(keyStorage(provider));
}

export function providerDef(p: Provider): ProviderDef {
  return PROVIDERS.find((d) => d.id === p) ?? PROVIDERS[0];
}

export function getModel(provider: Provider = getProvider()): string {
  return (
    localStorage.getItem(modelStorage(provider)) ??
    providerDef(provider).models[0].id
  );
}
export function setModel(provider: Provider, model: string): void {
  localStorage.setItem(modelStorage(provider), model);
}

const SYSTEM = `You are a legislative drafting assistant helping an advocacy team refine a model bill or briefing.
Tighten and clarify the language while preserving the legal structure, section numbering, and markdown formatting exactly.

STRICT RULES:
- The document MUST remain PRO-cryptocurrency / pro-digital-asset. Preserve every right, protection, authorization, or incentive. NEVER weaken, restrict, ban, tax-burden, or add prohibitions, surveillance, or anti-crypto provisions. If anything reads as restrictive, leave it as written rather than expanding it.
- Do NOT invent or alter statutes, bill numbers, citations, vote counts, dates, dollar thresholds, or facts. Do NOT add legal claims that were not present in the input.
- Keep the same document type (briefing one-pager OR formal bill text) as the input.
- Return ONLY the refined document, no preamble or commentary.`;

export async function refineWithAI(text: string, context: string): Promise<string> {
  const provider = getProvider();
  const key = getApiKey(provider);
  if (!key)
    throw new Error("No API key set. Add one in Settings to use AI refine.");
  const model = getModel(provider);
  const userMsg = `Context: ${context}\n\nRefine the following document:\n\n${text}`;

  switch (provider) {
    case "anthropic":
      return callAnthropic(key, model, userMsg);
    case "google":
      return callGemini(key, model, userMsg);
    case "openai":
      return callOpenAICompatible(
        "https://api.openai.com/v1/chat/completions",
        key,
        model,
        userMsg,
        "OpenAI"
      );
    case "xai":
      return callOpenAICompatible(
        "https://api.x.ai/v1/chat/completions",
        key,
        model,
        userMsg,
        "xAI"
      );
    case "openrouter":
      return callOpenAICompatible(
        "https://openrouter.ai/api/v1/chat/completions",
        key,
        model,
        userMsg,
        "OpenRouter"
      );
  }
}

async function callAnthropic(key: string, model: string, userMsg: string) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 2048,
      system: SYSTEM,
      messages: [{ role: "user", content: userMsg }],
    }),
  });
  if (!res.ok) throw await apiError("Anthropic", res);
  const data = (await res.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };
  const out = data.content
    ?.filter((b) => b.type === "text")
    .map((b) => b.text ?? "")
    .join("")
    .trim();
  if (!out) throw new Error("Empty response from Anthropic.");
  return out;
}

/** OpenAI, xAI (Grok), and OpenRouter all speak the chat-completions shape. */
async function callOpenAICompatible(
  url: string,
  key: string,
  model: string,
  userMsg: string,
  name: string
) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 2048,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: userMsg },
      ],
    }),
  });
  if (!res.ok) throw await apiError(name, res);
  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const out = data.choices?.[0]?.message?.content?.trim();
  if (!out) throw new Error(`Empty response from ${name}.`);
  return out;
}

async function callGemini(key: string, model: string, userMsg: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent?key=${encodeURIComponent(key)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM }] },
      contents: [{ role: "user", parts: [{ text: userMsg }] }],
      generationConfig: { maxOutputTokens: 2048 },
    }),
  });
  if (!res.ok) throw await apiError("Google Gemini", res);
  const data = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const out = data.candidates?.[0]?.content?.parts
    ?.map((p) => p.text ?? "")
    .join("")
    .trim();
  if (!out) throw new Error("Empty response from Google Gemini.");
  return out;
}

async function apiError(name: string, res: Response): Promise<Error> {
  const detail = await res.text().catch(() => "");
  return new Error(`${name} API error ${res.status}. ${detail.slice(0, 200)}`);
}
