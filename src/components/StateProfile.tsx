import { useState } from "react";
import type { StateMeta } from "../types";
import {
  DEMOGRAPHICS,
  NATIONAL_BENCHMARKS,
  DEMOGRAPHICS_META,
} from "../data/demographics";
import { flagUrl } from "../lib/flags";
import { StateShape } from "./StateShape";

interface Props {
  state: StateMeta;
}

function compare(value: number, national: number): string {
  const diff = +(value - national).toFixed(1);
  if (diff === 0) return "at the national rate";
  const dir = diff > 0 ? "above" : "below";
  return `${Math.abs(diff)} pts ${dir} the ${national}% national rate`;
}

/** Compact USD scale ($X.XT / $X.XB / $XM) for large trade figures. */
function fmtUSD(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
  return `$${n.toLocaleString("en-US")}`;
}

/**
 * Visual state profile: official flag, accurate silhouette, and the verified
 * banking-access figures that anchor the constituent case for digital-asset
 * legislation. Every number is sourced; no per-state figure is estimated.
 */
export function StateProfile({ state }: Props) {
  const [flagOk, setFlagOk] = useState(true);
  const d = DEMOGRAPHICS[state.code];
  const pop = d.population.toLocaleString("en-US");

  return (
    <section className="state-profile">
      <div className="sp-graphics">
        <div className="sp-flag">
          {flagOk ? (
            <img
              src={flagUrl(state.code, state.name)}
              alt={`Flag of ${state.name}`}
              loading="lazy"
              onError={() => setFlagOk(false)}
            />
          ) : (
            <StateShape
              code={state.code}
              className="sp-shape-fallback"
              title={`${state.name} outline`}
            />
          )}
        </div>
        <StateShape
          code={state.code}
          className="sp-shape"
          title={`${state.name} outline`}
        />
      </div>

      <div className="sp-stats">
        <div className="sp-stat">
          <PeopleIcon />
          <div>
            <span className="sp-num mono">{pop}</span>
            <span className="sp-label">residents · Census {DEMOGRAPHICS_META.populationYear}</span>
          </div>
        </div>
        <div className="sp-stat">
          <BankIcon />
          <div>
            <span className="sp-num mono">{d.unbankedRate}%</span>
            <span className="sp-label">
              unbanked — {compare(d.unbankedRate, NATIONAL_BENCHMARKS.unbankedRate)}
            </span>
          </div>
        </div>
        <div className="sp-stat">
          <WalletIcon />
          <div>
            <span className="sp-num mono">{d.underbankedRate}%</span>
            <span className="sp-label">
              underbanked —{" "}
              {compare(d.underbankedRate, NATIONAL_BENCHMARKS.underbankedRate)}
            </span>
          </div>
        </div>
        <div className="sp-stat">
          <JobsIcon />
          <div>
            <span className="sp-num mono">{d.unemploymentRate}%</span>
            <span className="sp-label">
              unemployment — {compare(d.unemploymentRate, NATIONAL_BENCHMARKS.unemploymentRate)}
            </span>
          </div>
        </div>
        <div className="sp-stat">
          <GlobeIcon />
          <div>
            <span className="sp-num mono">{fmtUSD(d.exports + d.imports)}</span>
            <span className="sp-label">
              intl. goods trade, {DEMOGRAPHICS_META.tradeYear} —{" "}
              <strong>{fmtUSD(d.exports)}</strong> exports ·{" "}
              <strong>{fmtUSD(d.imports)}</strong> imports — cross-border flows
              low-fee digital-asset rails can carry
            </span>
          </div>
        </div>
        <div className="sp-stat">
          <CoinIcon />
          <div>
            <span className="sp-num mono">{NATIONAL_BENCHMARKS.cryptoOwnership}%</span>
            <span className="sp-label">U.S. households use crypto (national)</span>
          </div>
        </div>
      </div>

      <p className="sp-sources">
        Banking access:{" "}
        <a href={DEMOGRAPHICS_META.fdicSourceUrl} target="_blank" rel="noreferrer">
          FDIC National Survey of Unbanked &amp; Underbanked Households
        </a>{" "}
        ({DEMOGRAPHICS_META.fdicSurveyYear}). Population:{" "}
        <a href={DEMOGRAPHICS_META.populationSourceUrl} target="_blank" rel="noreferrer">
          U.S. Census Bureau
        </a>{" "}
        ({DEMOGRAPHICS_META.populationYear}). Unemployment:{" "}
        <a href={DEMOGRAPHICS_META.blsSourceUrl} target="_blank" rel="noreferrer">
          U.S. Bureau of Labor Statistics (LAUS, seasonally adjusted)
        </a>
        , {DEMOGRAPHICS_META.unemploymentPeriod}. International goods trade:{" "}
        <a
          href={DEMOGRAPHICS_META.tradeExportsSourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          U.S. Census Bureau, Foreign Trade Division
        </a>{" "}
        (exports by origin of movement) and{" "}
        <a
          href={DEMOGRAPHICS_META.tradeImportsSourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          general imports by state of destination
        </a>{" "}
        ({DEMOGRAPHICS_META.tradeYear}). Households without or with limited bank
        access are precisely the constituents low-fee digital-asset payment
        rails can reach — and a state's cross-border trade is the volume those
        rails could settle faster and cheaper — core arguments for the proposals
        below.
      </p>
    </section>
  );
}

/* —— inline icons (Lucide geometry, currentColor) —— */
const SP = {
  className: "sp-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function PeopleIcon() {
  return (
    <svg {...SP}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function BankIcon() {
  return (
    <svg {...SP}>
      <line x1="3" x2="21" y1="22" y2="22" />
      <line x1="6" x2="6" y1="18" y2="11" />
      <line x1="10" x2="10" y1="18" y2="11" />
      <line x1="14" x2="14" y1="18" y2="11" />
      <line x1="18" x2="18" y1="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  );
}
function WalletIcon() {
  return (
    <svg {...SP}>
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}
function CoinIcon() {
  return (
    <svg {...SP}>
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 18V6" />
    </svg>
  );
}
function JobsIcon() {
  return (
    <svg {...SP}>
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg {...SP}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}
