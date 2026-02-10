import Image from 'next/image'

const Home = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="repurfy-bg min-h-screen overflow-hidden text-white">
      {/* --- Background Orbs --- */}
      <div className="pointer-events-none fixed inset-0">
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
        <section className="mx-auto max-w-7xl grow px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-20">
          {/* Logo / Title */}
          <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Image src="/logo.svg" alt="logo" width={70} height={70} />
            <h1 className="font-heading text-4xl font-semibold text-white sm:text-6xl">Repurfy</h1>
          </div>

          {/* Coming Soon */}
          <div className="mt-4 mb-6 flex items-center justify-center gap-3 px-2">
            <div className="h-0.5 w-20 bg-linear-to-r from-transparent to-teal-400 sm:w-32"></div>
            <p className="text-xs font-semibold tracking-wide text-teal-400 uppercase sm:text-sm">
              Coming Soon
            </p>
            <div className="h-0.5 w-20 bg-linear-to-l from-transparent to-teal-400 sm:w-32"></div>
          </div>

          {/* Subtitle */}
          <p className="mx-auto my-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl md:text-2xl">
            Bring your content to life on every platform—fuelled by our{' '}
            <span className="text-brand-gradient text-xl font-bold text-transparent sm:text-3xl">
              next-gen AI content engine.
            </span>
          </p>

          {/* CTA */}
          <a
            href="https://forms.gle/53BNApyitQJJdnCQ9"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-gradient inline-block rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            🚀 Get Early Access Free
          </a>

          <p className="mt-4 mb-8 text-xs text-slate-400 sm:text-sm">
            Join 100+ creators waiting for the revolution.
          </p>

          {/* --- Feature Cards --- */}
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                icon: '♻️',
                label: 'Smart Repurposing',
                desc: 'Turn any content into ready-to-post formats',
              },
              {
                icon: '📱',
                label: 'Multi-Platform Ready',
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
                className="w-80 rounded-xl border border-slate-700 bg-slate-900/40 p-5 backdrop-blur-md transition hover:border-indigo-500 sm:p-6"
              >
                <div className="mb-3 text-3xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold tracking-wide text-white">
                  {feature.label}
                </h3>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mb-8 text-xs text-slate-500 sm:text-sm">
          &copy; {currentYear} Repurfy. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export default Home
