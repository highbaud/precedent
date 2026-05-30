import type { StateCode } from "../types";
import { STATE_SHAPES } from "../data/stateShapes";
import { STATES } from "../data/states";

/**
 * Clickable US map for the landing screen. Every state path comes from
 * STATE_SHAPES, which stores each silhouette in the same full-US coordinate
 * space, so rendering them all under one viewBox reassembles the national map
 * (Alaska and Hawaii sit as insets at the lower-left). Clicking a state selects
 * it; the dropdown selector remains the precise fallback.
 */

/** Union of every per-state crop box — covers all 51 paths incl. AK/HI insets. */
const VIEWBOX = "103.31 3.12 1122.46 775.74";

interface Props {
  value: StateCode | "";
  onSelect: (code: StateCode) => void;
}

export function USMap({ value, onSelect }: Props) {
  return (
    <div className="us-map-wrap">
      <svg
        className="us-map"
        viewBox={VIEWBOX}
        role="group"
        aria-label="United States — choose a state"
      >
        {STATES.map((s) => {
          const shape = STATE_SHAPES[s.code];
          if (!shape) return null;
          return (
            <path
              key={s.code}
              d={shape.path}
              className={value === s.code ? "us-state selected" : "us-state"}
              role="button"
              tabIndex={0}
              aria-label={s.name}
              onClick={() => onSelect(s.code)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(s.code);
                }
              }}
            >
              <title>{s.name}</title>
            </path>
          );
        })}
      </svg>
      <p className="us-map-hint">
        Click a state, or use the menu above. Alaska &amp; Hawaii are shown at
        the lower left.
      </p>
    </div>
  );
}
