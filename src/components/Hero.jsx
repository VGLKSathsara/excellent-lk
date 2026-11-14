import { useEffect, useRef } from "react";
import PaperWave from "./PaperWave.jsx";
import { HERO } from "../data/site.js";

const go = (e, id) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Hero() {
  const ref = useRef(null);

  // Mouse parallax (desktop only). Smooth easing loop that moves only the few
  // elements marked with data-depth="dx,dy[,baseX,baseY]" using the GPU-friendly
  // `translate` property. It stops by itself once everything has settled, so it
  // costs nothing while the mouse is still.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const items = [...el.querySelectorAll("[data-depth]")].map((node) => {
      const [dx, dy, bx = 0, by = 0] = node.dataset.depth.split(",").map(Number);
      return { node, dx, dy, bx, by, x: bx, y: by };
    });

    let tx = 0, ty = 0, raf = 0, running = false;
    const frame = () => {
      let moving = false;
      for (const it of items) {
        const gx = it.bx + tx * it.dx;
        const gy = it.by + ty * it.dy;
        it.x += (gx - it.x) * 0.08;
        it.y += (gy - it.y) * 0.08;
        if (Math.abs(gx - it.x) > 0.04 || Math.abs(gy - it.y) > 0.04) moving = true;
        it.node.style.translate = `${it.x.toFixed(2)}px ${it.y.toFixed(2)}px`;
      }
      running = moving;
      raf = moving ? requestAnimationFrame(frame) : 0;
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="home" className="hero" ref={ref} data-live>
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
          <span className="ring ring--2" />
          <span className="orbit"><i /></span>
          <span className="hero__glow" />
          <img src="/logo-mark.png" alt="" className="hero__logo" width="640" height="519" data-depth="-16,-10" />
          <span className="hero__shadow" />
          <span className="hex hex--1" data-depth="28,18" />
          <span className="hex hex--2" data-depth="-32,-20" />
          <span className="hex hex--3" data-depth="20,-14" />
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
