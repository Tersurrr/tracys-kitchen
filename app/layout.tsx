import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/hooks/useCart';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';

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

const siteUrl = 'https://cookwithtracy.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  title: {
    default: "Tracy's Kitchen | Homemade Meals & Pre-Order in Laurel, MD",
    template: "%s | Tracy's Kitchen",
  },
  description:
    "Fresh homemade meals and snacks from Tracy's Kitchen in Laurel, Maryland. Browse our menu and pre-order for pickup or delivery.",
  keywords: [
    "Tracy's Kitchen",
    'Laurel MD food',
    'homemade meals Laurel Maryland',
    'jollof rice preorder',
    'African food delivery Maryland',
  ],
  openGraph: {
    title: "Tracy's Kitchen | Homemade Meals & Pre-Order in Laurel, MD",
    description:
      "Fresh homemade meals and snacks from Tracy's Kitchen in Laurel, Maryland. Pre-order for pickup or delivery.",
    url: siteUrl,
    siteName: "Tracy's Kitchen",
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/tracys-kitchen-logo.jpg',
        width: 1254,
        height: 1254,
        alt: "Tracy's Kitchen logo",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tracy's Kitchen | Homemade Meals & Pre-Order in Laurel, MD",
    description:
      "Fresh homemade meals and snacks from Tracy's Kitchen in Laurel, Maryland. Pre-order for pickup or delivery.",
    images: ['/tracys-kitchen-logo.jpg'],
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
    url: siteUrl,
    logo: `${siteUrl}/tracys-kitchen-logo.jpg`,
    image: `${siteUrl}/tracys-kitchen-logo.jpg`,
    telephone: '+1-301-256-7848',
    email: 'Tracyayuk3@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3461 Andrew Court',
      addressLocality: 'Laurel',
      addressRegion: 'MD',
      postalCode: '20724',
      addressCountry: 'US',
    },
    servesCuisine: ['African'],
    hasMenu: `${siteUrl}/menu`,
    sameAs: [
      'https://www.facebook.com/jae.cutes.7',
      'https://www.instagram.com/jae.cutes.7',
      'https://youtube.com/@ayukjosephinee8484',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "Tracy's Kitchen",
    url: siteUrl,
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{document.documentElement.dataset.theme=localStorage.getItem('tracys-kitchen-theme')==='dark'?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}",
          }}
        />
      </head>
      <body className="font-body bg-charcoal text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([websiteSchema, localBusinessSchema]),
          }}
        />
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </CartProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'var(--toast-bg)',
              color: 'var(--toast-text)',
              border: '1px solid var(--toast-border)',
            },
          }}
        />
      </body>
    </html>
  );
}
