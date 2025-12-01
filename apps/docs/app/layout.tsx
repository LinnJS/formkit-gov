import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import 'nextra-theme-docs/style.css';

export const metadata = {
  metadataBase: new URL('https://docs.formkit-gov.org'),
  title: {
    default: 'FormKit Gov',
    template: '%s – FormKit Gov',
  },
  description: 'Production-quality form components for government applications',
  openGraph: {
    title: 'FormKit Gov Documentation',
    description: 'Production-quality form components for government applications',
    siteName: 'FormKit Gov',
    images: [{ url: '/formkit-gov.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/formkit-gov.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

const logo = (
  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        height: '28px',
        backgroundColor: '#112e51',
        borderRadius: '6px',
        padding: '4px',
      }}
    >
      <img alt="FormKit Gov logo" height={20} src="/logo.svg" width={20} />
    </span>
    <strong>FormKit Gov</strong>
  </span>
);

const navbar = <Navbar logo={logo} projectLink="https://github.com/LinnJS/formkit-gov" />;

const footer = (
  <Footer>
    MIT {new Date().getFullYear()} © FormKit Gov. Not affiliated with the U.S. Department of
    Veterans Affairs.
  </Footer>
);

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pageMap = await getPageMap();

  return (
    <html suppressHydrationWarning dir="ltr" lang="en">
      <Head>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="#112e51" name="theme-color" />
      </Head>
      <body>
        <Layout
          docsRepositoryBase="https://github.com/LinnJS/formkit-gov/tree/main/apps/docs"
          editLink="Edit this page on GitHub →"
          feedback={{ content: 'Question? Give us feedback →', labels: 'feedback' }}
          footer={footer}
          navbar={navbar}
          pageMap={pageMap}
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
          toc={{ backToTop: true }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
