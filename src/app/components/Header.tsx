"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";

const NAV_ITEMS = [
  { href: "#features", label: "Features", id: "features" },
  { href: "#how-it-works", label: "How It Works", id: "how-it-works" },
  { href: "#security", label: "Security", id: "security" },
  { href: "#pricing", label: "Pricing", id: "pricing" },
  { href: "#testimonials", label: "Testimonials", id: "testimonials" },
  { href: "#faq", label: "FAQ", id: "faq" },
  { href: "#api-playground", label: "API", id: "api-playground" },
];

const MOBILE_ITEMS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#security", label: "Security & Compliance" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#pricing", label: "Pricing" },
  { href: "#comparison", label: "Comparison" },
  { href: "#awards", label: "Awards" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#faq", label: "FAQ" },
  { href: "#api-playground", label: "API Playground" },
  { href: "#showcase", label: "Showcase" },
  { href: "#team", label: "Team" },
  { href: "#newsletter", label: "Newsletter" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(NAV_ITEMS.map((item) => item.id).concat(["comparison", "case-studies", "awards", "roadmap", "showcase", "team", "newsletter"]));
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollRef = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const el = headerRef.current;
      if (!el) return;
      if (current > 80 && current > lastScrollRef.current) {
        el.classList.add("header-hidden");
      } else {
        el.classList.remove("header-hidden");
      }
      lastScrollRef.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
      if ((e.key === "m" || e.key === "M") && !e.ctrlKey && !e.metaKey && !e.target) {
        setMenuOpen((p) => !p);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    if (!menu) return;
    const focusable = menu.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    menu.addEventListener("keydown", trap);
    return () => menu.removeEventListener("keydown", trap);
  }, [menuOpen]);

  const toggleMenu = useCallback(() => setMenuOpen((p) => !p), []);

  return (
    <>
      <header className="site-header" ref={headerRef}>
        <div className="container header-inner">
          <a href="/" className="logo" aria-label="GnovaPulse AI Home">
            <span className="logo-symbol">∞</span>
            <span className="logo-text">
              GnovaPulse<span className="logo-accent">AI</span>
            </span>
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={activeSection === item.id ? "active" : ""}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a href="#pricing" className="btn btn-primary btn-sm">
              Get Started
            </a>
          </div>
          <button
            className="mobile-menu-btn"
            aria-label="Toggle menu (M)"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} ref={menuRef} role="dialog" aria-modal="true" aria-label="Navigation menu">
        {MOBILE_ITEMS.map((item, i) => (
          <a key={i} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
        ))}
        <a
          href="#pricing"
          className="btn btn-primary btn-sm"
          onClick={() => setMenuOpen(false)}
          style={{ display: "inline-flex" }}
        >
          Get Started
        </a>
      </div>
    </>
  );
}
