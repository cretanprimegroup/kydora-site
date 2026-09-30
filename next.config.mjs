/** @type {import('next').NextConfig} */

// Μέχρι το επίσημο launch το site δεν πρέπει να μπει σε μηχανές αναζήτησης.
// Όταν βγει στον αέρα: SITE_PUBLIC=true στις μεταβλητές περιβάλλοντος του Vercel.
const isPublic = process.env.SITE_PUBLIC === 'true';

const nextConfig = {
  async headers() {
    if (isPublic) return [];
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
        ],
      },
    ];
  },
};

export default nextConfig;
