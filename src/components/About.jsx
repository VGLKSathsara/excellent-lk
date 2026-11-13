import { ABOUT } from "../data/site.js";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container about">
        <div>
          <span className="eyebrow">About</span>
          <h2 className="section__title">{ABOUT.title}</h2>
          <p className="section__text">{ABOUT.text}</p>
        </div>
        <ul className="stats">
          {ABOUT.stats.map((s) => (
            <li key={s.label} className="stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
