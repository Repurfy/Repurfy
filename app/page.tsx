import Image from 'next/image'

const Home = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="bg-bg-secondary dark:bg-main-gradient min-h-screen overflow-hidden">
      {/* --- Background Orbs (Only visible in dark mode) --- */}
      <div className="pointer-events-none fixed inset-0 opacity-0 dark:opacity-100">
        <div className="absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full bg-indigo-600/20 blur-3xl"></div>
        <div
          className="absolute right-1/4 bottom-0 h-96 w-96 animate-pulse rounded-full bg-purple-600/20 blur-3xl"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 right-0 h-80 w-80 animate-pulse rounded-full bg-indigo-500/10 blur-3xl"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* --- Main Layout --- */}
      <div className="relative z-10 flex min-h-screen flex-col px-4 text-center">
        {/* --- Hero Section --- */}
        <section className="mx-auto max-w-4xl grow px-6 py-20 md:px-12 md:py-24">
          {/* Logo / Title */}
          <div className="mb-4 flex items-center justify-center gap-4">
            <Image src="/logo.svg" alt="logo" width={80} height={80} />
            <h1 className="font-heading text-brand-navy text-5xl font-semibold sm:text-6xl dark:text-white">
              Repurfy
            </h1>
          </div>

          {/* Coming Soon Tag */}
          <div className="mt-4 mb-6 flex items-center justify-center gap-3">
            <div className="to-brand-teal h-0.5 w-32 bg-linear-to-r from-transparent"></div>
            <p className="text-brand-teal text-sm font-semibold tracking-wide uppercase">
              Coming Soon
            </p>
            <div className="to-brand-teal h-0.5 w-32 bg-linear-to-l from-transparent"></div>
          </div>

          {/* Subtitle */}
          <p className="text-text-secondary mx-auto mb-10 max-w-2xl text-xl leading-relaxed md:text-2xl dark:text-slate-300">
            Bring your content to life on every platform—fuelled by our{' '}
            <span className="text-brand-gradient text-3xl font-bold">
              next-gen AI content engine.
            </span>
          </p>

          {/* Waitlist Button */}
          <a
            href="https://forms.gle/53BNApyitQJJdnCQ9"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-gradient inline-block rounded-xl px-7 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
          >
            Join Waitlist
          </a>

          {/* --- Feature Cards --- */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: '♻️',
                label: 'Smart Repurposing',
                desc: 'Turn any content into ready-to-post formats',
              },
              {
                icon: '🌐',
                label: 'Multi-Platform Output',
                desc: 'Get platform-ready posts in one click',
              },
              {
                icon: '🎯',
                label: 'Brand Control',
                desc: 'Stay consistent with custom tone & context',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="card-repurfy bg-surface-card border-border-subtle hover:border-brand-teal shadow-none dark:border-slate-700/50 dark:bg-slate-800/50 dark:hover:border-indigo-500/50"
              >
                <div className="mb-3 text-3xl">{feature.icon}</div>
                <h3 className="text-text-primary mb-2 font-semibold tracking-wide dark:text-white">
                  {feature.label}
                </h3>
                <p className="text-text-secondary text-sm dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="text-text-tertiary mb-6 text-sm dark:text-slate-500">
          &copy; {currentYear} Repurfy. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export default Home
