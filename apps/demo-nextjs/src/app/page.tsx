import { AppLinks } from '../components/app-links';

export default function Home() {
  return (
    <main className="from-va-primary flex min-h-screen items-center justify-center bg-gradient-to-br to-[#1a4480] font-sans">
      <div className="max-w-[600px] p-8 text-center">
        <div className="bg-va-primary mx-auto mb-8 h-[160px] w-[160px] rounded-[32px] p-6 shadow-[0_25px_50px_rgba(0,0,0,0.3)]">
          <img alt="FormKit Gov logo" className="h-full w-full" src="/logo.svg" />
        </div>

        <h1 className="mb-2 text-4xl font-bold text-white">FormKit Gov</h1>
        <p className="mb-8 text-xl text-white/80">Next.js Demo</p>

        <div className="rounded-2xl bg-white p-10 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
          <span className="bg-va-accent text-va-primary mb-6 inline-block rounded-full px-4 py-2 text-sm font-semibold">
            Coming Soon
          </span>
          <h2 className="text-va-primary mb-4 text-[1.75rem]">Next.js Example App</h2>
          <p className="text-va-text-muted mb-8 leading-relaxed">
            This demo will showcase how to use FormKit Gov components in a Next.js application with
            full TypeScript support.
          </p>

          <AppLinks />
        </div>
      </div>
    </main>
  );
}
