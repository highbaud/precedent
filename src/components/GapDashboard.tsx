import type { CategoryId, StateReport } from "../types";
import { gapPriorityLabel } from "../lib/gaps";
import { CategoryChip } from "./CategoryChip";
import { StateProfile } from "./StateProfile";
import { PhoneIcon, DownloadIcon } from "./icons";

interface Props {
  report: StateReport;
  activeGapId: CategoryId | null;
  showContacts: boolean;
  onSelectGap: (id: CategoryId) => void;
  onBuildPackage: () => void;
  onShowContacts: () => void;
}

export function GapDashboard({
  report,
  activeGapId,
  showContacts,
  onSelectGap,
  onBuildPackage,
  onShowContacts,
}: Props) {
  const total = report.enactedCategories.length + report.gaps.length;
  const enactedCount = report.enactedCategories.length;
  const pct = Math.round(report.coverage * 100);

  return (
    <section className="dashboard">
      <div className="coverage">
        <div className="coverage-head">
          <h2>{report.state.name}</h2>
          <div className="coverage-right">
            <span className="coverage-num mono">
              {enactedCount}/{total} categories enacted
            </span>
            <button
              className={`key-contacts ${showContacts ? "on" : ""}`}
              onClick={onShowContacts}
            >
              <PhoneIcon className="btn-icon" />
              Key contacts
            </button>
          </div>
        </div>
        <div className="coverage-bar">
          <div style={{ width: `${pct}%` }} />
        </div>
      </div>

      <StateProfile state={report.state} />

      <div className="chip-cols">
        <div className="chip-col">
          <div className="chip-col-head">
            <h3>Gaps — opportunities to propose ({report.gaps.length})</h3>
            {report.gaps.length > 0 && (
              <button className="ghost sm pkg-btn" onClick={onBuildPackage}>
                <DownloadIcon className="btn-icon" />
                Full-state package
              </button>
            )}
          </div>
          {report.gaps.length === 0 ? (
            <p className="notice">
              {report.state.name} has enacted all tracked categories. 🎉
            </p>
          ) : (
            <div className="chip-grid">
              {report.gaps.map((g) => (
                <CategoryChip
                  key={g.category.id}
                  category={g.category}
                  state="gap"
                  active={activeGapId === g.category.id}
                  onClick={() => onSelectGap(g.category.id)}
                  priority={gapPriorityLabel(g)}
                />
              ))}
            </div>
          )}
        </div>

        {report.enactedCategories.length > 0 && (
          <div className="chip-col">
            <h3>Already enacted ({enactedCount})</h3>
            <div className="chip-grid">
              {report.enactedCategories.map((c) => (
                <CategoryChip key={c.id} category={c} state="enacted" />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
