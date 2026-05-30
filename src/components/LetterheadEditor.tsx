import { useRef, useState } from "react";
import type { LetterheadConfig, Signer } from "../lib/letterhead";
import { emptySigner } from "../lib/letterhead";

interface Props {
  cfg: LetterheadConfig;
  onChange: (cfg: LetterheadConfig) => void;
  /** one-pagers get the signature controls; bills/Q&A only get the masthead */
  allowSignature: boolean;
}

function readImage(file: File, onDone: (dataUrl: string) => void) {
  const reader = new FileReader();
  reader.onload = () => onDone(String(reader.result));
  reader.readAsDataURL(file);
}

export function LetterheadEditor({ cfg, onChange, allowSignature }: Props) {
  const [open, setOpen] = useState(true);
  const logoInput = useRef<HTMLInputElement>(null);

  const patch = (p: Partial<LetterheadConfig>) => onChange({ ...cfg, ...p });
  const patchSigner = (id: string, p: Partial<Signer>) =>
    patch({
      signers: cfg.signers.map((s) => (s.id === id ? { ...s, ...p } : s)),
    });

  const summary = cfg.enabled
    ? cfg.orgName.trim() || "Letterhead on"
    : "Off";

  return (
    <div className="lh-editor">
      <button
        type="button"
        className="lh-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{open ? "▾" : "▸"} Letterhead &amp; signatures</span>
        <span className="lh-summary">{summary}</span>
      </button>

      {open && (
        <div className="lh-body">
          <label className="lh-check">
            <input
              type="checkbox"
              checked={cfg.enabled}
              onChange={(e) => patch({ enabled: e.target.checked })}
            />
            Show letterhead masthead
          </label>

          {cfg.enabled && (
            <div className="lh-fields">
              <div className="lh-logo-row">
                {cfg.logo ? (
                  <img className="lh-logo-preview" src={cfg.logo} alt="logo" />
                ) : (
                  <div className="lh-logo-empty">No logo</div>
                )}
                <div className="lh-logo-actions">
                  <input
                    ref={logoInput}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) readImage(f, (url) => patch({ logo: url }));
                    }}
                  />
                  <button type="button" onClick={() => logoInput.current?.click()}>
                    {cfg.logo ? "Replace logo" : "Upload logo"}
                  </button>
                  {cfg.logo && (
                    <button
                      type="button"
                      className="ghost"
                      onClick={() => patch({ logo: "" })}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <label className="field">
                Organization name
                <input
                  type="text"
                  value={cfg.orgName}
                  placeholder="Your Organization"
                  onChange={(e) => patch({ orgName: e.target.value })}
                />
              </label>
              <label className="field">
                Address / contact (one per line)
                <textarea
                  rows={3}
                  value={cfg.contact}
                  placeholder={"Your City, ST\nyou@example.org"}
                  onChange={(e) => patch({ contact: e.target.value })}
                />
              </label>
            </div>
          )}

          {allowSignature && (
            <>
              <label className="lh-check">
                <input
                  type="checkbox"
                  checked={cfg.showSignature}
                  onChange={(e) => patch({ showSignature: e.target.checked })}
                />
                Show signature block
              </label>

              {cfg.showSignature && (
                <div className="signers-edit">
                  {cfg.signers.map((s, i) => (
                    <SignerRow
                      key={s.id}
                      signer={s}
                      index={i}
                      canRemove={cfg.signers.length > 1}
                      onChange={(p) => patchSigner(s.id, p)}
                      onRemove={() =>
                        patch({
                          signers: cfg.signers.filter((x) => x.id !== s.id),
                        })
                      }
                    />
                  ))}
                  <button
                    type="button"
                    className="add-signer"
                    onClick={() =>
                      patch({ signers: [...cfg.signers, emptySigner()] })
                    }
                  >
                    + Add signer
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function SignerRow({
  signer,
  index,
  canRemove,
  onChange,
  onRemove,
}: {
  signer: Signer;
  index: number;
  canRemove: boolean;
  onChange: (p: Partial<Signer>) => void;
  onRemove: () => void;
}) {
  const sigInput = useRef<HTMLInputElement>(null);
  return (
    <div className="signer-row">
      <div className="signer-row-head">
        <span className="signer-num">Signer {index + 1}</span>
        {canRemove && (
          <button type="button" className="ghost sm" onClick={onRemove}>
            Remove
          </button>
        )}
      </div>
      <div className="signer-grid">
        <label className="field">
          Name
          <input
            type="text"
            value={signer.name}
            placeholder="Your Name"
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </label>
        <label className="field">
          Title
          <input
            type="text"
            value={signer.title}
            placeholder="Your Title"
            onChange={(e) => onChange({ title: e.target.value })}
          />
        </label>
        <label className="field">
          Organization
          <input
            type="text"
            value={signer.org}
            placeholder="Your Organization"
            onChange={(e) => onChange({ org: e.target.value })}
          />
        </label>
      </div>

      <div className="sig-mode">
        <div className="toggle-group" role="tablist">
          <button
            type="button"
            className={signer.mode === "text" ? "on" : ""}
            onClick={() => onChange({ mode: "text" })}
          >
            Typed
          </button>
          <button
            type="button"
            className={signer.mode === "image" ? "on" : ""}
            onClick={() => onChange({ mode: "image" })}
          >
            Image
          </button>
        </div>

        {signer.mode === "text" ? (
          <input
            type="text"
            className="sig-typed-input"
            value={signer.typed}
            placeholder="Type a signature (or leave blank for a sign-on line)"
            onChange={(e) => onChange({ typed: e.target.value })}
          />
        ) : (
          <div className="sig-img-actions">
            {signer.image && (
              <img className="sig-img-preview" src={signer.image} alt="signature" />
            )}
            <input
              ref={sigInput}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) readImage(f, (url) => onChange({ image: url }));
              }}
            />
            <button type="button" onClick={() => sigInput.current?.click()}>
              {signer.image ? "Replace image" : "Upload signature"}
            </button>
            {signer.image && (
              <button
                type="button"
                className="ghost"
                onClick={() => onChange({ image: "" })}
              >
                Remove
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
