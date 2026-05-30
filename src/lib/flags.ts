import type { StateCode } from "../types";

/**
 * Public-domain official state flag, served via Wikimedia Commons'
 * Special:FilePath redirect (stable, no API key). All U.S. state flags are in
 * the public domain. Rendered in an <img> with a graceful fallback to the state
 * silhouette if the asset fails to load (offline, renamed file, etc.).
 */
const FILE_NAME: Partial<Record<StateCode, string>> = {
  DC: "Flag_of_Washington,_D.C..svg",
};

export function flagUrl(code: StateCode, name: string): string {
  const file = FILE_NAME[code] ?? `Flag_of_${name.replace(/ /g, "_")}.svg`;
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    file
  )}?width=320`;
}
