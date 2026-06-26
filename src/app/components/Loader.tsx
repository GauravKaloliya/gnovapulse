"use client";

import { useEffect, useState } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
      setTimeout(onComplete, 300);
    }, 100);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`film-slate${hidden ? " hidden" : ""}`}>
      <div className="loader-content">
        <div className="logo-sting-wrap">
          <div className="logo-sting">∞</div>
          <div className="logo-sting-flash" />
        </div>
        <p className="loader-text">GnovaPulse AI</p>
      </div>
      <div className="progress-reveal open" aria-hidden="true" />
    </div>
  );
}
