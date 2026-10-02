import { copy, locales } from '../../../content/copy';
import { legalDocs, legalSlugs, getLegalDoc, effective, entity } from '../../../content/legal';
import { notFound } from 'next/navigation';

// Νομικές σελίδες. Το δυναμικό [legal] πιάνει ΜΟΝΟ τα slugs της λίστας —
// οτιδήποτε άλλο γίνεται 404. Οι στατικοί φάκελοι (akinita, epikoinonia,
// odigoi) έχουν προτεραιότητα στο Next, άρα δεν τους ακουμπάει.
//
// Τα slugs είναι λατινικά και ΚΟΙΝΑ στις δύο γλώσσες, με έναν λόγο που
// υπερισχύει της αισθητικής: το /en/privacy-policy είναι ΗΔΗ δημόσιο στο
// coming soon site και πιθανότατα δηλωμένο στα Meta lead forms. Αν αλλάξει,
// σπάει εξωτερικός σύνδεσμος που δεν ελέγχουμε.

export function generateStaticParams() {
  return locales.flatMap((locale) => legalSlugs.map((legal) => ({ locale, legal })));
}

export function generateMetadata({ params }) {
  const d = getLegalDoc(params.legal);
  const t = copy[params.locale];
  if (!d || !t) return {};
  const c = d[params.locale];
  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: `/${params.locale}/${d.slug}`,
      languages: {
        el: `/el/${d.slug}`,
        en: `/en/${d.slug}`,
        'x-default': `/el/${d.slug}`,
      },
    },
  };
}

export default function Legal({ params }) {
  const { locale, legal } = params;
  if (!locales.includes(locale)) notFound();
  const d = getLegalDoc(legal);
  if (!d) notFound();
  const t = copy[locale];
  const c = d[locale];

  const date = new Intl.DateTimeFormat(locale === 'el' ? 'el-GR' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(effective));

  return (
    <article>
      <div className="wrap guide">
        <p className="eyebrow">{t.legal.eyebrow}</p>
        <h1>{c.title}</h1>
        <p className="g-date">{t.legal.updated.replace('{date}', date)}</p>

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
            {(s.after || []).map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </section>
        ))}

        <aside className="g-note">
          <h2>{t.legal.contactHeading}</h2>
          <p>
            {t.legal.contactBody}{' '}
            <a href={`mailto:${entity.email}`}>{entity.email}</a>
            {' · '}
            <a href={`tel:${entity.phoneHref}`}>{entity.phone}</a>
          </p>
        </aside>

        <nav className="l-other" aria-label={t.legal.otherHeading}>
          <h2>{t.legal.otherHeading}</h2>
          <ul>
            {legalDocs
              .filter((o) => o.slug !== d.slug)
              .map((o) => (
                <li key={o.slug}>
                  <a href={`/${locale}/${o.slug}`}>{o[locale].title}</a>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </article>
  );
}
