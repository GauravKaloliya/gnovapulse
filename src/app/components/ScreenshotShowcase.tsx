"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ScreenshotShowcase() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="showcase" className="showcase-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-label" style={{ textAlign: "center" }}>Showcase</div>
        <h2 className={`section-title scroll-reveal${isVisible ? " visible" : ""}`} style={{ textAlign: "center" }}>See It in <span className="text-accent">Action</span></h2>
        <div className={`showcase-stack scroll-reveal${isVisible ? " visible" : ""}`}>
          <div className="showcase-frame frame-back" aria-hidden="true">
            <div className="frame-bar"><span /><span /><span /></div>
            <div className="frame-body">
              <div className="frame-line" style={{ width: "60%" }} />
              <div className="frame-line" style={{ width: "80%" }} />
              <div className="frame-line" style={{ width: "45%" }} />
              <div className="frame-line-short" />
              <div className="frame-line" style={{ width: "70%" }} />
            </div>
          </div>
          <div className="showcase-frame frame-front">
            <div className="frame-bar"><span /><span /><span /></div>
            <div className="frame-body">
              <div className="frame-chart">
                <div className="frame-bar-chart" style={{ height: "60%" }} />
                <div className="frame-bar-chart" style={{ height: "90%" }} />
                <div className="frame-bar-chart" style={{ height: "45%" }} />
                <div className="frame-bar-chart" style={{ height: "75%" }} />
                <div className="frame-bar-chart" style={{ height: "50%" }} />
              </div>
              <div className="frame-metric-row">
                <div className="frame-metric"><span className="fm-val">99.9%</span><span className="fm-lbl">Uptime</span></div>
                <div className="frame-metric"><span className="fm-val">12ms</span><span className="fm-lbl">Latency</span></div>
                <div className="frame-metric"><span className="fm-val">50M+</span><span className="fm-lbl">Events</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
