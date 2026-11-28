import { PRICING } from "../data/site.js";
import Reveal from "./Reveal.jsx";

function PriceIcon({ kind }) {
  const paths = { check: "m5 12 4 4L19 6", minus: "M5 12h14", arrow: "M4 12h15m-6-6 6 6-6 6", sparkle: "M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z" };
  return <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={paths[kind]}/></svg>;
}

const formatPrice = (amount) => `$${amount.toFixed(2)}`;

export default function Prices() {
  const { offer } = PRICING;

  return (
    <section id="prices" className="section pricing-section" aria-labelledby="pricing-title">
      <div className="container">
        <Reveal className="pricing-heading">
          <h2 id="pricing-title" className="section__title">{PRICING.title}</h2>
          <p className="section__text">{PRICING.description}</p>
        </Reveal>

        <div className="pricing-grid" data-live data-count={PRICING.plans.length}>
          {PRICING.plans.map((plan, index) => {
            const hasOffer = plan.featured && offer.active;
            const price = hasOffer ? offer.promotionalPrice : plan.price;
            const savings = hasOffer ? Math.round((1 - price / offer.regularPrice) * 100) : 0;

            return (
              <Reveal key={plan.name} delay={index * 100} className="pricing-cell">
                <article className={`pricing-card${plan.featured ? " pricing-card--featured" : ""}`}>
                  {
                    <div className="pricing-card__top">
                      {hasOffer && <span className="pricing-card__badge">{offer.label}</span>}
                    </div>
                  }
                  <h3 className="pricing-card__name">{plan.name}</h3>
                  <p className="pricing-card__subtitle">{plan.subtitle}</p>

                  <div className="pricing-card__price-row">
                    <span className="pricing-card__price">{formatPrice(price)}</span>
                    {hasOffer && <span className="pricing-card__old-price">{formatPrice(offer.regularPrice)}</span>}
                  </div>
                  <p className="pricing-card__period">{plan.period}</p>
                  {hasOffer && (
                    <div className="pricing-card__offer">
                      <span>Save {savings}% for a limited time</span>
                      <span className="pricing-card__offer-sparkle" aria-hidden="true"><PriceIcon kind="sparkle"/></span>
                    </div>
                  )}

                  <div className="pricing-card__divider" aria-hidden="true" />
                  <p className="pricing-card__includes">What's included</p>
                  <ul className="pricing-card__features">
                    {plan.features.map((feature) => (
                      <li key={feature.label} className={feature.included ? "pricing-feature" : "pricing-feature pricing-feature--excluded"}>
                        <span className="pricing-feature__icon" aria-hidden="true"><PriceIcon kind={feature.included ? "check" : "minus"}/></span>
                        <span>{!feature.included && <span className="pricing-sr-only">Not included: </span>}{feature.label}{feature.note && <strong className="pricing-feature__note">{feature.note}</strong>}</span>
                      </li>
                    ))}
                  </ul>

                  <a className={`btn btn--block pricing-card__cta${plan.featured ? " pricing-card__cta--featured" : ""}`} href="#connect">
                    {plan.cta}
                    <span className={`pricing-cta-arrow${index === 0 ? " pricing-cta-arrow--starter" : ""}`} aria-hidden="true"><PriceIcon kind="arrow"/></span>
                  </a>
                  <p className="pricing-card__footnote">{plan.footnote}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="pricing-trust">
          <span aria-hidden="true">✦</span> Clear plans. No confusing bundles. Choose what fits your trading.
        </Reveal>
      </div>
    </section>
  );
}
