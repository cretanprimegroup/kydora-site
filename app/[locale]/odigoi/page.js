import { copy, locales } from '../../../content/copy';
import { guides } from '../../../content/guides';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }) {
  const t = copy[params.locale];
  if (!t) return {};
  return {
    title: t.guides.heading,
    description: t.guides.lede,
    alternates: {
      canonical: `/${params.locale}/odigoi`,
      languages: { el: '/el/odigoi', en: '/en/odigoi', 'x-default': '/el/odigoi' },
    },
  };
}

export default function Guides({ params }) {
  const { locale } = params;
  if (!locales.includes(locale)) notFound();
  const t = copy[locale];

  return (
    <>
      <div className="hero hero-slim">
        <div className="wrap">
          <p className="eyebrow">{t.guides.eyebrow}</p>
          <h1>{t.guides.heading}</h1>
          <p className="lede">{t.guides.lede}</p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <ul className="g-list">
            {guides.map((g) => {
              const c = g[locale];
              return (
                <li key={g.slug}>
                  <a href={`/${locale}/odigoi/${g.slug}`}>
                    {g.draft ? <span className="g-draft">{t.guides.draftBadge}</span> : null}
                    <h2>{c.title}</h2>
                    <p>{c.description}</p>
                    <span className="btn-3">
                      <span>{t.guides.read}</span>
                      <span className="arw" aria-hidden="true">→</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
