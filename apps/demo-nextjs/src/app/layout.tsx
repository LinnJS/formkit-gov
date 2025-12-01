import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'FormKit Gov - Next.js Demo',
  description: 'Demo application showcasing FormKit Gov with Next.js',
  metadataBase: new URL('https://nextjs-demo.formkit-gov.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FormKit Gov - Next.js Demo',
    description: 'Demo application showcasing FormKit Gov with Next.js',
    type: 'website',
    url: 'https://nextjs-demo.formkit-gov.org',
    images: [
      {
        url: '/formkit-gov.png',
        width: 1200,
        height: 630,
        alt: 'FormKit Gov',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FormKit Gov - Next.js Demo',
    description: 'Demo application showcasing FormKit Gov with Next.js',
    images: ['/formkit-gov.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
