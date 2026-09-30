// Μέχρι το launch: πλήρης αποκλεισμός. SITE_PUBLIC=true το ανοίγει.
export default function robots() {
  const isPublic = process.env.SITE_PUBLIC === 'true';
  return {
    rules: isPublic
      ? { userAgent: '*', allow: '/' }
      : { userAgent: '*', disallow: '/' },
    sitemap: isPublic ? `${process.env.SITE_URL || 'https://kydora.gr'}/sitemap.xml` : undefined,
  };
}
