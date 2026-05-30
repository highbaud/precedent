import { useState } from "react";
import type { StateMeta } from "../types";
import {
  NATIONAL_ORGS,
  STATE_ORGS,
  STATE_NETWORK_FALLBACK,
  type Organization,
  type OrgIcon,
} from "../data/organizations";
import { StateShape } from "./StateShape";
import {
  MegaphoneIcon,
  NetworkIcon,
  CoinsIcon,
  ScaleIcon,
  BookIcon,
  BuildingIcon,
  MapPinIcon,
  ExternalLinkIcon,
} from "./icons";

interface Props {
  /** the currently selected state, if any — its regional group is surfaced first */
  state?: StateMeta;
  onClose: () => void;
}

function OrgIconFor({ icon }: { icon: OrgIcon }) {
  const cls = "org-icon";
  switch (icon) {
    case "megaphone":
      return <MegaphoneIcon className={cls} />;
    case "coins":
      return <CoinsIcon className={cls} />;
    case "scale":
      return <ScaleIcon className={cls} />;
    case "book":
      return <BookIcon className={cls} />;
    case "building":
      return <BuildingIcon className={cls} />;
    case "pin":
      return <MapPinIcon className={cls} />;
    default:
      return <NetworkIcon className={cls} />;
  }
}

function host(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/** Sort by name, ignoring a leading "The " (so "The Digital Chamber" files under D). */
const sortKey = (s: string) => s.replace(/^the\s+/i, "").toLowerCase();
const byName = (a: Organization, b: Organization) =>
  sortKey(a.name).localeCompare(sortKey(b.name));

/**
 * Card mark: state/regional groups show their state silhouette; national groups
 * show their real favicon pulled from their own (already-verified) domain, with
 * graceful fallback to the curated line icon if the favicon fails to load.
 */
function OrgMark({ org }: { org: Organization }) {
  const [imgOk, setImgOk] = useState(true);

  if (org.state) {
    return (
      <StateShape
        code={org.state}
        className="org-shape"
        title={`${org.name} — ${org.state}`}
      />
    );
  }
  if (imgOk) {
    const domain = host(org.url).replace(/\/.*/, "");
    return (
      <img
        className="org-logo"
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
        alt=""
        loading="lazy"
        onError={() => setImgOk(false)}
      />
    );
  }
  return <OrgIconFor icon={org.icon} />;
}

function OrgCard({ org }: { org: Organization }) {
  return (
    <a className="org-card" href={org.url} target="_blank" rel="noreferrer">
      <span className="org-card-mark">
        <OrgMark org={org} />
      </span>
      <span className="org-card-body">
        <span className="org-card-head">
          <span className="org-name">{org.name}</span>
          <ExternalLinkIcon className="org-ext" />
        </span>
        <span className="org-focus">{org.focus}</span>
        <span className="org-blurb">{org.blurb}</span>
        <span className="org-url">{host(org.url)}</span>
      </span>
    </a>
  );
}

export function OrganizationsPanel({ state, onClose }: Props) {
  const nationalOrgs = [...NATIONAL_ORGS].sort(byName);
  const localOrgs = state
    ? STATE_ORGS.filter((o) => o.state === state.code).sort(byName)
    : [];
  const otherStateOrgs = (
    state ? STATE_ORGS.filter((o) => o.state !== state.code) : STATE_ORGS
  ).sort(byName);

  return (
    <section className="orgs">
      <div className="proposal-head">
        <div>
          <span className="proposal-eyebrow">Allied organizations</span>
          <p className="proposal-rarity">
            Groups that help draft, support, and pass digital-asset legislation —
            who they are and why to reach out.
          </p>
        </div>
        <button className="ghost close-btn" onClick={onClose}>
          Close
        </button>
      </div>

      <p className="contacts-verify">
        These are independent organizations. Links go to each group's official
        site; confirm current contacts and priorities there before reaching out.
      </p>

      <h3 className="orgs-section-title">National</h3>
      <div className="orgs-grid">
        {nationalOrgs.map((o) => (
          <OrgCard key={o.url} org={o} />
        ))}
      </div>

      {localOrgs.length > 0 && (
        <>
          <h3 className="orgs-section-title">In {state!.name}</h3>
          <div className="orgs-grid">
            {localOrgs.map((o) => (
              <OrgCard key={o.url} org={o} />
            ))}
          </div>
        </>
      )}

      <h3 className="orgs-section-title">
        {localOrgs.length > 0 ? "Other state & regional groups" : "State & regional"}
      </h3>
      <div className="orgs-grid">
        {otherStateOrgs.map((o) => (
          <OrgCard key={o.url} org={o} />
        ))}
      </div>

      <p className="orgs-fallback">
        <MapPinIcon className="org-icon" />
        <span>
          No group listed for your state? {" "}
          <a href={STATE_NETWORK_FALLBACK.url} target="_blank" rel="noreferrer">
            {STATE_NETWORK_FALLBACK.name}
          </a>{" "}
          {STATE_NETWORK_FALLBACK.blurb}
        </span>
      </p>
    </section>
  );
}
