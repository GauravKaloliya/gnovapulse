export default function IntegrationsMarquee() {
  const LOGOS = [
    "Python", "JavaScript", "TypeScript", "React", "Node.js", "PostgreSQL",
    "MongoDB", "Redis", "AWS", "GCP", "Azure", "Docker", "Kubernetes",
    "GraphQL", "REST", "WebSocket", "Snowflake", "BigQuery", "Datadog",
    "Python", "JavaScript", "TypeScript", "React", "Node.js", "PostgreSQL",
    "MongoDB", "Redis", "AWS", "GCP", "Azure", "Docker", "Kubernetes",
    "GraphQL", "REST", "WebSocket", "Snowflake", "BigQuery", "Datadog",
  ];

  return (
    <div className="integrations-marquee">
      <div className="integrations-track">
        {LOGOS.map((name, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "rgba(23, 43, 54, 0.4)",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ color: "var(--color-saffron)", fontSize: "0.5rem" }}>◆</span>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
