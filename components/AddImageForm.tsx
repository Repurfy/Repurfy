import { Button } from './ui/button'
import { ImagePlus } from 'lucide-react'

interface Props {
  onNext: () => void
  onBack: () => void
}

const AddImageForm = ({ onNext, onBack }: Props) => {
  return (
    <div className="border-border-subtle w-full rounded-2xl p-5 sm:p-6 dark:border-slate-700/60 dark:bg-slate-800/60">
      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-text-primary flex items-center justify-center gap-1 text-xl font-semibold sm:justify-start dark:text-white">
          <ImagePlus className="text-brand-teal h-5 w-5" /> Add Media{' '}
          <span className="text-text-primary text-xl font-semibold dark:text-white">
            (Optional)
          </span>
        </h2>
        <p className="text-text-secondary mt-1 text-sm dark:text-slate-400">
          Upload an image to enhance your repurposed content
        </p>
      </div>

      {/* Upload Area */}
      <div className="border-border-subtle bg-surface-elevated text-text-secondary hover:border-brand-teal group mb-6 flex h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-4 text-center transition-all dark:bg-slate-900/60 dark:text-slate-400">
        <div className="bg-brand-gradient/10 group-hover:bg-brand-gradient/20 flex h-10 w-10 items-center justify-center rounded-full">
          <ImagePlus className="text-brand-teal h-5 w-5" />
        </div>

        <p className="font-medium">Drag & drop an image here</p>
        <p className="text-text-tertiary text-sm">or click to upload (PNG, JPG)</p>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-border-subtle text-text-secondary hover:text-text-primary dark:border-slate-600 dark:text-slate-300"
        >
          ← Back
        </Button>

        <Button
          onClick={onNext}
          className="bg-brand-gradient rounded-lg font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

export default AddImageForm
