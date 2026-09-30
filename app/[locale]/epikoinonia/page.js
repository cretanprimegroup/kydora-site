import { copy, locales } from '../../../content/copy';
import ContactForm from '../../../components/ContactForm';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }) {
  const t = copy[params.locale];
  if (!t) return {};
  return {
    title: t.contact.eyebrow,
    description:
      params.locale === 'el'
        ? 'Επικοινωνήστε με την KYDORA για αγορά, πώληση, επένδυση ή development ακινήτων στην Κρήτη.'
        : 'Contact KYDORA for property buying, selling, investment and development advisory in Crete.',
    alternates: {
      canonical: `/${params.locale}/epikoinonia`,
      languages: {
        el: '/el/epikoinonia',
        en: '/en/epikoinonia',
        'x-default': '/el/epikoinonia',
      },
    },
  };
}

export default function Contact({ params }) {
  const { locale } = params;
  if (!locales.includes(locale)) notFound();
  const t = copy[locale];

  return (
    <>
      <div className="hero hero-slim">
        <div className="wrap">
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h1>{t.contact.heading}</h1>
          <p className="lede">{t.contact.lede}</p>
        </div>
      </div>

      <section>
        <div className="wrap contact-grid">
          <div>
            <h2>{t.form.heading}</h2>
            <ContactForm t={t} locale={locale} mode="general" />
          </div>

          <aside className="channels">
            <h2>{t.contact.channelsHeading}</h2>

            <div className="ch">
              <h3>{t.contact.emailLabel}</h3>
              <p><a href="mailto:info@kydora.gr">info@kydora.gr</a></p>
            </div>

            <div className="ch">
              <h3>{t.contact.phoneLabel}</h3>
              <p><a href="tel:+302821821705">+30 28218 21705</a></p>
            </div>

            <div className="ch">
              <h3>{t.contact.officeLabel}</h3>
              <p>{t.contact.officeValue}</p>
              <p className="note">{t.contact.officeNote}</p>
            </div>

            <p className="note">{t.contact.responseNote}</p>
          </aside>
        </div>
      </section>
    </>
  );
}
