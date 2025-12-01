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
    icon: '/favicon.svg',
  },
};

const logo = (
  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <svg
      fill="none"
      height="24"
      viewBox="0 0 100 100"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        fill="none"
        height="60"
        rx="4"
        stroke="#112e51"
        strokeWidth="4"
        width="80"
        x="10"
        y="20"
      />
      <line stroke="#112e51" strokeWidth="4" x1="10" x2="90" y1="35" y2="35" />
      <rect fill="#0071bc" height="8" rx="2" width="25" x="20" y="45" />
      <rect fill="#0071bc" height="8" rx="2" width="60" x="20" y="58" />
      <circle cx="75" cy="49" fill="#02bfe7" r="8" />
      <path
        d="M72 49L74 51L78 47"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
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
      <Head faviconGlyph="📋">
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
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
