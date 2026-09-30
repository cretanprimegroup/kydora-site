import { locales } from '../content/copy';
import { getPublishedProperties } from '../lib/notion';

// Sitemap μόνο όταν το site είναι δημόσιο. Πριν το launch δεν δίνουμε χάρτη
// σε μηχανή αναζήτησης — ταιριάζει με το robots.js και το X-Robots-Tag.
export default async function sitemap() {
  if (process.env.SITE_PUBLIC !== 'true') return [];

  const base = (process.env.SITE_URL || 'https://kydora.gr').replace(/\/$/, '');
  const now = new Date();
  const alt = (path) => ({
    languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}${path}`])),
  });

  const pages = [
    { path: '', priority: 1 },
    { path: '/akinita', priority: 0.9 },
  ];

  const entries = locales.flatMap((locale) =>
    pages.map((p) => ({
      url: `${base}/${locale}${p.path}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: p.priority,
      alternates: alt(p.path),
    })),
  );

  const properties = await getPublishedProperties();
  for (const prop of properties) {
    for (const locale of locales) {
      entries.push({
        url: `${base}/${locale}/akinita/${prop.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: alt(`/akinita/${prop.slug}`),
      });
    }
  }

  return entries;
}
