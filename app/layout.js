import '../styles/globals.css';

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://kydora.gr'),
};

export default function RootLayout({ children }) {
  return children;
}
