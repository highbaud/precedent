import type { StateReport } from "../types";
import {
  DEMOGRAPHICS,
  NATIONAL_BENCHMARKS,
  DEMOGRAPHICS_META,
} from "../data/demographics";

/** Compact USD scale ($X.XT / $X.XB / $XM) for the trade bars. */
function fmtUSD(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
  return `$${n.toLocaleString("en-US")}`;
}

type Tone = "state" | "nat" | "trade";

function Bar({
  label,
  value,
  max,
  display,
  tone = "state",
}: {
  label: string;
  value: number;
  max: number;
  display: string;
  tone?: Tone;
}) {
  // Floor the width so even small values render a visible sliver.
  const pct = max > 0 ? Math.max(3, (value / max) * 100) : 0;
  return (
    <div className="dp-row">
      <span className="dp-row-label">{label}</span>
      <div className="dp-track">
        <div className={`dp-fill dp-${tone}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="dp-row-val mono">{display}</span>
    </div>
  );
}

/**
 * Verified-data chart panel injected into the cover letter at the [[DATA]]
 * slot. Renders only on screen and in the printed/PDF document — text exports
 * strip the marker. EVERY figure is the same sourced value shown in the state
 * profile; nothing here is estimated or interpolated.
 */
export function DataPanel({ report }: { report: StateReport }) {
  const d = DEMOGRAPHICS[report.state.code];
  const n = NATIONAL_BENCHMARKS;
  const st = report.state.name;

  const bankMax =
    Math.max(d.unbankedRate, n.unbankedRate, d.underbankedRate, n.underbankedRate) *
    1.12;
  const tradeMax = Math.max(d.exports, d.imports);

  return (
    <figure className="data-panel" aria-label={`${st} by the numbers`}>
      <figcaption className="dp-title">{st} by the numbers</figcaption>

      <div className="dp-group">
        <h4 className="dp-group-title">Banking access vs. the nation</h4>
        <Bar
          label={`${st} unbanked`}
          value={d.unbankedRate}
          max={bankMax}
          display={`${d.unbankedRate}%`}
          tone="state"
        />
        <Bar
          label="U.S. unbanked"
          value={n.unbankedRate}
          max={bankMax}
          display={`${n.unbankedRate}%`}
          tone="nat"
        />
        <Bar
          label={`${st} underbanked`}
          value={d.underbankedRate}
          max={bankMax}
          display={`${d.underbankedRate}%`}
          tone="state"
        />
        <Bar
          label="U.S. underbanked"
          value={n.underbankedRate}
          max={bankMax}
          display={`${n.underbankedRate}%`}
          tone="nat"
        />
        <p className="dp-note">
          Households with no bank account, and banked households that are
          underbanked. These are the constituents low-fee digital-asset rails
          can reach.
        </p>
      </div>

      <div className="dp-group">
        <h4 className="dp-group-title">
          International goods trade, {DEMOGRAPHICS_META.tradeYear}
        </h4>
        <Bar
          label="Exports"
          value={d.exports}
          max={tradeMax}
          display={fmtUSD(d.exports)}
          tone="trade"
        />
        <Bar
          label="Imports"
          value={d.imports}
          max={tradeMax}
          display={fmtUSD(d.imports)}
          tone="trade"
        />
        <p className="dp-note">
          Cross-border goods flows that faster, lower-fee settlement rails can
          carry, a {fmtUSD(d.exports + d.imports)} annual base.
        </p>
      </div>

      <figcaption className="dp-sources">
        Sources: FDIC National Survey of Unbanked &amp; Underbanked Households (
        {DEMOGRAPHICS_META.fdicSurveyYear}); U.S. Census Bureau, Foreign Trade
        Division ({DEMOGRAPHICS_META.tradeYear}).
      </figcaption>
    </figure>
  );
}
