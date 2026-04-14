import { ClipboardList, Link, FileText } from 'lucide-react'
import { Button } from './ui/button'
import { useEffect, useRef, useState } from 'react'

interface FormDataType {
  title: string
  blogUrl: string
  photoUrl: string
  platforms: string[]
  tone: string
  audience: string[]
  keywords: string[]
}

interface Props {
  formData: FormDataType
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
  onNext: () => void
}

const AddContentForm = ({ onNext, formData, setFormData }: Props) => {
  const [mode, setMode] = useState<'text' | 'url'>('text')

  const hasValue = mode === 'text' ? formData.title.trim() : formData.blogUrl.trim()

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto resize on value change
  // useEffect(() => {
  //   const el = textareaRef.current
  //   if (!el) return
  //   el.style.height = 'auto'
  //   el.style.height = `${el.scrollHeight}px`
  // }, [formData.title, mode])

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return

    el.style.height = 'auto'

    const maxHeight = 300 // 👈 limit like ChatGPT
    const newHeight = Math.min(el.scrollHeight, maxHeight)

    el.style.height = newHeight + 'px'

    // enable scroll after limit
    if (el.scrollHeight > maxHeight) {
      el.style.overflowY = 'auto'
    } else {
      el.style.overflowY = 'hidden'
    }
  }, [formData.title])

  return (
    <div className="min-h-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10">
          <FileText className="h-5 w-5 text-teal-400" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">Add Your Content</h2>
          <p className="text-xs text-slate-400">Paste text or add a YouTube / blog URL</p>
        </div>
      </div>

      {/* Toggle */}
      <div className="flex gap-2 rounded-xl p-1">
        <button
          onClick={() => setMode('text')}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 py-2 text-sm font-medium transition-all ${
            mode === 'text'
              ? 'bg-teal-500 text-white shadow'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          <ClipboardList className="h-4 w-4" /> Paste Text
        </button>
        <button
          onClick={() => setMode('url')}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 py-2 text-sm font-medium transition-all ${
            mode === 'url'
              ? 'bg-teal-500 text-white shadow'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Link className="h-4 w-4" /> From URL
        </button>
      </div>

      {/* Input */}
      {mode === 'text' ? (
        // <textarea
        //   ref={textareaRef}
        //   name="title"
        //   rows={1}
        //   cols={20}
        //   value={formData.title}
        //   onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
        //   placeholder="Paste your blog post, article, or long-form content here…"
        //   className="min-h-40! w-full rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-sm text-white transition-all outline-none placeholder:text-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30"
        // />
        <textarea
          ref={textareaRef}
          name="title"
          value={formData.title}
          onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
          placeholder="Paste your content here…"
          className="min-h-30 w-full resize-none overflow-hidden rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-sm text-white transition-[height] duration-150 ease-in-out outline-none placeholder:text-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30"
        />
      ) : (
        <input
          name="blogUrl"
          value={formData.blogUrl}
          onChange={(e) => setFormData((p) => ({ ...p, blogUrl: e.target.value }))}
          placeholder="https://youtube.com/… or blog/podcast link"
          className="w-full rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-sm text-white transition-all outline-none placeholder:text-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30"
        />
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">💡 More detail = better output quality</p>
        <Button
          onClick={onNext}
          disabled={!hasValue}
          className="bg-brand-gradient hover:shadow-l rounded-lg font-semibold text-white shadow-md transition-all hover:scale-[1.02]"
        >
          Continue →
        </Button>
      </div>
    </div>
  )
}

export default AddContentForm
