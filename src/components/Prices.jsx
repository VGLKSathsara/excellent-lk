import { PRICES } from "../data/site.js";

export default function Prices() {
  return (
    <section id="prices" className="section">
      <div className="container">
        <span className="eyebrow">Prices</span>
        <h2 className="section__title">Simple, clear pricing</h2>
        <div className="grid grid--3">
          {PRICES.map((p) => (
            <article key={p.name} className={`plan ${p.featured ? "plan--featured" : ""}`}>
              <h3>{p.name}</h3>
              <div className="plan__price">{p.price}</div>
              <small>{p.note}</small>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button className={`btn ${p.featured ? "btn--primary" : "btn--dark"} btn--block`}>
                Choose {p.name}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
