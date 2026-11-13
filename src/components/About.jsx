import { ABOUT } from "../data/site.js";
import SocialIcon from "./SocialIcons.jsx";

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

        <div className="connect">
          <h3 className="connect__title">Connect with us</h3>
          <ul className="connect__list">
            {ABOUT.socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-link social-link--${s.id}`}
                >
                  <span className="social-link__icon">
                    <SocialIcon name={s.id} />
                  </span>
                  <span className="social-link__text">
                    <strong>{s.label}</strong>
                    <small>{s.handle}</small>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
