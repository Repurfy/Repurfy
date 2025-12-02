import React from 'react'

const DemoSection = () => {
  return (
    <div className="bg-primary-foreground container mx-auto flex flex-col items-center justify-center gap-3 px-4 py-20 text-center sm:px-8 lg:px-20">
      <h2 className="font-ai text-3xl leading-10 font-semibold sm:text-4xl sm:leading-16 lg:text-5xl lg:leading-22">
        See Repurfy in Action
      </h2>

      <p className="text-text-secondary max-w-lg sm:max-w-3xl sm:text-lg">
        Watch how Repurfy transforms a single piece of content into a multitude of optimized posts
        for various platforms, saving you time and effort.
      </p>

      <div className="border-border-secondary mt-10 w-full max-w-4xl overflow-hidden rounded-lg border shadow-lg">
        <iframe
          className="h-64 w-full sm:h-96"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Repurfy Demo Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default DemoSection
