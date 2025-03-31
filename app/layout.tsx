import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Navbar } from 'components/layout/navbar';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from 'react';
import api from 'lib/api';
import type { Collection } from 'lib/types';
import { CartProvider } from 'components/cart/cart-context';
import './globals.css';

export const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: 'Next.js Commerce',
    template: '%s | Next.js Commerce'
  },
  description: 'High-performance ecommerce store built with Next.js.',
  keywords: ['Next.js', 'React', 'JavaScript', 'Shop', 'Commerce', 'Store'],
  authors: [
    {
      name: 'Vercel',
      url: 'https://vercel.com'
    }
  ],
  creator: 'Vercel',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://vercel.com',
    siteName: 'Next.js Commerce'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js Commerce',
    description: 'High-performance ecommerce store built with Next.js.',
    images: [`${defaultUrl}/og.png`],
    creator: '@vercel'
  },
  icons: {
    icon: '/favicon.ico'
  }
};

const geistSans = GeistSans;
const geistMono = GeistMono;

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const collections = await api.getCollections();

  return (
    <html lang="fr" className={geistSans.variable}>
      <body className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
        <CartProvider cartPromise={api.getCart()}>
          <Navbar collections={collections} />
          <Suspense>
            {children}
          </Suspense>
          <Analytics />
          <SpeedInsights />
        </CartProvider>
      </body>
    </html>
  );
}
