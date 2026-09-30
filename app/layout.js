import '../styles/globals.css';

// Όσο δεν έχει συνδεθεί το kydora.gr, το metadataBase δείχνει στη διεύθυνση του
// Vercel — έτσι τα previews σε WhatsApp/Viber/Facebook δουλεύουν και πριν το launch.
const base =
  process.env.SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://kydora.gr');

export const metadata = {
  metadataBase: new URL(base),
  applicationName: 'KYDORA',
  icons: {
    icon: [{ url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
};

export const viewport = {
  themeColor: '#3f4636',
};

export default function RootLayout({ children }) {
  return children;
}
