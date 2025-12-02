import React from 'react'

const HowItWorksSection = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <h2 className="font-ai text-3xl leading-10 font-semibold sm:text-4xl sm:leading-16 lg:text-5xl lg:leading-22">
          How Repurfy Works
        </h2>

        <p className="text-text-secondary max-w-lg sm:max-w-3xl sm:text-lg">
          Repurfy leverages advanced AI algorithms to analyze your original content and
          automatically generate optimized versions tailored for different social media platforms.
        </p>
      </div>
    </div>
  )
}

export default HowItWorksSection
