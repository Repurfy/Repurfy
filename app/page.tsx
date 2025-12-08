import Image from 'next/image'

const Home = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="bg-bg-secondary dark:bg-main-gradient min-h-screen overflow-hidden">
      {/* --- Background Orbs (Dark Mode Only) --- */}
      <div className="pointer-events-none fixed inset-0 opacity-0 dark:opacity-100">
        <div className="absolute top-0 left-1/4 h-72 w-72 animate-pulse rounded-full bg-indigo-600/20 blur-3xl sm:h-96 sm:w-96"></div>
        <div
          className="absolute right-1/4 bottom-0 h-72 w-72 animate-pulse rounded-full bg-purple-600/20 blur-3xl sm:h-96 sm:w-96"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 right-0 h-60 w-60 animate-pulse rounded-full bg-indigo-500/10 blur-3xl sm:h-80 sm:w-80"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* --- Main Layout --- */}
      <div className="relative z-10 flex min-h-screen flex-col px-4 text-center">
        {/* --- Hero Section --- */}
        <section className="mx-auto max-w-4xl grow px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24">
          {/* Logo / Title */}
          <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Image src="/logo.svg" alt="logo" width={70} height={70} />
            <h1 className="font-heading text-brand-navy text-4xl font-semibold sm:text-6xl dark:text-white">
              Repurfy
            </h1>
          </div>

          {/* Coming Soon Tag */}
          <div className="mt-4 mb-6 flex items-center justify-center gap-3 px-2">
            <div className="to-brand-teal h-0.5 w-20 bg-linear-to-r from-transparent sm:w-32"></div>
            <p className="text-brand-teal text-xs font-semibold tracking-wide uppercase sm:text-sm">
              Coming Soon
            </p>
            <div className="to-brand-teal h-0.5 w-20 bg-linear-to-l from-transparent sm:w-32"></div>
          </div>

          {/* Subtitle */}
          <p className="text-text-secondary mx-auto mb-10 max-w-2xl text-lg leading-relaxed sm:text-xl md:text-2xl dark:text-slate-300">
            Bring your content to life on every platform—fuelled by our{' '}
            <span className="text-brand-gradient text-xl font-bold sm:text-3xl">
              next-gen AI content engine.
            </span>
          </p>

          {/* Waitlist Button */}
          <a
            href="https://forms.gle/53BNApyitQJJdnCQ9"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-gradient inline-block rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Join Waitlist
          </a>

          {/* --- Feature Cards --- */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
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
                className="card-repurfy bg-surface-card border-border-subtle hover:border-brand-teal p-5 shadow-none sm:p-6 dark:border-slate-700/50 dark:bg-slate-800/50 dark:hover:border-indigo-500/50"
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
        <footer className="text-text-tertiary mb-6 text-xs sm:text-sm dark:text-slate-500">
          &copy; {currentYear} Repurfy. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export default Home
