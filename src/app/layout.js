import localFont from 'next/font/local';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { SITE_URL } from '@/lib/utils';

// Fonts are bundled in src/app/fonts (no Google Fonts request at build time)
const cormorant = localFont({
  src: [
    { path: './fonts/cormorant-garamond-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/cormorant-garamond-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/cormorant-garamond-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-cormorant',
  display: 'swap',
});
const inter = localFont({
  src: [
    { path: './fonts/inter-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/inter-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/inter-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
});

const TITLE = 'SKINORA | Skincare & Beauty Store';
const DESCRIPTION = 'Considered formulas and quiet rituals, made in small batches. Shop serums, cleansers, moisturizers and sunscreen, or find your routine with our skin finder.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: '%s | SKINORA' },
  description: DESCRIPTION,
  keywords: ['skincare', 'serum', 'moisturizer', 'sunscreen', 'cleanser', 'SKINORA'],
  applicationName: 'SKINORA',
  icons: { icon: '/images/logo-mark.png', apple: '/images/logo-mark.png' },
  openGraph: { type: 'website', siteName: 'SKINORA', title: TITLE, description: DESCRIPTION, locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#f6f1ea' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <StoreProvider>
          <div className="page">
            <Header />
            <main>{children}</main>
            <Toast />
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
