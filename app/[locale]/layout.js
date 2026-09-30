import { EB_Garamond, Noto_Sans } from 'next/font/google';
import { copy, locales } from '../../content/copy';
import { notFound } from 'next/navigation';

// ΠΡΟΣΩΡΙΝΗ ΕΠΙΛΟΓΗ — χρειάζεται απόφαση.
//
// Το brand kit ορίζει Cormorant Garamond + Montserrat. Καμία από τις δύο
// δεν διαθέτει ελληνικά γλυφά στο Google Fonts (subsets: cyrillic, latin,
// latin-ext, vietnamese). Το Website High-Fidelity Design Brief V1 απαιτεί
// "πλήρης υποστήριξη ελληνικών και αγγλικών" — άρα οι δύο απαιτήσεις
// συγκρούονται και υπερισχύει η γλώσσα.
//
// Εδώ: EB Garamond (Garamond revival με ελληνικά) + Noto Sans (πλήρη ελληνικά).
// Να επανεξεταστεί μαζί με ενημέρωση του brief.

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
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${params.locale}`,
      languages: { el: '/el', en: '/en' },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      locale: params.locale === 'el' ? 'el_GR' : 'en_GB',
      type: 'website',
    },
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
        <header className="head">
          <div className="wrap head-in">
            <a className="brand" href={`/${locale}`} aria-label="KYDORA Real Estate & Investments">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-light.svg" alt="KYDORA Real Estate & Investments" width="400" height="103" />
            </a>
            <nav>
              <a className="nl" href={`/${locale}#properties`}>{t.nav.properties}</a>
              <a className="nl" href={`/${locale}#seller`}>{t.nav.selling}</a>
              <a className="nl" href={`/${locale}#buyer`}>{t.nav.buying}</a>
              <a className="nl" href={`/${locale}#buyer`}>{t.nav.investments}</a>
              <a className="nl" href={`/${locale}#developers`}>{t.nav.developers}</a>
              <a className="btn btn-1 btn-head" href={`/${locale}#contact`}>{t.nav.contact}</a>
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
