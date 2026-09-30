import { copy } from '../../content/copy';
import { getPublishedProperties } from '../../lib/notion';
import PropertyCard from '../../components/PropertyCard';

// Τα ακίνητα ξαναδιαβάζονται από το Notion κάθε 10 λεπτά.
export const revalidate = 300;

export default async function Home({ params }) {
  const { locale } = params;
  const t = copy[locale];
  const properties = await getPublishedProperties();

  return (
    <>
      {/* Hero — split editorial (Design Brief §6) */}
      <div className="hero" id="top">
        <div className="wrap hero-in">
          <div>
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.headline}</h1>
            <p className="lede">{t.hero.support}</p>
            <div className="routes">
              <a className="btn btn-1" href={`/${locale}#properties`}>{t.hero.cta1}</a>
              <a className="btn btn-2" href={`/${locale}#seller`}>{t.hero.cta2}</a>
              <a className="btn-3" href={`/${locale}#buyer`}>
                <span>{t.hero.cta3}</span>
                <span className="arw" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <figure className="plate hero-panel">
            <span className="mark" aria-hidden="true" />
            <figcaption>{t.hero.panelCaption}</figcaption>
          </figure>
        </div>
      </div>

      {/* Curated Properties */}
      <section id="properties">
        <div className="wrap">
          <div className="sec-top">
            <h2>{t.properties.heading}</h2>
            <p className="lede">{t.properties.intro}</p>
          </div>

          {properties.length > 0 ? (
            <div className="cards">
              {properties.map((p) => (
                <PropertyCard key={p.id} p={p} t={t} locale={locale} />
              ))}
            </div>
          ) : (
            <p className="lede" style={{ marginTop: '36px' }}>{t.properties.empty}</p>
          )}

          <div style={{ marginTop: '40px' }}>
            <a className="btn-3" href={`/${locale}/akinita`}>
              <span>{t.properties.cta}</span>
              <span className="arw" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Why KYDORA */}
      <div className="band">
        <section>
          <div className="wrap">
            <div className="sec-top">
              <p className="eyebrow">{t.why.eyebrow}</p>
              <h2>{t.why.heading}</h2>
            </div>
            <div className="four">
              {t.why.items.map((it, i) => (
                <div key={it.t}>
                  <span className="num">{['I', 'II', 'III', 'IV'][i]}</span>
                  <h3>{it.t}</h3>
                  <p>{it.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Seller */}
      <section id="seller">
        <div className="wrap split">
          <div>
            <p className="eyebrow">{t.seller.eyebrow}</p>
            <h2>{t.seller.heading}</h2>
            <p className="body">{t.seller.body}</p>
            <p className="quote">{t.seller.quote}</p>
            <div className="acts">
              <a className="btn btn-1" href={`/${locale}#contact`}>{t.seller.cta}</a>
            </div>
          </div>
          <div className="plate"><span className="mark" aria-hidden="true" /></div>
        </div>
      </section>

      {/* Buyer & Investor */}
      <div className="band">
        <section id="buyer">
          <div className="wrap split rev">
            <div>
              <p className="eyebrow">{t.buyer.eyebrow}</p>
              <h2>{t.buyer.heading}</h2>
              <p className="body">{t.buyer.body}</p>
              <div className="acts">
                <a className="btn btn-1" href={`/${locale}#contact`}>{t.buyer.cta1}</a>
                <a className="btn btn-2" href={`/${locale}#contact`}>{t.buyer.cta2}</a>
              </div>
            </div>
            <div className="plate stone"><span className="mark" aria-hidden="true" /></div>
          </div>
        </section>
      </div>

      {/* Developers */}
      <section id="developers">
        <div className="wrap">
          <div className="sec-top">
            <p className="eyebrow">{t.developers.eyebrow}</p>
            <h2>{t.developers.heading}</h2>
            <p className="lede">{t.developers.body}</p>
            <div>
              <a className="btn-3" href={`/${locale}#contact`}>
                <span>{t.developers.cta}</span>
                <span className="arw" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Crete Intelligence */}
      <div className="band">
        <section id="areas">
          <div className="wrap split">
            <div className="plate stone"><span className="mark" aria-hidden="true" /></div>
            <div>
              <p className="eyebrow">{t.areas.eyebrow}</p>
              <h2>{t.areas.heading}</h2>
              <p className="body">{t.areas.body}</p>
              <div className="acts">
                <a className="btn-3" href={`/${locale}#contact`}>
                  <span>{t.areas.cta}</span>
                  <span className="arw" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Final CTA */}
      <div className="close" id="contact">
        <div className="wrap close-in">
          <h2>{t.closing.heading}</h2>
          <p>{t.closing.body}</p>
          <a className="btn btn-1" href={`/${locale}#contact`}>{t.closing.cta}</a>
        </div>
      </div>
    </>
  );
}
