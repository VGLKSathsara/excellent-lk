import { SERVICES } from "../data/site.js";

const ICONS = {
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2M16 16h0" />
    </>
  ),
  gift: (
    <>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M5 12v8h14v-8M12 8v12M12 8c-1.5-4-5.5-4-5.5-1.5S10 8 12 8zM12 8c1.5-4 5.5-4 5.5-1.5S14 8 12 8z" />
    </>
  ),
};

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.9 4.3a1.2 1.2 0 0 0-1.2-.2L2.9 11a1.1 1.1 0 0 0 .1 2.1l4.5 1.4 1.7 5.3a1.1 1.1 0 0 0 1.8.5l2.5-2.3 4.6 3.4a1.2 1.2 0 0 0 1.9-.7l3.1-15.1a1.2 1.2 0 0 0-.2-1.3zM9.6 14.1l8.2-5-6.3 6.6-.3 2.6-1.6-4.2z" />
    </svg>
  );
}

export default function Services() {
  return (
    <section id="service" className="section section--tint">
      <div className="container">
        <span className="eyebrow">Service</span>
        <h2 className="section__title">Our services</h2>
        <div className="grid grid--services">
          {SERVICES.map((s) => (
            <article key={s.title} className="card card--link">
              <span className="card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[s.icon]}
                </svg>
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>

              {/* Whole card is clickable via this link (stretched with CSS) */}
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="card__cta card__stretch">
                {s.cta} <span aria-hidden="true">↗</span>
              </a>

              {s.telegram && (
                <a
                  href={s.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card__telegram"
                  aria-label={`${s.title} on Telegram`}
                  title="Join on Telegram"
                >
                  <TelegramIcon />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
