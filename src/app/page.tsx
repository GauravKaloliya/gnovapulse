"use client";

import { useState, useCallback, useEffect } from "react";
import Loader from "@/app/components/Loader";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import TrustedBySection from "@/app/components/TrustedBySection";
import HowItWorksSection from "@/app/components/HowItWorksSection";
import FeaturesSection from "@/app/components/FeaturesSection";
import SecuritySection from "@/app/components/SecuritySection";
import CaseStudiesSection from "@/app/components/CaseStudiesSection";
import PricingSection from "@/app/components/PricingSection";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import AwardsSection from "@/app/components/AwardsSection";
import RoadmapSection from "@/app/components/RoadmapSection";
import ApiPlayground from "@/app/components/ApiPlayground";
import ScreenshotShowcase from "@/app/components/ScreenshotShowcase";
import TeamSection from "@/app/components/TeamSection";
import NewsletterSection from "@/app/components/NewsletterSection";
import CTASection from "@/app/components/CTASection";
import Footer from "@/app/components/Footer";
import BackToTop from "@/app/components/BackToTop";
import ScrollProgress from "@/app/components/ScrollProgress";
import FAQSection from "@/app/components/FAQSection";
import IntegrationsMarquee from "@/app/components/IntegrationsMarquee";
import ComparisonSection from "@/app/components/ComparisonSection";
import TabbedContent from "@/app/components/TabbedContent";
import CinematicOverlays from "@/app/components/CinematicOverlays";
import ScrollController, { useScrollRevealEffects } from "@/app/components/ScrollController";
import FireflyCanvas from "@/app/components/FireflyCanvas";
import CursorManager from "@/app/components/CursorManager";
import MorphDivider from "@/app/components/MorphDivider";
import BokehLayer from "@/app/components/BokehLayer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useScrollRevealEffects();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      document.documentElement.style.setProperty("--theme-shift", String(progress));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      {loading && <Loader onComplete={handleLoaderComplete} />}
      <ScrollProgress />
      <Header />
      <CursorManager />
      <main id="main-content">
        <ScrollController />
        <div className="persp-card visible" style={{ transitionDelay: "300ms" }}>
          <Hero />
        </div>
        <TrustedBySection />
        <MorphDivider color="white" />
        <HowItWorksSection />
        <FeaturesSection />
        <IntegrationsMarquee />
        <SecuritySection />
        <CaseStudiesSection />
        <PricingSection />
        <MorphDivider color="var(--color-mint)" />
        <ComparisonSection />
        <AwardsSection />
        <TestimonialsSection />
        <MorphDivider color="white" />
        <RoadmapSection />
        <FAQSection />
        <section className="tabbed-section" style={{ padding: "6rem 0", background: "white" }}>
          <div className="container">
            <div className="section-label" style={{ textAlign: "center" }}>Pipeline</div>
            <h2 className="section-title" style={{ textAlign: "center" }}>Extract, Transform, <span className="text-accent">Load</span></h2>
            <p className="section-desc" style={{ textAlign: "center", margin: "0 auto 3rem" }}>A complete ETL pipeline in minutes, not weeks.</p>
            <TabbedContent />
          </div>
        </section>

        <ApiPlayground />
        <ScreenshotShowcase />
        <TeamSection />
        <NewsletterSection />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
      <CinematicOverlays />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <FireflyCanvas />
        <BokehLayer />
      </div>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="gradient-mesh-overlay" aria-hidden="true" />
    </>
  );
}
