import type { StateCode } from "../types";
import { STATES } from "../data/states";

interface Props {
  value: StateCode | "";
  onChange: (code: StateCode) => void;
}

export function StateSelector({ value, onChange }: Props) {
  return (
    <label className="state-selector">
      <span className="ss-label">Select a state</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as StateCode)}
      >
        <option value="" disabled>
          Choose a state or territory…
        </option>
        {STATES.map((s) => (
          <option key={s.code} value={s.code}>
            {s.name}
          </option>
        ))}
      </select>
    </label>
  );
}
