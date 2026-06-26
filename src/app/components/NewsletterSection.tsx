"use client";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section id="newsletter" className="newsletter-section">
      <div className="container">
        <div className="newsletter-inner">
          <h2 className="newsletter-title">Stay Ahead of the Curve</h2>
          <p className="newsletter-desc">Get product updates, data engineering best practices, and early access to new features.</p>
          {submitted ? (
            <div className="newsletter-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF9932" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 12 2 2 4-4"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
              <span>You are subscribed. Welcome aboard!</span>
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
              <div className="newsletter-input-wrap">
                <input
                  type="email"
                  className={`newsletter-input${error ? " error" : ""}`}
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  aria-label="Email address"
                  required
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                />
                <span className="newsletter-error" role="alert">{error}</span>
              </div>
              <button type="submit" className="btn btn-primary btn-lg">Subscribe</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
