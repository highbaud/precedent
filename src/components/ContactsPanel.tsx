import type { StateMeta } from "../types";
import {
  STATE_CONTACTS,
  KEY_ROLES,
  NATIONAL_RESOURCES,
  type Committee,
  type RoleIcon,
} from "../data/contacts";
import {
  BuildingIcon,
  UsersIcon,
  GavelIcon,
  PenIcon,
  PodiumIcon,
  CoinsIcon,
  CompassIcon,
  ExternalLinkIcon,
} from "./icons";

interface Props {
  state: StateMeta;
  onClose: () => void;
}

function RoleIconFor({ icon }: { icon: RoleIcon }) {
  const cls = "role-icon";
  switch (icon) {
    case "pen":
      return <PenIcon className={cls} />;
    case "gavel":
      return <GavelIcon className={cls} />;
    case "podium":
      return <PodiumIcon className={cls} />;
    case "coins":
      return <CoinsIcon className={cls} />;
    case "building":
      return <BuildingIcon className={cls} />;
    default:
      return <UsersIcon className={cls} />;
  }
}

function CommitteeItem({ label, cm }: { label: string; cm?: Committee }) {
  if (!cm) return null;
  return (
    <li>
      <span className="contact-role">{label}</span>
      {cm.url ? (
        <a href={cm.url} target="_blank" rel="noreferrer">
          {cm.name}
        </a>
      ) : (
        <span className="contact-nourl">{cm.name}</span>
      )}
    </li>
  );
}

function LinkItem({ label, url }: { label: string; url?: string }) {
  if (!url) return null;
  return (
    <li>
      <span className="contact-role">{label}</span>
      <a href={url} target="_blank" rel="noreferrer">
        {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
      </a>
    </li>
  );
}

export function ContactsPanel({ state, onClose }: Props) {
  const c = STATE_CONTACTS[state.code];
  const sameCommittee =
    c?.houseCommittee &&
    c?.senateCommittee &&
    c.houseCommittee.name === c.senateCommittee.name;

  return (
    <section className="contacts">
      <div className="proposal-head">
        <div>
          <span className="proposal-eyebrow">{state.name} — key legislative contacts</span>
          <p className="proposal-rarity">
            Official offices and committees to engage when advancing a bill.
          </p>
        </div>
        <button className="ghost close-btn" onClick={onClose}>
          Close
        </button>
      </div>

      <p className="contacts-verify">
        ⚠ Officeholders change with every election. These are stable{" "}
        <strong>institutional</strong> pages — always confirm the current chair,
        sponsor, or officeholder on the linked page before reaching out.
      </p>

      {c ? (
        <div className="contacts-grid">
          <div className="contacts-card">
            <h3>
              <BuildingIcon className="card-icon" />
              {state.name} offices
            </h3>
            <ul className="contact-list">
              <LinkItem label="Legislature" url={c.legislature} />
              <LinkItem label="Find your legislator" url={c.findLegislator} />
              <LinkItem label="Governor" url={c.governor} />
              <LinkItem label="State Treasurer" url={c.treasurer} />
            </ul>
          </div>

          <div className="contacts-card">
            <h3>
              <GavelIcon className="card-icon" />
              Money committees (first stop for a bill)
            </h3>
            <ul className="contact-list">
              {sameCommittee ? (
                <CommitteeItem label="Joint committee" cm={c.houseCommittee} />
              ) : (
                <>
                  <CommitteeItem label="House / Assembly" cm={c.houseCommittee} />
                  <CommitteeItem label="Senate" cm={c.senateCommittee} />
                </>
              )}
            </ul>
            <p className="contacts-note">
              Committee pages with a session code can move between sessions; if a
              link 404s, search the committee name from the legislature homepage.
            </p>
          </div>
        </div>
      ) : (
        <p className="notice">
          No per-state directory is on file for {state.name} yet — use the
          national resources below to locate its legislature, committees, and
          officeholders.
        </p>
      )}

      <div className="contacts-card">
        <h3>
          <UsersIcon className="card-icon" />
          Who to contact, and why
        </h3>
        <div className="role-grid">
          {KEY_ROLES.map((r) => (
            <div className="role-card" key={r.role}>
              <span className="role-card-mark">
                <RoleIconFor icon={r.icon} />
              </span>
              <div className="role-card-body">
                <span className="role-name">{r.role}</span>
                <span className="role-tag">{r.tag}</span>
                <p className="role-why">{r.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="contacts-card">
        <h3>
          <CompassIcon className="card-icon" />
          National directories (every state)
        </h3>
        <ul className="contact-list">
          {NATIONAL_RESOURCES.map((r) => (
            <li key={r.url}>
              <a href={r.url} target="_blank" rel="noreferrer">
                {r.label}
                <ExternalLinkIcon className="link-ext" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
