export default function MorphDivider({ color }: { color?: string }) {
  const fill = color || "var(--color-oceanic)";
  return (
    <div className="morph-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path
          fill={fill}
          d="M0,50 C150,10 300,90 600,50 C900,10 1050,90 1440,50 L1440,100 L0,100 Z"
        />
      </svg>
    </div>
  );
}

export function CurtainDivider({ children }: { children?: React.ReactNode }) {
  return (
    <div className="curtain-divider" aria-hidden="true">
      <div className="curtain-divider-reveal">{children}</div>
    </div>
  );
}
