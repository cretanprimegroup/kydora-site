import { copy, locales } from '../../../content/copy';
import { getPublishedProperties } from '../../../lib/notion';
import PropertyCard from '../../../components/PropertyCard';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }) {
  const t = copy[params.locale];
  if (!t) return {};
  return {
    title: t.listing.heading,
    description: t.listing.lede,
    alternates: {
      canonical: `/${params.locale}/akinita`,
      languages: { el: '/el/akinita', en: '/en/akinita', 'x-default': '/el/akinita' },
    },
  };
}

export default async function Properties({ params }) {
  const { locale } = params;
  if (!locales.includes(locale)) notFound();
  const t = copy[locale];
  const properties = await getPublishedProperties();

  return (
    <>
      <div className="hero hero-slim">
        <div className="wrap">
          <p className="eyebrow">{t.listing.eyebrow}</p>
          <h1>{t.listing.heading}</h1>
          <p className="lede">{t.listing.lede}</p>
          <p className="lede">{t.listing.support}</p>
          <div className="routes">
            <a className="btn btn-2" href={`/${locale}#contact`}>{t.listing.cta2}</a>
          </div>
        </div>
      </div>

      <section>
        <div className="wrap">
          {properties.length > 0 ? (
            <>
              <div className="res-top">
                <p className="count">{t.listing.count(properties.length)}</p>
                <p className="note">{t.listing.note}</p>
              </div>

              <div className="cards">
                {properties.map((p) => (
                  <PropertyCard key={p.id} p={p} t={t} locale={locale} />
                ))}
              </div>

              {properties.length <= 3 ? (
                <div className="aside-note">
                  <h2>{t.listing.lowHeading}</h2>
                  <p className="lede">{t.listing.lowBody}</p>
                  <a className="btn-3" href={`/${locale}#contact`}>
                    <span>{t.listing.cta2}</span>
                    <span className="arw" aria-hidden="true">→</span>
                  </a>
                </div>
              ) : null}
            </>
          ) : (
            <div className="sec-top">
              <h2>{t.listing.emptyHeading}</h2>
              <p className="lede">{t.listing.emptyBody}</p>
              <p className="lede">{t.listing.emptySupport}</p>
              <div className="routes">
                <a className="btn btn-1" href={`/${locale}#contact`}>{t.listing.cta2}</a>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="band">
        <section>
          <div className="wrap sec-top">
            <h2>{t.listing.curatedHeading}</h2>
            <p className="lede">{t.listing.curatedBody}</p>
          </div>
        </section>
      </div>

      <div className="close" id="contact">
        <div className="wrap close-in">
          <h2>{t.listing.assistHeading}</h2>
          <p>{t.listing.assistBody}</p>
          <a className="btn btn-1" href={`/${locale}#contact`}>{t.listing.cta2}</a>
        </div>
      </div>
    </>
  );
}
