import { PRICING } from "../data/site.js";
import Reveal from "./Reveal.jsx";

// "Choose" buttons take the visitor to the contact links in the About section.
const toContact = (e) => {
  e.preventDefault();
  document.getElementById("connect")?.scrollIntoView({ behavior: "smooth", block: "center" });
};

export default function Prices() {
  return (
    <section id="prices" className="section">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Prices</span>
          <h2 className="section__title">{PRICING.title}</h2>
        </Reveal>

        <div className="grid grid--3" data-live>
          {PRICING.plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 130} className="cell">
              <article className={`plan ${p.featured ? "plan--featured" : ""}`}>
                {p.badge && <span className="plan__badge">{p.badge}</span>}
                <h3>{p.name}</h3>
                <div className="plan__price">{p.price}</div>
                <ul>
                  {p.features.map((f) => (
                    <li key={f.label} className={f.included ? "is-yes" : "is-no"}>
                      <span className="sr-only">{f.included ? "Included: " : "Not included: "}</span>
                      {f.label}
                      {f.note && <em className="plan__note">({f.note})</em>}
                    </li>
                  ))}
                </ul>
                <a
                  href="#connect"
                  onClick={toContact}
                  className={`btn ${p.featured ? "btn--primary" : "btn--dark"} btn--block`}
                >
                  Choose {p.name}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
