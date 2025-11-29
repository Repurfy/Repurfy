import Image from 'next/image'
import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-linear-to-br from-[#202B4B] via-[#1A2439] to-[#0A0F1A]">
      {/* --- Background Orbs --- */}
      <div className="pointer-events-none fixed inset-0">
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
        <section className="mx-auto max-w-4xl grow px-6 py-20 md:px-12 md:py-28">
          {/* Logo / Title */}
          <div className="mb-4 flex items-center justify-center gap-4">
            <Image src="/logo.svg" alt="logo" width={80} height={80} />
            <h1 className="text-5xl font-semibold text-white sm:text-6xl"> Repurfy </h1>
          </div>

          {/* Coming Soon Tag */}
          <div className="mt-4 mb-6 flex items-center justify-center gap-3">
            <div className="h-0.5 w-32 bg-linear-to-r from-transparent to-cyan-500"></div>
            <p className="text-sm font-semibold tracking-wide text-cyan-400 uppercase">
              Coming Soon
            </p>
            <div className="h-0.5 w-32 bg-linear-to-l from-transparent to-cyan-500"></div>
          </div>

          {/* Subtitle */}
          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-slate-300 md:text-2xl">
            Bring your content to life on every platform—fuelled by our{' '}
            <span className="bg-linear-to-r from-cyan-400 via-pink-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
              next-gen AI content engine.
            </span>
          </p>

          {/* Waitlist Button */}
          <a
            href="https://forms.gle/53BNApyitQJJdnCQ9"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-linear-to-r from-[#7C3AED] to-[#2563EB] px-7 py-3 font-semibold text-white shadow-lg transition hover:opacity-90"
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
                className="rounded-xl border border-slate-700/50 bg-linear-to-br from-slate-800/50 to-slate-900/50 p-3 backdrop-blur-sm transition-colors hover:border-indigo-500/50"
              >
                <div className="mb-3 text-3xl">{feature.icon}</div>
                <h3 className="mb-2 font-semibold tracking-wide text-white">{feature.label}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="mb-6 text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Repurfy. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export default Home
