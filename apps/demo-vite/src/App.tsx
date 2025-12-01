import { Logo } from './components/logo';

export default function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#112e51] to-[#1a4480] font-sans">
      <div className="max-w-[600px] p-8 text-center">
        <div className="mx-auto mb-8 h-[120px] w-[120px] rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
          <Logo className="h-full w-full" />
        </div>

        <h1 className="mb-2 text-4xl font-bold text-white">FormKit Gov</h1>
        <p className="mb-8 text-xl text-white/80">Vite Demo</p>

        <div className="rounded-2xl bg-white p-10 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
          <span className="mb-6 inline-block rounded-full bg-[#02bfe7] px-4 py-2 text-sm font-semibold text-[#112e51]">
            Coming Soon
          </span>
          <h2 className="mb-4 text-[1.75rem] text-[#112e51]">Vite Example App</h2>
          <p className="mb-8 leading-relaxed text-[#5b616b]">
            This demo will showcase how to use FormKit Gov components in a Vite + React application
            with full TypeScript support.
          </p>

          <div className="flex flex-col gap-4">
            <a
              className="focus-visible:outline-3 flex items-center justify-between rounded-lg bg-[#f1f1f1] px-6 py-4 font-semibold text-[#212121] no-underline transition-all hover:translate-x-1 hover:bg-[#0071bc] hover:text-white focus-visible:outline-offset-2 focus-visible:outline-[#02bfe7]"
              href="https://nextjs-demo.formkit-gov.org"
            >
              <span>Next.js Demo</span>
              <span>&rarr;</span>
            </a>
            <a
              className="focus-visible:outline-3 flex items-center justify-between rounded-lg bg-[#f1f1f1] px-6 py-4 font-semibold text-[#212121] no-underline transition-all hover:translate-x-1 hover:bg-[#0071bc] hover:text-white focus-visible:outline-offset-2 focus-visible:outline-[#02bfe7]"
              href="https://storybook.formkit-gov.org"
            >
              <span>View Storybook</span>
              <span>&rarr;</span>
            </a>
            <a
              className="focus-visible:outline-3 flex items-center justify-between rounded-lg bg-[#f1f1f1] px-6 py-4 font-semibold text-[#212121] no-underline transition-all hover:translate-x-1 hover:bg-[#0071bc] hover:text-white focus-visible:outline-offset-2 focus-visible:outline-[#02bfe7]"
              href="https://github.com/LinnJS/formkit-gov"
            >
              <span>GitHub Repository</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
