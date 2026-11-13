export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="brand__text">
          EXCELLENT<span className="brand__dot">.LK</span>
        </span>
        <small>© {new Date().getFullYear()} Excellent.lk. All rights reserved.</small>
      </div>
    </footer>
  );
}
