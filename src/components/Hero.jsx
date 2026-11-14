import { useEffect, useRef } from "react";
import PaperWave from "./PaperWave.jsx";
import { HERO } from "../data/site.js";

const go = (e, id) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Hero() {
  const ref = useRef(null);

  // Mouse parallax (desktop only). Sets --mx / --my in [-1, 1] on the hero.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
        el.style.setProperty("--my", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
      });
    };
    const onLeave = () => {
      el.style.setProperty("--mx", 0);
      el.style.setProperty("--my", 0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="home" className="hero" ref={ref}>
      <PaperWave />

      <div className="hero__inner">
        <span className="pill rise" style={{ "--i": 0 }}>
          <i className="pill__dot" /> {HERO.badge}
        </span>

        <h1 className="hero__title rise" style={{ "--i": 1 }}>
          {HERO.titleTop}{" "}
          <span className="hero__brand">
            {HERO.titleBrand}
            <span className="hero__ext">{HERO.titleExt}</span>
          </span>
        </h1>
        <p className="hero__text rise" style={{ "--i": 2 }}>{HERO.text}</p>

        <div className="hero__cta rise" style={{ "--i": 3 }}>
          <a href="#service" className="btn btn--primary" onClick={(e) => go(e, "service")}>
            Our Services <span aria-hidden="true">→</span>
          </a>
          <a href="#about" className="btn btn--light" onClick={(e) => go(e, "about")}>
            About Us <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="hero__stage rise" style={{ "--i": 4 }} aria-hidden="true">
          <span className="ring ring--1" />
          <span className="ring ring--2"><i className="ring__spin" /></span>
          <img src="/logo-mark.png" alt="" className="hero__logo" width="640" height="519" />
          <span className="hero__shadow" />
          <span className="hex hex--1" />
          <span className="hex hex--2" />
          <span className="hex hex--3" />
        </div>
      </div>

      <div className="hero__corner hero__corner--left rise" style={{ "--i": 5 }}>
        <span className="hero__corner-icon">★</span>
        <span>Colombo,<br />Sri Lanka</span>
      </div>
      <div className="hero__corner hero__corner--right rise" style={{ "--i": 5 }}>
        <span className="chip">⚡</span>
        <span className="chip">✦</span>
      </div>

      <a href="#about" className="hero__scroll rise" style={{ "--i": 6 }} onClick={(e) => go(e, "about")} aria-label="Scroll down to About">
        <span className="hero__scroll-mouse"><i /></span>
      </a>
    </section>
  );
}
