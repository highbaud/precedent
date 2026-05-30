import { useState } from "react";
import {
  PROVIDERS,
  getProvider,
  setProvider,
  getApiKey,
  setApiKey,
  getModel,
  setModel,
  providerDef,
  type Provider,
} from "../lib/refine";

interface Props {
  onClose: () => void;
}

export function SettingsPanel({ onClose }: Props) {
  const [provider, setProviderState] = useState<Provider>(getProvider());
  const [key, setKey] = useState(getApiKey(provider));
  const [model, setModelState] = useState(getModel(provider));
  const [saved, setSaved] = useState(false);

  const def = providerDef(provider);

  // when the provider changes, load that provider's stored key + model
  const onProviderChange = (p: Provider) => {
    setProviderState(p);
    setKey(getApiKey(p));
    setModelState(getModel(p));
    setSaved(false);
  };

  const save = () => {
    setProvider(provider);
    setApiKey(provider, key.trim());
    setModel(provider, model);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-head">
          <h2>Settings</h2>
          <button className="ghost close-btn close-x" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <p className="notice">
          The optional <strong>Refine with AI</strong> button tightens the
          wording of a draft. Bring your own key from any supported provider —
          it is entirely optional, every proposal works without it.
        </p>

        <label className="field">
          Provider
          <select
            value={provider}
            onChange={(e) => onProviderChange(e.target.value as Provider)}
          >
            {PROVIDERS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          API key
          <input
            type="password"
            value={key}
            placeholder={def.keyPlaceholder}
            onChange={(e) => setKey(e.target.value)}
            autoComplete="off"
          />
        </label>
        <p className="notice" style={{ marginTop: "calc(-1 * var(--space-xs))" }}>
          <a href={def.keysUrl} target="_blank" rel="noreferrer">
            Get a {def.label} key →
          </a>
        </p>

        <label className="field">
          Model
          <select value={model} onChange={(e) => setModelState(e.target.value)}>
            {def.models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </label>

        <p className="settings-warn">
          ⚠ Your key is stored only in this browser (localStorage) and sent
          directly to {def.label} from this page. This is fine for personal,
          single-user use. Do not enter a key on a shared or public deployment.
        </p>

        <div className="row">
          <button className="primary" onClick={save}>
            Save
          </button>
          {saved && <span className="export-status ok">Saved</span>}
        </div>
      </div>
    </div>
  );
}
