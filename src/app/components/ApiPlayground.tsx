"use client";
import { useState, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CODE = `import { GnovaPulseClient } from "@novapulse/sdk";

const client = new GnovaPulseClient({
  apiKey: process.env.GNOVA_API_KEY,
});

const pipeline = await client.pipelines.create({
  source: "s3://data-bucket/raw/",
  transform: [
    { type: "clean", rules: ["deduplicate", "impute"] },
    { type: "enrich", with: "geolocation" },
  ],
  destination: "snowflake://wh/db/schema",
});

console.log(\`Pipeline \${pipeline.id} is running\`);`;

export default function ApiPlayground() {
  const { ref, isVisible } = useScrollReveal();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <section id="api-playground" className="api-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-label" style={{ textAlign: "center" }}>API</div>
        <h2 className={`section-title scroll-reveal${isVisible ? " visible" : ""}`} style={{ textAlign: "center" }}>Developer-First <span className="text-accent">SDK</span></h2>
        <p className={`section-desc scroll-reveal${isVisible ? " visible" : ""}`} style={{ textAlign: "center", margin: "0 auto 3rem" }}>Deploy data pipelines with 5 lines of code.</p>
        <div className={`api-code-block scroll-reveal${isVisible ? " visible" : ""}`}>
          <div className="api-code-header">
            <span className="api-lang">typescript</span>
            <button className="api-copy-btn" onClick={handleCopy} aria-label={copied ? "Copied" : "Copy code"}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="api-code-body"><code>{CODE}</code></pre>
        </div>
      </div>
    </section>
  );
}
