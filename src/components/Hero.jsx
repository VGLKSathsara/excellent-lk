import PaperWave from "./PaperWave.jsx";
import { HERO } from "../data/site.js";

const go = (e, id) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Hero() {
  return (
    <section id="home" className="hero">
      <PaperWave />

      <div className="hero__inner">
        <span className="pill">
          <i className="pill__dot" /> {HERO.badge}
        </span>

        <h1 className="hero__title">
          {HERO.titleTop}{" "}
          <span className="hero__brand">
            {HERO.titleBrand}
            <span className="hero__ext">{HERO.titleExt}</span>
          </span>
        </h1>
        <p className="hero__text">{HERO.text}</p>

        <div className="hero__cta">
          <a href="#service" className="btn btn--primary" onClick={(e) => go(e, "service")}>
            Our Services <span aria-hidden="true">→</span>
          </a>
          <a href="#about" className="btn btn--light" onClick={(e) => go(e, "about")}>
            About Us <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="hero__stage" aria-hidden="true">
          <span className="ring ring--1" />
          <span className="ring ring--2" />
          <img src="/logo-mark.png" alt="" className="hero__logo" width="640" height="519" />
          <span className="hero__shadow" />
          <span className="hex hex--1" />
          <span className="hex hex--2" />
          <span className="hex hex--3" />
        </div>
      </div>

      <div className="hero__corner hero__corner--left">
        <span className="hero__corner-icon">★</span>
        <span>Colombo,<br />Sri Lanka</span>
      </div>
      <div className="hero__corner hero__corner--right">
        <span className="chip">⚡</span>
        <span className="chip">✦</span>
      </div>
    </section>
  );
}
