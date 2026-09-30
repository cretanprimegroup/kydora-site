import { copy, locales } from '../../../../content/copy';
import { getPublishedProperties, getPropertyBySlug } from '../../../../lib/notion';
import { money, area } from '../../../../components/PropertyCard';
import ContactForm from '../../../../components/ContactForm';
import { notFound } from 'next/navigation';

// Δομή: KYDORA Website Production Copy V1 — Property Detail Framework GR/EN (13/09/2026).
// Εμφανίζονται ΜΟΝΟ πεδία του εγκεκριμένου public layer. Στοιχεία ιδιοκτήτη, ακριβής
// διεύθυνση, εσωτερικά scores και όροι ανάθεσης δεν φτάνουν ποτέ εδώ (§12).
export const revalidate = 300;

export async function generateStaticParams() {
  const all = await getPublishedProperties();
  return locales.flatMap((locale) => all.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }) {
  const t = copy[params.locale];
  if (!t) return {};
  const p = await getPropertyBySlug(params.slug);
  if (!p) return { title: t.detail.notFoundTitle };

  // SEO pattern §13.
  const kind = p.type || (params.locale === 'el' ? 'Ακίνητο' : 'Property');
  const where = p.location || (params.locale === 'el' ? 'Κρήτη' : 'Crete');
  const title =
    params.locale === 'el'
      ? `${kind} προς πώληση στην ${where}`
      : `${kind} for Sale in ${where}`;

  return {
    title,
    description: p.shortDesc || p.title || undefined,
    alternates: {
      canonical: `/${params.locale}/akinita/${p.slug}`,
      languages: {
        el: `/el/akinita/${p.slug}`,
        en: `/en/akinita/${p.slug}`,
        'x-default': `/el/akinita/${p.slug}`,
      },
    },
    openGraph: {
      title,
      description: p.shortDesc || undefined,
      images: p.image ? [p.image] : [{ url: '/og.png', width: 1200, height: 630 }],
      type: 'website',
    },
  };
}

// Structured data ακινήτου. Μόνο πεδία του εγκεκριμένου public layer, και
// πάντα συνεπή με ό,τι βλέπει ο επισκέπτης — Property Detail Framework §13.
function listingSchema(p, locale) {
  const about = { '@type': 'Place', name: p.title || undefined };
  if (typeof p.area === 'number') {
    about.additionalProperty = {
      '@type': 'PropertyValue',
      name: locale === 'el' ? 'Επιφάνεια' : 'Area',
      value: p.area,
      unitCode: 'MTK',
    };
  }
  if (p.location) {
    about.address = { '@type': 'PostalAddress', addressLocality: p.location, addressCountry: 'GR' };
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: p.title || undefined,
    description: p.shortDesc || undefined,
    inLanguage: locale,
    about,
    provider: { '@type': 'RealEstateAgent', name: 'KYDORA Real Estate & Investments' },
  };

  if (typeof p.price === 'number') {
    schema.offers = {
      '@type': 'Offer',
      price: p.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    };
  }

  return schema;
}

function Fact({ label, value }) {
  if (!value) return null;
  return (
    <div className="fact">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export default async function PropertyDetail({ params }) {
  const { locale, slug } = params;
  if (!locales.includes(locale)) notFound();
  const t = copy[locale];
  const p = await getPropertyBySlug(slug);

  if (!p) {
    return (
      <section>
        <div className="wrap sec-top">
          <h1>{t.detail.notFoundTitle}</h1>
          <p className="lede">{t.detail.notFoundBody}</p>
          <div className="routes">
            <a className="btn btn-1" href={`/${locale}/akinita`}>{t.listing.back}</a>
          </div>
        </div>
      </section>
    );
  }

  const story = (locale === 'el' ? p.copy.el : p.copy.en) || p.shortDesc || '';
  const paragraphs = story.split('\n').map((s) => s.trim()).filter(Boolean);
  const eyebrow = [p.type, p.location].filter(Boolean).join(' · ');
  const mandate =
    p.mandate === 'Exclusive'
      ? t.properties.exclusive
      : p.mandate === 'Open'
        ? t.properties.open
        : null;

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema(p, locale)) }}
      />

      <div className="pd-top">
        <div className="wrap">
          <a className="btn-3 pd-back" href={`/${locale}/akinita`}>
            <span className="arw" aria-hidden="true">←</span>
            <span>{t.listing.back}</span>
          </a>

          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1>{p.title}</h1>

          <div className="pd-facts">
            <span className="price">{money(p.price, locale) || t.detail.onRequest}</span>
            {area(p.area, locale) ? <span>{area(p.area, locale)}</span> : null}
            {p.code ? <span className="code">{p.code}</span> : null}
          </div>

          <div className="routes">
            <a className="btn btn-1" href="#inquiry">{t.detail.cta1}</a>
            <a className="btn btn-2" href="#inquiry">{t.detail.cta2}</a>
          </div>

          <p className="micro">{t.detail.microcopy}</p>
        </div>
      </div>

      <div className="wrap">
        <div className="plate pd-hero">
          {p.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt={p.title || ''} fetchPriority="high" />
          ) : (
            <>
              <span className="mark" aria-hidden="true" />
              <span className="ph">{t.properties.photoPending}</span>
            </>
          )}
        </div>
      </div>

      {p.gallery.length > 0 ? (
        <div className="wrap">
          <div className="pd-gallery">
            {p.gallery.map((g) => (
              <div className="plate shot" key={g.url}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.url} alt={g.name || p.title || ''} loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <section>
        <div className="wrap pd-grid">
          <div className="pd-main">
            {paragraphs.length > 0 ? (
              <>
                <h2>{t.detail.storyHeading}</h2>
                {paragraphs.map((para, i) => (
                  <p className="body" key={i}>{para}</p>
                ))}
              </>
            ) : null}

            <h2 className="pd-h2">{t.detail.locationHeading}</h2>
            {p.location ? <p className="body">{p.location}</p> : null}
            <p className="note">{t.detail.locationNote}</p>

            <h2 className="pd-h2">{t.detail.verifyHeading}</h2>
            <p className="body">{t.detail.verifyBody}</p>
            <p className="note">{t.detail.media}</p>
          </div>

          <aside className="pd-side">
            <h2>{t.detail.factsHeading}</h2>
            <dl className="facts">
              <Fact label={t.detail.f.code} value={p.code} />
              <Fact label={t.detail.f.price} value={money(p.price, locale) || t.detail.onRequest} />
              <Fact label={t.detail.f.area} value={area(p.area, locale)} />
              <Fact label={t.detail.f.type} value={p.type} />
              <Fact label={t.detail.f.subtype} value={p.subtype} />
              <Fact label={t.detail.f.location} value={p.location} />
              <Fact label={t.detail.f.mandate} value={mandate} />
            </dl>
          </aside>
        </div>
      </section>

      <div className="band">
        <section>
          <div className="wrap sec-top">
            <h2>{t.detail.advisoryHeading}</h2>
            <p className="lede">{t.detail.advisoryBody}</p>
            <div className="routes">
              <a className="btn btn-1" href="#inquiry">
                {t.detail.advisoryCta}
              </a>
            </div>
          </div>
        </section>
      </div>

      <section id="inquiry" className="inquiry">
        <div className="wrap inquiry-in">
          <div className="sec-top">
            <h2>{t.detail.inquiryHeading}</h2>
            <p className="lede">{t.detail.inquiryIntro}</p>
            {p.code ? <p className="ref">{t.detail.f.code}: {p.code}</p> : null}
          </div>
          <ContactForm t={t} locale={locale} mode="property" propertyCode={p.code || ''} />
        </div>
      </section>
    </>
  );
}
