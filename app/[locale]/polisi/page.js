import { copy, locales } from '../../../content/copy';
import { seller } from '../../../content/seller';
import ContactForm from '../../../components/ContactForm';
import { notFound } from 'next/navigation';

// Σελίδα Πώληση. Πηγή κειμένου: content/seller.js (εγκεκριμένο Notion copy).
//
// Κύριο conversion: Seller Consultation. Η σελίδα δεν ζητά φάκελο ακινήτου —
// χτίζει εμπιστοσύνη και ανοίγει συζήτηση.

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }) {
  const s = seller[params.locale];
  if (!s) return {};
  return {
    title: s.meta.title,
    description: s.meta.description,
    alternates: {
      canonical: `/${params.locale}/polisi`,
      languages: { el: '/el/polisi', en: '/en/polisi', 'x-default': '/el/polisi' },
    },
    openGraph: {
      title: s.meta.title,
      description: s.meta.description,
      type: 'website',
    },
  };
}

// FAQPage μόνο επειδή οι ερωτήσεις είναι πραγματικές και εμφανείς στη σελίδα
// (Finishing Pack §9). Καμία κρυφή ερώτηση, κανένα keyword stuffing.
function faqSchema(s) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faq.items.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export default function Seller({ params }) {
  const { locale } = params;
  if (!locales.includes(locale)) notFound();
  const t = copy[locale];
  const s = seller[locale];

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(s)) }}
      />

      <div className="hero hero-slim">
        <div className="wrap">
          <p className="eyebrow">{s.hero.eyebrow}</p>
          <h1>{s.hero.heading}</h1>
          <p className="lede">{s.hero.body}</p>
          <div className="acts">
            <a className="btn btn-1" href="#seller-form">{s.hero.cta}</a>
          </div>
          <p className="quote s-quote">{s.hero.quote}</p>
        </div>
      </div>

      {/* Η προσφορά μπαίνει αμέσως: είναι ο λόγος που σηκώνει κανείς τηλέφωνο. */}
      <section className="s-offer">
        <div className="wrap">
          <div className="s-offer-in">
            <div>
              <h2>{s.offer.heading}</h2>
              <p className="body">{s.offer.body}</p>
            </div>
            <div className="s-offer-side">
              <p>{s.offer.note}</p>
              <p className="s-fine">{s.offer.disclaimer}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap split">
          <div>
            <h2>{s.difference.heading}</h2>
            <p className="body">{s.difference.body}</p>
          </div>
          <div className="plate"><span className="mark" aria-hidden="true" /></div>
        </div>
      </section>

      <div className="band">
        <section>
          <div className="wrap">
            <h2 className="s-h">{s.process.heading}</h2>
            <ol className="s-steps">
              {s.process.steps.map(([label, text], i) => (
                <li key={label}>
                  <span className="s-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3>{label}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      <section>
        <div className="wrap">
          <h2 className="s-h">{s.mandates.heading}</h2>
          <div className="s-cards">
            {s.mandates.options.map(([label, text]) => (
              <div className="s-card" key={label}>
                <h3>{label}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <p className="s-fine s-fine-c">{s.mandates.note}</p>
        </div>
      </section>

      <section>
        <div className="wrap split">
          <div>
            <h2>{s.marketing.heading}</h2>
            <p className="body">{s.marketing.body}</p>
          </div>
          <div>
            <h2>{s.demand.heading}</h2>
            <p className="body">{s.demand.body}</p>
          </div>
        </div>
      </section>

      <div className="band">
        <section>
          <div className="wrap split">
            <div>
              <h2>{s.expect.heading}</h2>
              <ul className="s-list">
                {s.expect.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            {/* Απόδειξη, όχι ισχυρισμός: ο οδηγός είναι δημόσιος και γραπτός. */}
            <div className="s-proof">
              <h2>{s.proof.heading}</h2>
              <p className="body">{s.proof.body}</p>
              <a className="btn-3" href={`/${locale}${s.proof.href}`}>
                <span>{s.proof.cta}</span>
                <span className="arw" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      <section>
        <div className="wrap">
          <h2 className="s-h">{s.faq.heading}</h2>
          <dl className="s-faq">
            {s.faq.items.map(([q, a]) => (
              <div key={q}>
                <dt>{q}</dt>
                <dd>{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="seller-form" className="s-form">
        <div className="wrap">
          <div className="s-form-in">
            <h2>{s.form.heading}</h2>
            <p className="lede">{s.form.intro}</p>
            <ContactForm f={t.form} locale={locale} mode="seller" />
          </div>
        </div>
      </section>

      <div className="close">
        <div className="wrap close-in">
          <h2>{s.close.heading}</h2>
          <div className="routes">
            <a className="btn btn-1" href="#seller-form">{s.close.cta}</a>
            <a className="btn btn-2 btn-light" href={`/${locale}/epikoinonia`}>
              {t.nav.contact}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
