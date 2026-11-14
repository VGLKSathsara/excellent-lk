import { useEffect, useRef, useState } from "react";
import { ABOUT } from "../data/site.js";
import SocialIcon from "./SocialIcons.jsx";
import Reveal from "./Reveal.jsx";

// Counts "100+" up from 0 the first time it is on screen. Non-numeric values render as-is.
function CountUp({ value }) {
  const m = /^(\d+)(.*)$/.exec(value);
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!m) return;
    const target = Number(m[1]);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setN(target);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / 1400);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{m ? `${n}${m[2]}` : value}</span>;
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container about">
        <div className="about__main">
          <Reveal>
            <span className="eyebrow">About</span>
            <h2 className="section__title">{ABOUT.title}</h2>
            <p className="section__text">{ABOUT.text}</p>
          </Reveal>

          <div id="connect" className="connect">
            <Reveal delay={120}>
              <h3 className="connect__title">Connect with us</h3>
            </Reveal>
            <ul className="connect__list">
              {ABOUT.socials.map((s, i) => (
                <Reveal as="li" variant="zoom" delay={200 + i * 90} key={s.id}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-btn social-btn--${s.id}`}
                    aria-label={`${s.label}: ${s.handle}`}
                    title={`${s.label} – ${s.handle}`}
                  >
                    <SocialIcon name={s.id} />
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <ul className="stats">
          {ABOUT.stats.map((s, i) => (
            <Reveal as="li" variant="zoom" delay={i * 130} key={s.label} className="stat">
              <strong><CountUp value={s.value} /></strong>
              <span>{s.label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
