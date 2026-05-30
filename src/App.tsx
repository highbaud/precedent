import { useEffect, useMemo, useState } from "react";
import "./App.css";
import type { CategoryId, StateCode } from "./types";
import { buildReport } from "./lib/gaps";
import {
  LAST_UPDATED,
  PRIMARY_SOURCES,
  SECONDARY_SOURCES,
} from "./data/legislation";
import {
  loadLetterhead,
  saveLetterhead,
  type LetterheadConfig,
} from "./lib/letterhead";
import { StateSelector } from "./components/StateSelector";
import { USMap } from "./components/USMap";
import { GapDashboard } from "./components/GapDashboard";
import { ProposalViewer } from "./components/ProposalViewer";
import { FullPackage } from "./components/FullPackage";
import { ContactsPanel } from "./components/ContactsPanel";
import { OrganizationsPanel } from "./components/OrganizationsPanel";
import { SettingsPanel } from "./components/SettingsPanel";
import { NetworkIcon } from "./components/icons";

type Theme = "light" | "dark";

export default function App() {
  const [code, setCode] = useState<StateCode | "">("");
  const [activeGapId, setActiveGapId] = useState<CategoryId | null>(null);
  const [showPackage, setShowPackage] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showOrgs, setShowOrgs] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("precedent.theme") as Theme) || "light"
  );
  const [letterhead, setLetterhead] = useState<LetterheadConfig>(loadLetterhead);

  useEffect(() => {
    if (theme === "dark") document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
    localStorage.setItem("precedent.theme", theme);
  }, [theme]);

  const updateLetterhead = (cfg: LetterheadConfig) => {
    setLetterhead(cfg);
    saveLetterhead(cfg);
  };

  const report = useMemo(() => (code ? buildReport(code) : null), [code]);
  const activeGap =
    report?.gaps.find((g) => g.category.id === activeGapId) ?? null;

  const selectState = (c: StateCode) => {
    setCode(c);
    setActiveGapId(null);
    setShowPackage(false);
    setShowContacts(false);
    setShowOrgs(false);
  };

  const selectGap = (id: CategoryId) => {
    setActiveGapId(id);
    setShowPackage(false);
    setShowContacts(false);
  };

  return (
    <div className="app">
      <header className="topbar">
        <span className="topbar-spacer" aria-hidden="true" />
        <div className="brand">
          <div className="brand-lockup">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M2.5 8.2 12 2.6l9.5 5.6" />
                <path d="M5 8.6v8.4M9 8.6v8.4M13 8.6v8.4M17 8.6v8.4M19 8.6v8.4" />
                <path d="M3.4 17.6h17.2M2.4 20.4h19.2" />
              </svg>
            </span>
            <h1>Precedent</h1>
          </div>
          <span className="topbar-sub">
            Model crypto legislation, built on precedent
          </span>
        </div>
        <div className="topbar-actions">
          <button
            className={showOrgs ? "ghost on" : "ghost"}
            onClick={() => setShowOrgs((v) => !v)}
          >
            <NetworkIcon className="btn-icon" />
            Allied orgs
          </button>
          <button
            className="ghost"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            title="Toggle light / dark"
          >
            {theme === "light" ? "◐ Dark" : "◐ Light"}
          </button>
          <button className="ghost" onClick={() => setShowSettings(true)}>
            Settings
          </button>
        </div>
      </header>

      <div className="disclaimer-banner">
        Model text for advocacy — <strong>not legal advice</strong>. Verify
        every provision against current {report ? report.state.name : "state"}{" "}
        statutes before filing. Data current as of {LAST_UPDATED}.
      </div>

      <main className="main">
        {showOrgs && (
          <OrganizationsPanel
            state={report?.state}
            onClose={() => setShowOrgs(false)}
          />
        )}

        {!showOrgs && !report && (
          <div className="landing">
            <div className="landing-card">
              <h2 className="landing-title">Which state are you working in?</h2>
              <p className="intro-help">
                Pick a state to see which categories of pro–digital-asset
                legislation it has not yet enacted, then generate a ready-to-file
                briefing and model bill for each gap.
              </p>
              <StateSelector value={code} onChange={selectState} />
            </div>
            <USMap value={code} onSelect={selectState} />
          </div>
        )}

        {!showOrgs && report && (
          <div className="state-view" key={code}>
            <div className="intro intro-compact">
              <StateSelector value={code} onChange={selectState} />
            </div>

            <GapDashboard
              report={report}
              activeGapId={activeGapId}
              showContacts={showContacts}
              onSelectGap={selectGap}
              onBuildPackage={() => {
                setShowPackage(true);
                setShowContacts(false);
                setActiveGapId(null);
              }}
              onShowContacts={() => {
                setShowContacts(true);
                setShowPackage(false);
                setActiveGapId(null);
              }}
            />

            {showContacts && (
              <ContactsPanel
                state={report.state}
                onClose={() => setShowContacts(false)}
              />
            )}

            {!showContacts && showPackage && report.gaps.length > 0 && (
              <FullPackage
                report={report}
                letterhead={letterhead}
                onLetterhead={updateLetterhead}
                onClose={() => setShowPackage(false)}
              />
            )}

            {!showContacts &&
              !showPackage &&
              !activeGap &&
              report.gaps.length > 0 && (
                <p className="empty">
                  Select a gap above to generate its proposal, build a full-state
                  package, or view key legislative contacts.
                </p>
              )}

            {!showContacts && !showPackage && activeGap && (
              <ProposalViewer
                report={report}
                gap={activeGap}
                letterhead={letterhead}
                onLetterhead={updateLetterhead}
              />
            )}
          </div>
        )}
      </main>

      <footer className="appfoot">
        <figure className="appfoot-quote">
          <blockquote>
            It&rsquo;s not a faith in technology. It&rsquo;s faith in people.
          </blockquote>
          <figcaption>— Steve Jobs</figcaption>
        </figure>

        <div className="appfoot-inner">
          <div className="appfoot-brand">
            <span className="appfoot-mark">Precedent</span>
            <p className="appfoot-tagline">
              Model crypto legislation, built on precedent.
            </p>
            <a
              className="appfoot-ig"
              href="https://www.instagram.com/uarkcryptohogs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
              </svg>
              @uarkcryptohogs
            </a>
          </div>

          <div className="appfoot-col">
            <h4>Project</h4>
            <p className="appfoot-credit">
              A project of the{" "}
              <strong>University of Arkansas Crypto Hogs</strong>, in part by{" "}
              <strong>Max Avery</strong>, Stand With Crypto chapter president,
              Arkansas.
            </p>
          </div>

          <div className="appfoot-col">
            <h4>Primary sources</h4>
            <ul className="appfoot-list">
              {PRIMARY_SOURCES.map((s) => (
                <li key={s.label}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  ) : (
                    s.label
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="appfoot-col">
            <h4>Additional sources</h4>
            <ul className="appfoot-list">
              {SECONDARY_SOURCES.map((s) => (
                <li key={s.label}>{s.label}</li>
              ))}
            </ul>
            <button
              className="appfoot-orgs-btn"
              onClick={() => {
                setShowOrgs(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <NetworkIcon className="btn-icon" />
              Allied orgs
            </button>
          </div>
        </div>

        <div className="appfoot-legal">
          <span>Data current as of {LAST_UPDATED}.</span>
          <span aria-hidden="true">·</span>
          <span>
            Model text for advocacy — <strong>not legal advice</strong>. Verify
            every provision against current state statutes before filing.
          </span>
        </div>
      </footer>

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  );
}
