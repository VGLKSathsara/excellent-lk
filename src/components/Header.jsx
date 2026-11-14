import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV } from "../data/site.js";

export default function Header({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState(null);
  const [anim, setAnim] = useState(false);
  const navRef = useRef(null);
  const barRef = useRef(null);

  // shadow + scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // sliding "active" pill behind the nav links
  const measure = useCallback(() => {
    const nav = navRef.current;
    const link = nav?.querySelector(".nav__link.is-active");
    if (!link) return setPill(null);
    setPill({ left: link.offsetLeft, top: link.offsetTop, width: link.offsetWidth, height: link.offsetHeight });
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [active, open, measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    const t = setTimeout(() => setAnim(true), 150); // no slide-in on first paint
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [measure]);

  // close mobile menu with Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pillStyle = pill
    ? { opacity: 1, width: pill.width, height: pill.height, transform: `translate(${pill.left}px, ${pill.top}px)` }
    : undefined;

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="progress" ref={barRef} aria-hidden="true" />
      <div className="header__bar">
        <a href="#home" className="brand" onClick={(e) => go(e, "home")} aria-label="Excellent.lk home">
          <img src="/logo-mark.png" alt="" className="brand__mark" />
          <span className="brand__text">
            EXCELLENT<span className="brand__dot">.LK</span>
          </span>
        </a>

        <nav ref={navRef} className={`nav ${open ? "is-open" : ""}`} aria-label="Main">
          <span className={`nav__pill ${anim ? "is-anim" : ""}`} style={pillStyle} aria-hidden="true" />
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
        </nav>

        <div className="header__actions">
          <a href="#prices" className="btn btn--dark" onClick={(e) => go(e, "prices")}>
            Get Started
          </a>
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
