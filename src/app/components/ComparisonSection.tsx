import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ComparisonSection() {
  const { ref, isVisible } = useScrollReveal();

  const rows = [
    { feature: "AI-Powered Extraction", us: true, other1: false, other2: false },
    { feature: "Real-time Analytics", us: true, other1: true, other2: false },
    { feature: "No-Code Workflows", us: true, other1: false, other2: false },
    { feature: "200+ Integrations", us: true, other1: true, other2: false },
    { feature: "Custom Pipelines", us: true, other1: true, other2: true },
    { feature: "SOC 2 Compliance", us: true, other1: false, other2: true },
    { feature: "Dedicated Support", us: true, other1: false, other2: true },
    { feature: "Unlimited API Access", us: true, other1: false, other2: false },
  ];

  const IconCheck = () => (
    <svg className="icon-check" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 12 2 2 4-4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );

  const IconDash = () => (
    <svg className="icon-dash" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
    </svg>
  );

  return (
    <section id="comparison" className="comparison-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-label">Comparison</div>
        <h2 className={`section-title scroll-reveal-left${isVisible ? " visible" : ""}`}>
          Why Teams Choose <span className="text-accent">GnovaPulse</span>
        </h2>
        <p className={`section-desc scroll-reveal${isVisible ? " visible" : ""}`}>
          See how we stack up against the competition.
        </p>
        <div className={`comparison-table-wrap scroll-reveal${isVisible ? " visible" : ""}`} style={{ transitionDelay: "150ms" }}>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th><span className="text-accent">GnovaPulse</span></th>
                <th>DataBot</th>
                <th>Legacy Tools</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td>{row.feature}</td>
                  <td>{row.us ? <IconCheck /> : null}</td>
                  <td>{row.other1 ? <IconCheck /> : <IconDash />}</td>
                  <td>{row.other2 ? <IconCheck /> : <IconDash />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
