import { EB_Garamond, Noto_Sans } from 'next/font/google';
import { copy, locales } from '../../content/copy';
import { notFound } from 'next/navigation';

// ΓΡΑΜΜΑΤΟΣΕΙΡΕΣ SITE — εγκεκριμένο 30/09/2026.
//
// EB Garamond (τίτλοι) + Noto Sans (σώμα κειμένου).
//
// Γιατί όχι Cormorant Garamond + Montserrat, όπως ορίζει το brand kit:
// καμία από τις δύο δεν διαθέτει ελληνικά γλυφά στο Google Fonts
// (subsets: cyrillic, cyrillic-ext, latin, latin-ext, vietnamese).
// Το Website High-Fidelity Design Brief V1 απαιτεί ρητά "πλήρης
// υποστήριξη ελληνικών και αγγλικών", άρα υπερισχύει η γλώσσα.
// Η EB Garamond είναι επίσης αναβίωση της Garamond και κρατά το ύφος.
//
// Το σχεδιασμένο wordmark και τα σύμβολα ΔΕΝ επηρεάζονται — είναι vector
// artwork, όχι κείμενο.

const display = EB_Garamond({
  subsets: ['latin', 'latin-ext', 'greek'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--f-display-loaded',
  display: 'swap',
});

const body = Noto_Sans({
  subsets: ['latin', 'latin-ext', 'greek'],
  weight: ['300', '400', '500', '600'],
  variable: '--f-body-loaded',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }) {
  const t = copy[params.locale];
  if (!t) return {};
  return {
    title: {
      default: t.meta.title,
      // Κάθε εσωτερική σελίδα κρατά το όνομα στο tab και στα αποτελέσματα.
      template: '%s | KYDORA',
    },
    description: t.meta.description,
    alternates: {
      canonical: `/${params.locale}`,
      languages: { el: '/el', en: '/en', 'x-default': '/el' },
    },
    openGraph: {
      siteName: 'KYDORA Real Estate & Investments',
      title: t.meta.title,
      description: t.meta.description,
      locale: params.locale === 'el' ? 'el_GR' : 'en_GB',
      alternateLocale: params.locale === 'el' ? 'en_GB' : 'el_GR',
      type: 'website',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'KYDORA Real Estate & Investments' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
      images: ['/og.png'],
    },
  };
}

// Structured data. Μόνο επαληθευμένα, δημόσια στοιχεία της εταιρείας.
function orgSchema(locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'KYDORA Real Estate & Investments',
    url: `https://kydora.gr/${locale}`,
    logo: 'https://kydora.gr/icon-512.png',
    image: 'https://kydora.gr/og.png',
    email: 'info@kydora.gr',
    telephone: '+302821821705',
    vatID: 'EL803168861',
    parentOrganization: { '@type': 'Organization', name: 'Cretan Prime Group' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: locale === 'el' ? 'Πλατανιάς' : 'Platanias',
      addressRegion: locale === 'el' ? 'Χανιά, Κρήτη' : 'Chania, Crete',
      addressCountry: 'GR',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: locale === 'el' ? 'Χανιά' : 'Chania' },
      { '@type': 'AdministrativeArea', name: locale === 'el' ? 'Κρήτη' : 'Crete' },
    ],
    knowsLanguage: ['el', 'en'],
  };
}

export default function LocaleLayout({ children, params }) {
  const { locale } = params;
  if (!locales.includes(locale)) notFound();
  const t = copy[locale];
  const other = locale === 'el' ? 'en' : 'el';

  return (
    <html lang={locale} className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema(locale)) }}
        />
        <header className="head">
          <div className="wrap head-in">
            <a className="brand" href={`/${locale}`} aria-label="KYDORA Real Estate & Investments">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-light.svg" alt="KYDORA Real Estate & Investments" width="400" height="103" />
            </a>
            <nav>
              <a className="nl" href={`/${locale}/akinita`}>{t.nav.properties}</a>
              <a className="nl" href={`/${locale}#seller`}>{t.nav.selling}</a>
              <a className="nl" href={`/${locale}#buyer`}>{t.nav.buying}</a>
              <a className="nl" href={`/${locale}#buyer`}>{t.nav.investments}</a>
              <a className="nl" href={`/${locale}#developers`}>{t.nav.developers}</a>
              <a className="btn btn-1 btn-head" href={`/${locale}/epikoinonia`}>{t.nav.contact}</a>
              <span className="lang">
                <a href="/el" aria-current={locale === 'el' ? 'true' : undefined} hrefLang="el">ΕΛ</a>
                <a href="/en" aria-current={locale === 'en' ? 'true' : undefined} hrefLang="en">EN</a>
              </span>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer>
          <div className="wrap">
            <div className="foot">
              <div>
                <h4>{t.footer.office}</h4>
                <p className="sel">+30 2821 821 705</p>
                <p className="sel">info@kydora.gr</p>
                <p>{t.footer.address}</p>
              </div>
              <div>
                <h4>{t.footer.services}</h4>
                <p><a href={`/${locale}#seller`}>{t.nav.selling}</a></p>
                <p><a href={`/${locale}#buyer`}>{t.nav.buying}</a></p>
                <p><a href={`/${locale}#buyer`}>{t.nav.investments}</a></p>
                <p><a href={`/${locale}#developers`}>{t.nav.developers}</a></p>
              </div>
              <div>
                <h4>{t.footer.company}</h4>
                <p>{t.footer.legalName}</p>
                <p>{t.footer.endorsement}</p>
                <p><a href={`/${other}`} hrefLang={other}>{other === 'en' ? 'English' : 'Ελληνικά'}</a></p>
              </div>
            </div>
            <div className="foot-base">
              <small>{t.footer.ids}</small>
              <span className="tag">{t.footer.tagline}</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
