import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#202B4B] via-[#1A2439] to-[#0A0F1A] overflow-hidden">

      {/* --- Background Orbs --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* --- Main Layout --- */}
      <div className="relative z-10 flex flex-col min-h-screen px-4 text-center">

        {/* --- Hero Section --- */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-28 grow">

          {/* Logo / Title */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image src="/logo.svg" alt="logo" width={80} height={80} />
            <h1 className="text-5xl sm:text-6xl font-semibold text-white"> Repurfy </h1>
          </div>

          {/* Coming Soon Tag */}
          <div className="flex items-center justify-center gap-3 mt-4 mb-6">
            <div className="h-0.5 w-32 bg-linear-to-r from-transparent to-cyan-500"></div>
            <p className="text-cyan-400 text-sm uppercase font-semibold tracking-wide">
              Coming Soon
            </p>
            <div className="h-0.5 w-32 bg-linear-to-l from-transparent to-cyan-500"></div>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Bring your content to life on every platform—fuelled by our{" "}
            <span className="text-3xl font-bold bg-linear-to-r from-cyan-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              next-gen AI content engine.
            </span>
          </p>

          {/* Waitlist Button */}
          <a
            href="https://forms.gle/53BNApyitQJJdnCQ9"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-xl bg-linear-to-r from-[#7C3AED] to-[#2563EB] text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            Join Waitlist
          </a>

          {/* --- Feature Cards --- */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              {
                icon: "♻️",
                label: "Smart Repurposing",
                desc: "Turn any content into ready-to-post formats",
              },
              {
                icon: "🌐",
                label: "Multi-Platform Output",
                desc: "Get platform-ready posts in one click",
              },
              {
                icon: "🎯",
                label: "Brand Control",
                desc: "Stay consistent with custom tone & context",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-3 backdrop-blur-sm hover:border-indigo-500/50 transition-colors"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-white font-semibold mb-2 tracking-wide">
                  {feature.label}
                </h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="mb-6 text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Repurfy. All rights reserved.
        </footer>

      </div>
    </div>
  );
};

export default Home;
