import type { StateCode } from "../types";
import { STATE_SHAPES } from "../data/stateShapes";

interface Props {
  code: StateCode;
  className?: string;
  title?: string;
}

/** Accurate filled silhouette of a single state (geometry from @svg-maps/usa). */
export function StateShape({ code, className, title }: Props) {
  const shape = STATE_SHAPES[code];
  if (!shape) return null;
  return (
    <svg
      className={className}
      viewBox={shape.viewBox}
      role="img"
      aria-label={title ?? `${code} outline`}
      preserveAspectRatio="xMidYMid meet"
    >
      {title && <title>{title}</title>}
      <path d={shape.path} />
    </svg>
  );
}
