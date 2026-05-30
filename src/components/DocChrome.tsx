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
