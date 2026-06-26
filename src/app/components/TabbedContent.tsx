"use client";
import { useState, useCallback } from "react";

const TABS = [
  { id: "extract", label: "Extract", content: "Pull data from any source — databases, APIs, cloud storage, or webhooks. Our 200+ connectors handle schema inference and incremental sync automatically." },
  { id: "transform", label: "Transform", content: "Apply cleaning, enrichment, and aggregation rules using our visual builder or YAML config. Preview results in real-time before committing." },
  { id: "load", label: "Load", content: "Deliver processed data to your warehouse, data lake, or BI tool. Supports Snowflake, BigQuery, Redshift, S3, and 50+ destinations." },
];

export default function TabbedContent() {
  const [active, setActive] = useState("extract");
  const tabRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const handleClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-tab]");
      if (!btn) return;
      const id = btn.getAttribute("data-tab");
      node.querySelectorAll("[data-tab]").forEach((b) => b.classList.toggle("active", b.getAttribute("data-tab") === id));
      node.querySelectorAll(".tab-panel").forEach((p) => p.classList.toggle("active", p.id === `panel-${id}`));
      setActive(id!);
    };
    node.addEventListener("click", handleClick);
    return () => node.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="tabbed-content" ref={tabRef}>
      <div className="tab-bar" role="tablist" aria-label="Pipeline stages">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn${active === tab.id ? " active" : ""}`}
            data-tab={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {TABS.map((tab) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          className={`tab-panel${active === tab.id ? " active" : ""}`}
          role="tabpanel"
          aria-labelledby={tab.id}
        >
          <p>{tab.content}</p>
        </div>
      ))}
    </div>
  );
}
