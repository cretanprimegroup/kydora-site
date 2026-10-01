import { copy, locales } from '../../../../content/copy';
import { guides, getGuide } from '../../../../content/guides';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return locales.flatMap((locale) => guides.map((g) => ({ locale, slug: g.slug })));
}

export function generateMetadata({ params }) {
  const g = getGuide(params.slug);
  const t = copy[params.locale];
  if (!g || !t) return {};
  const c = g[params.locale];
  return {
    title: c.title,
    description: c.description,
    // Προσχέδιο = ποτέ σε μηχανή αναζήτησης, ανεξάρτητα από το SITE_PUBLIC.
    ...(g.draft ? { robots: { index: false, follow: false } } : null),
    alternates: {
      canonical: `/${params.locale}/odigoi/${g.slug}`,
      languages: {
        el: `/el/odigoi/${g.slug}`,
        en: `/en/odigoi/${g.slug}`,
        'x-default': `/el/odigoi/${g.slug}`,
      },
    },
    openGraph: {
      title: c.title,
      description: c.description,
      type: 'article',
      publishedTime: g.published,
    },
  };
}

function articleSchema(g, locale) {
  const c = g[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    description: c.description,
    inLanguage: locale,
    datePublished: g.published,
    author: { '@type': 'Organization', name: 'KYDORA Real Estate & Investments' },
    publisher: {
      '@type': 'Organization',
      name: 'KYDORA Real Estate & Investments',
      logo: { '@type': 'ImageObject', url: 'https://kydora.gr/icon-512.png' },
    },
    mainEntityOfPage: `https://kydora.gr/${locale}/odigoi/${g.slug}`,
  };
}

export default function Guide({ params }) {
  const { locale, slug } = params;
  if (!locales.includes(locale)) notFound();
  const g = getGuide(slug);
  if (!g) notFound();
  const t = copy[locale];
  const c = g[locale];

  const date = new Intl.DateTimeFormat(locale === 'el' ? 'el-GR' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(g.published));

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(g, locale)) }}
      />

      <article>
        <div className="wrap guide">
          <a className="btn-3 pd-back" href={`/${locale}/odigoi`}>
            <span className="arw" aria-hidden="true">←</span>
            <span>{t.guides.back}</span>
          </a>

          <p className="eyebrow">{t.guides.eyebrow}</p>
          {g.draft ? <p className="g-draft">{t.guides.draftBadge}</p> : null}
          <h1>{c.title}</h1>
          <p className="g-date">{date}</p>

          {c.intro.map((para) => (
            <p className="lede g-lede" key={para.slice(0, 24)}>{para}</p>
          ))}

          {c.sections.map((s) => (
            <section className="g-sec" key={s.h}>
              <h2>{s.h}</h2>
              {(s.p || []).map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
              {s.defs ? (
                <dl className="g-defs">
                  {s.defs.map(([label, text]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{text}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {s.ol ? (
                <ol className="g-ol">
                  {s.ol.map(([label, text]) => (
                    <li key={label}>
                      <strong>{label}</strong> — {text}
                    </li>
                  ))}
                </ol>
              ) : null}
              {(s.after || []).map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </section>
          ))}

          <aside className="g-note">
            <h2>{c.disclaimerHeading}</h2>
            <p>{c.disclaimer}</p>
          </aside>
        </div>
      </article>

      <div className="close">
        <div className="wrap close-in">
          <h2>{t.guides.ctaHeading}</h2>
          <div className="routes">
            <a className="btn btn-1" href={`/${locale}/epikoinonia`}>{c.cta1}</a>
            <a className="btn btn-2 btn-light" href={`/${locale}/akinita`}>{c.cta2}</a>
          </div>
        </div>
      </div>
    </>
  );
}
