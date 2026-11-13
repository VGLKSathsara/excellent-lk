import { useEffect, useState } from "react";
import { NAV } from "../data/site.js";

export default function Header({ active, onLogin }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header__bar">
        <a href="#home" className="brand" onClick={(e) => go(e, "home")} aria-label="Excellent.lk home">
          <img src="/logo-mark.png" alt="" className="brand__mark" />
          <span className="brand__text">
            EXCELLENT<span className="brand__dot">.LK</span>
          </span>
        </a>

        <nav className={`nav ${open ? "is-open" : ""}`} aria-label="Main">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => go(e, item.id)}
              className={`nav__link ${active === item.id ? "is-active" : ""}`}
              aria-current={active === item.id ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
          <button className="btn btn--ghost nav__login-mobile" onClick={() => { setOpen(false); onLogin(); }}>
            Log in
          </button>
        </nav>

        <div className="header__actions">
          <button className="btn btn--ghost" onClick={onLogin}>Log in</button>
          <a href="#prices" className="btn btn--dark" onClick={(e) => go(e, "prices")}>Get Started</a>
        </div>

        <button
          className={`burger ${open ? "is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
