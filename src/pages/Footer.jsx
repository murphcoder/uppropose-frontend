export default function Footer() {
    return (
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="/cookies">Cookie Policy</a>
            <span className="separator">•</span>
            <a href="/privacy">Privacy Policy</a>
            <span className="separator">•</span>
            <a href="/terms-and-conditions">Terms & Conditions</a>
          </div>
          <div className="footer-contact">
            <a href="mailto:murphcoder@gmail.com">murphcoder@gmail.com</a>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} Murphcoder Web Development LLC
          </div>
        </div>
      </footer>
    );
}