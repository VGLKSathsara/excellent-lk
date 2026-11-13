import { SERVICES } from "../data/site.js";

const ICONS = {
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2M16 16h0" />
    </>
  ),
};

export default function Services() {
  return (
    <section id="service" className="section section--tint">
      <div className="container">
        <span className="eyebrow">Service</span>
        <h2 className="section__title">Our services</h2>
        <div className="grid grid--services">
          {SERVICES.map((s) => (
            <a
              key={s.title}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card card--link"
            >
              <span className="card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[s.icon]}
                </svg>
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="card__cta">
                {s.cta} <span aria-hidden="true">↗</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
