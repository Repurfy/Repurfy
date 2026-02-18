import { Button } from './ui/button'
import { ImagePlus } from 'lucide-react'
import { useRef } from 'react'

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
  onBack: () => void
}

const AddImageForm = ({ onNext, onBack, formData, setFormData }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null)

  // 🔥 handle image select
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const imageUrl = URL.createObjectURL(file)

    setFormData((prev) => ({
      ...prev,
      photoUrl: imageUrl,
    }))
  }

  // open file picker
  const openFilePicker = () => {
    fileRef.current?.click()
  }

  return (
    <div className="border-border-subtle w-full rounded-2xl p-5 sm:p-6 dark:border-slate-700/60 dark:bg-slate-800/60">
      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-text-primary flex items-center justify-center gap-1 text-xl font-semibold sm:justify-start dark:text-white">
          <ImagePlus className="text-brand-teal h-8 w-8" />
          Add Media
          <span className="ml-2 text-xl font-semibold">(Optional)</span>
        </h2>

        <p className="text-text-secondary mt-1 text-sm dark:text-slate-400">
          Upload an image to enhance your repurposed content
        </p>
      </div>

      {/* Hidden input */}
      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={fileRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Upload Area */}
      <div
        onClick={openFilePicker}
        className="border-border-subtle bg-surface-elevated text-text-secondary hover:border-brand-teal group mb-6 flex h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-4 text-center transition-all dark:bg-slate-900/60 dark:text-slate-400"
      >
        {formData.photoUrl ? (
          <img src={formData.photoUrl} alt="preview" className="h-full rounded-lg object-contain" />
        ) : (
          <>
            <div className="bg-brand-gradient/10 group-hover:bg-brand-gradient/20 flex h-12 w-12 items-center justify-center rounded-full">
              <ImagePlus className="text-brand-teal h-7 w-7" />
            </div>

            <p className="font-medium">Drag & drop or click to upload</p>
            <p className="text-text-tertiary text-sm">PNG, JPG supported</p>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>

        <Button onClick={onNext} className="bg-brand-gradient rounded-lg font-semibold text-white">
          Continue
        </Button>
      </div>
    </div>
  )
}

export default AddImageForm
