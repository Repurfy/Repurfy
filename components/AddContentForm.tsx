import { ClipboardList, FileText, Link } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'

interface FormDataType {
  title: string
  blogUrl: string
  photoUrl: string
  platforms: string[]
  tone: string
  audience: string
  keywords: string[]
}

interface Props {
  formData: FormDataType
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
  onNext: () => void
}

const AddContentForm = ({ onNext, formData, setFormData }: Props) => {
  const [showContentInput, setShowContentInput] = useState(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="border-border-subtle w-full rounded-2xl p-5 sm:p-6 dark:border-slate-700/60 dark:bg-slate-800/60">
      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-text-primary flex items-center justify-center gap-1 text-xl font-semibold sm:justify-start dark:text-white">
          <FileText className="text-brand-teal h-8 w-8" />
          Add Your Content
        </h2>
        <p className="text-text-secondary mt-1 text-sm dark:text-slate-400">
          Paste long‑form content or add a YouTube / podcast link
        </p>
      </div>

      {/* Toggle */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => setShowContentInput(true)}
          className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
            showContentInput
              ? 'bg-brand-gradient text-white shadow-md'
              : 'bg-surface-elevated text-text-secondary hover:text-text-primary dark:bg-slate-700/50 dark:text-slate-300'
          } `}
        >
          <ClipboardList className="h-4 w-4" />
          Paste Text
        </button>

        <button
          onClick={() => setShowContentInput(false)}
          className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
            !showContentInput
              ? 'bg-brand-gradient text-white shadow-md'
              : 'bg-surface-elevated text-text-secondary hover:text-text-primary dark:bg-slate-700/50 dark:text-slate-300'
          } `}
        >
          <Link className="h-4 w-4" />
          From URL
        </button>
      </div>

      {/* Input */}
      {showContentInput ? (
        <textarea
          name="title"
          className="bg-surface-elevated text-text-primary placeholder:text-text-tertiary focus:ring-brand-teal border-border-subtle h-44 w-full resize-none rounded-xl border p-4 text-[14px] outline-none focus:ring-2 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500"
          placeholder="Paste your long‑form content here…"
          value={formData.title}
          onChange={(e) => handleChange(e)}
        />
      ) : (
        <input
          name="blogUrl"
          className="bg-surface-elevated text-text-primary placeholder:text-text-tertiary focus:ring-brand-teal border-border-subtle w-full rounded-xl border p-4 outline-none focus:ring-2 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500"
          placeholder="https://youtube.com/… or podcast link"
          value={formData.blogUrl}
          onChange={(e) => handleChange(e)}
        />
      )}

      <div className="text-text-secondary p-2 text-xs">
        Tip: The more detailed, the better the output
      </div>

      {/* Footer CTA */}
      <div className="flex justify-end">
        <Button
          onClick={() => {
            onNext()
          }}
          className="bg-brand-gradient rounded-lg font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

export default AddContentForm
