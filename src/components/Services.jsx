import { SERVICES } from "../data/site.js";

const ICONS = {
  web: <path d="M3 5h18v12H3zM8 21h8M12 17v4" />,
  code: <path d="M9 8l-5 4 5 4M15 8l5 4-5 4M13 6l-2 12" />,
  growth: <path d="M4 18l6-6 4 4 6-8M15 8h5v5" />,
  support: <path d="M4 13v-1a8 8 0 0116 0v1M4 13h3v5H4zM17 13h3v5h-3zM17 18c0 2-2 3-5 3" />,
};

export default function Services() {
  return (
    <section id="service" className="section section--tint">
      <div className="container">
        <span className="eyebrow">Service</span>
        <h2 className="section__title">What we do</h2>
        <div className="grid grid--4">
          {SERVICES.map((s) => (
            <article key={s.title} className="card">
              <span className="card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[s.icon]}
                </svg>
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
