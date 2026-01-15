'use client'

import CreatePostForm from '@/components/CreatePostForm'

export default function CreateContentPage() {
  return (
    <div>
      {/* Heading Section */}
      <h1 className="text-2xl font-bold tracking-tight">Repurpose Content Across All Platforms</h1>

      <p className="text-text-secondary mt-1 mb-10 leading-relaxed">
        Upload your content, and get AI-optimized posts for Facebook, LinkedIn, Instagram & more.
      </p>

      {/* Main container check temp.tsx to get previouos code */}
      <p>Testing Folder structure</p>

      <CreatePostForm />
    </div>
  )
}
