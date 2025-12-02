'use client'

import React from 'react'

interface Company {
  name: string
  logo: string
}

const TrustedBySection = () => {
  const companies: Company[] = [
    { name: 'Google', logo: '🔍' },
    { name: 'Microsoft', logo: '💻' },
    { name: 'Apple', logo: '🍎' },
    { name: 'Amazon', logo: '📦' },
    { name: 'Meta', logo: '👁️' },
    { name: 'Tesla', logo: '⚡' },
    { name: 'Netflix', logo: '🎬' },
    { name: 'Spotify', logo: '🎵' },
  ]

  // Create duplicates for seamless loop
  const extendedCompanies = [...companies, ...companies]

  return (
    <section className="overflow-hidden py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-ai text-muted-foreground mb-10 text-center text-3xl leading-10 font-semibold sm:text-4xl sm:leading-16 lg:text-3xl lg:leading-22">
          Trusted By Creators Worldwide
        </h2>

        <div className="relative flex h-40 items-center">
          {/* Left fade overlay */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24 bg-linear-to-r from-white to-transparent dark:from-slate-950" />

          {/* Right fade overlay */}
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24 bg-linear-to-l from-white to-transparent dark:from-slate-950" />

          {/* Rotating container */}
          <div className="animate-scroll flex gap-12">
            {extendedCompanies.map((company, index) => (
              <div
                key={index}
                className="flex min-w-max flex-col items-center justify-center gap-3"
              >
                <div className="text-6xl">{company.logo}</div>
                <p className="text-sm font-medium whitespace-nowrap text-slate-600 dark:text-slate-400">
                  {company.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 24px));
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default TrustedBySection
