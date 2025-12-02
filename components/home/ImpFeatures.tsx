import React from 'react'

const ImpFeatures = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <h2 className="font-ai text-3xl leading-10 font-semibold sm:text-4xl sm:leading-16 lg:text-5xl lg:leading-22">
          Important Features
        </h2>

        <p className="text-text-secondary max-w-lg sm:max-w-3xl sm:text-lg">
          Repurfy offers a suite of powerful features designed to help content creators maximize
          their reach and engagement across multiple platforms with ease.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 lg:gap-8">
        {/* Feature list can be added here in the future */}

        <div className="glass-card m-4 flex h-60 w-4/12 flex-col gap-2 rounded-lg">
          <div className="">1</div>
          <h4>Auto Editing</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, odit?</p>
        </div>
      </div>
    </div>
  )
}

export default ImpFeatures
