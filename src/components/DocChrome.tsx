import type { LetterheadConfig } from "../lib/letterhead";
import { activeSigners } from "../lib/letterhead";

/** Masthead rendered at the top of the document (screen + print). */
export function LetterheadView({ cfg }: { cfg: LetterheadConfig }) {
  if (!cfg.enabled) return null;
  const contact = cfg.contact
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const hasText = cfg.orgName.trim() || contact.length > 0;
  if (!cfg.logo && !hasText) return null;

  return (
    <header className="letterhead">
      {cfg.logo && (
        <img className="letterhead-logo" src={cfg.logo} alt="" aria-hidden />
      )}
      {hasText && (
        <div className="letterhead-org">
          {cfg.orgName.trim() && <p className="lh-name">{cfg.orgName}</p>}
          {contact.map((l, i) => (
            <p key={i} className="lh-contact">
              {l}
            </p>
          ))}
        </div>
      )}
    </header>
  );
}

/**
 * Robust liability disclaimer rendered as a small-font footer bar on the cover
 * letter (screen + print). Protects both the platform (Precedent and its
 * contributors) and the presenter (the individual or organization distributing
 * the document), and states the informational/educational purpose. This is the
 * load-bearing legal notice for a legislator-facing advocacy tool.
 */
export function CoverLetterDisclaimer() {
  return (
    <footer className="cl-disclaimer" role="note">
      <span className="cl-disclaimer-tag">Disclaimer</span>
      <p>
        This document is model legislative material provided through Precedent
        for informational and educational purposes only. It is not legal advice
        and creates no attorney–client relationship. Neither Precedent and its
        contributors nor the individual or organization presenting this document
        make any warranty as to the accuracy, completeness, or current validity
        of any provision, statistic, citation, or bill reference herein, and
        each disclaims all liability for any reliance placed upon it. All
        figures are drawn from the cited public sources as of the dates shown
        and may have changed. Verify every provision, bill number, and data
        point against current law and official sources, and consult qualified
        legislative counsel, before filing or distribution.
      </p>
    </footer>
  );
}

/** Signature block rendered at the foot of one-pagers (screen + print). */
export function SignatureView({ cfg }: { cfg: LetterheadConfig }) {
  if (!cfg.showSignature) return null;
  const signers = activeSigners(cfg);
  if (signers.length === 0) return null;

  return (
    <section className="signature-block">
      <h2>Respectfully submitted</h2>
      <div className="signature-grid">
        {signers.map((s) => (
          <div key={s.id} className="signature">
            <div className="sig-mark">
              {s.mode === "image" && s.image ? (
                <img src={s.image} alt={`${s.name} signature`} />
              ) : s.typed.trim() ? (
                <span className="sig-script">{s.typed}</span>
              ) : (
                <span className="sig-line" aria-hidden />
              )}
            </div>
            <div className="sig-rule" />
            {s.name.trim() && <p className="sig-name">{s.name}</p>}
            {s.title.trim() && <p className="sig-meta">{s.title}</p>}
            {s.org.trim() && <p className="sig-meta">{s.org}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
