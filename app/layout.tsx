import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/hooks/useCart';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700', '800'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tracyskitchen.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tracy's Kitchen | Fresh Homemade Meals & Snacks, Made to Order",
    template: "%s | Tracy's Kitchen",
  },
  description:
    "Tracy's Kitchen prepares fresh homemade meals and snacks exclusively by pre-order in Laurel, MD. Choose pickup or delivery and order in minutes.",
  keywords: [
    "Tracy's Kitchen",
    'Laurel MD food',
    'homemade meals Laurel Maryland',
    'jollof rice preorder',
    'African food delivery Maryland',
  ],
  openGraph: {
    title: "Tracy's Kitchen | Fresh Homemade Meals & Snacks",
    description:
      'Fresh meals and snacks made exclusively by pre-order. Pickup or delivery in Laurel, MD.',
    url: siteUrl,
    siteName: "Tracy's Kitchen",
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tracy's Kitchen | Fresh Homemade Meals & Snacks",
    description:
      'Fresh meals and snacks made exclusively by pre-order. Pickup or delivery in Laurel, MD.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: "Tracy's Kitchen",
    image: `${siteUrl}/og-image.jpg`,
    telephone: '+1-301-256-7848',
    email: 'Tracyayuk3@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '329 Ellerton S',
      addressLocality: 'Laurel',
      addressRegion: 'MD',
      postalCode: '20724',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.0925,
      longitude: -76.8194,
    },
    servesCuisine: ['African', 'Homemade'],
    priceRange: '$$',
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-body bg-charcoal text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#1B1B1B',
              color: '#fff',
              border: '1px solid rgba(244,180,0,0.3)',
            },
          }}
        />
      </body>
    </html>
  );
}
