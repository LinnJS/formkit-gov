import { useMemo } from 'react';

type AppName = 'docs' | 'demo-nextjs' | 'demo-vite' | 'landing' | 'storybook' | 'github';

const ports = {
  landing: 4000,
  docs: 4001,
  storybook: 4002,
  'demo-nextjs': 4003,
  'demo-vite': 4004,
} as const;

const productionUrls = {
  docs: 'https://docs.formkit-gov.org',
  'demo-nextjs': 'https://nextjs-demo.formkit-gov.org',
  'demo-vite': 'https://vite-demo.formkit-gov.org',
  landing: 'https://formkit-gov.org',
  storybook: 'https://storybook.formkit-gov.org',
  github: 'https://github.com/LinnJS/formkit-gov',
} as const;

const developmentUrls = {
  docs: `http://localhost:${ports.docs}`,
  'demo-nextjs': `http://localhost:${ports['demo-nextjs']}`,
  'demo-vite': `http://localhost:${ports['demo-vite']}`,
  landing: `http://localhost:${ports.landing}`,
  storybook: `http://localhost:${ports.storybook}`,
  github: 'https://github.com/LinnJS/formkit-gov',
} as const;

function useAppUrls() {
  return useMemo(() => {
    const isDev =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.startsWith('192.168.');
    return isDev ? developmentUrls : productionUrls;
  }, []);
}

const linkClassName =
  'bg-va-bg-alt text-va-text hover:bg-va-secondary focus-visible:outline-va-accent flex items-center justify-between rounded-lg px-6 py-4 font-semibold no-underline transition-all hover:translate-x-1 hover:text-white focus-visible:outline-3 focus-visible:outline-offset-2';

interface AppLinkProps {
  app: AppName;
  children: React.ReactNode;
}

function AppLink({ app, children }: AppLinkProps) {
  const urls = useAppUrls();
  return (
    <a className={linkClassName} href={urls[app]}>
      <span>{children}</span>
      <span>&rarr;</span>
    </a>
  );
}

export function AppLinks() {
  return (
    <div className="flex flex-col gap-4">
      <AppLink app="demo-nextjs">Next.js Demo</AppLink>
      <AppLink app="storybook">View Storybook</AppLink>
      <AppLink app="github">GitHub Repository</AppLink>
    </div>
  );
}
