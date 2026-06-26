export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="/" className="logo">
            <span className="logo-symbol">∞</span>
            <span className="logo-text">
              GnovaPulse<span className="logo-accent">AI</span>
            </span>
          </a>
          <p className="footer-desc">
            Intelligent data automation for the modern enterprise.
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#">Integrations</a>
            <a href="#">Changelog</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 GnovaPulse AI. All rights reserved.</p>
          <div className="footer-social">
            <span className="logo-symbol" style={{ fontSize: "1rem" }}>∞</span>
            <span>MP025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
