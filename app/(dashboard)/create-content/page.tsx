import { Button } from '@/components/ui/button'

export default function CreateContentPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Repurpose Content Accorss All Platforms</h1>
      <p className="text-text-secondary">
        Upload your image and content, then get AI-optimized posts for LinkedIn, X, Youtube,
        Instagram and more.
      </p>

      {/* Main Box */}
      <div className="box my-10 rounded-xl bg-slate-200 p-6 dark:bg-slate-700">
        <div className="flex items-center justify-between gap-6">
          <div className="left h-80 w-80 rounded-lg border-2 border-dashed border-purple-600"></div>
          <div className="right"></div>
        </div>
        <div className="context"></div>
        <div className="choose"></div>
        <div className="flex items-center justify-center">
          <Button className="bg-brand-blue">Generate Posts</Button>
        </div>
      </div>
    </div>
  )
}
