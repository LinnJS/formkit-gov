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
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
