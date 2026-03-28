// import { Button } from './ui/button'
// import { ImagePlus } from 'lucide-react'
// import { useRef } from 'react'

// interface FormDataType {
//   title: string
//   blogUrl: string
//   photoUrl: string
//   platforms: string[]
//   tone: string
//   audience: string
//   keywords: string[]
// }

// interface Props {
//   formData: FormDataType
//   setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
//   onNext: () => void
//   onBack: () => void
// }

// const AddImageForm = ({ onNext, onBack, formData, setFormData }: Props) => {
//   const fileRef = useRef<HTMLInputElement>(null)

//   // 🔥 handle image select
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     const imageUrl = URL.createObjectURL(file)

//     setFormData((prev) => ({
//       ...prev,
//       photoUrl: imageUrl,
//     }))
//   }

//   // open file picker
//   const openFilePicker = () => {
//     fileRef.current?.click()
//   }

//   return (
//     <div className="border-border-subtle w-full rounded-2xl p-5 sm:p-6 dark:border-slate-700/60 dark:bg-slate-800/60">
//       {/* Header */}
//       <div className="mb-6 text-center sm:text-left">
//         <h2 className="text-text-primary flex items-center justify-center gap-1 text-xl font-semibold sm:justify-start dark:text-white">
//           <ImagePlus className="text-brand-teal h-8 w-8" />
//           Add Media
//           <span className="ml-2 text-xl font-semibold">(Optional)</span>
//         </h2>

//         <p className="text-text-secondary mt-1 text-sm dark:text-slate-400">
//           Upload an image to enhance your repurposed content
//         </p>
//       </div>

//       {/* Hidden input */}
//       <input
//         type="file"
//         accept="image/png, image/jpeg"
//         ref={fileRef}
//         onChange={handleImageChange}
//         className="hidden"
//       />

//       {/* Upload Area */}
//       <div
//         onClick={openFilePicker}
//         className="border-border-subtle bg-surface-elevated text-text-secondary hover:border-brand-teal group mb-6 flex h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-4 text-center transition-all dark:bg-slate-900/60 dark:text-slate-400"
//       >
//         {formData.photoUrl ? (
//           <img src={formData.photoUrl} alt="preview" className="h-full rounded-lg object-contain" />
//         ) : (
//           <>
//             <div className="bg-brand-gradient/10 group-hover:bg-brand-gradient/20 flex h-12 w-12 items-center justify-center rounded-full">
//               <ImagePlus className="text-brand-teal h-7 w-7" />
//             </div>

//             <p className="font-medium">Drag & drop or click to upload</p>
//             <p className="text-text-tertiary text-sm">PNG, JPG supported</p>
//           </>
//         )}
//       </div>

//       {/* Footer */}
//       <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
//         <Button variant="outline" onClick={onBack}>
//           ← Back
//         </Button>

//         <Button onClick={onNext} className="bg-brand-gradient rounded-lg font-semibold text-white">
//           Continue
//         </Button>
//       </div>
//     </div>
//   )
// }

// export default AddImageForm

// import { Button } from './ui/button'
// import { ImagePlus, X } from 'lucide-react'
// import { useRef } from 'react'

// interface FormDataType {
//   title: string
//   blogUrl: string
//   photoUrl: string
//   platforms: string[]
//   tone: string
//   audience: string
//   keywords: string[]
// }

// interface Props {
//   formData: FormDataType
//   setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
//   onNext: () => void
//   onBack: () => void
// }

// const AddImageForm = ({ onNext, onBack, formData, setFormData }: Props) => {
//   const fileRef = useRef<HTMLInputElement>(null)

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return
//     setFormData((p) => ({ ...p, photoUrl: URL.createObjectURL(file) }))
//   }

//   const clearImage = () => setFormData((p) => ({ ...p, photoUrl: '' }))

//   return (
//     <div className="space-y-5">
//       {/* Header */}
//       <div className="flex items-center gap-3">
//         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10">
//           <ImagePlus className="h-5 w-5 text-teal-400" />
//         </div>
//         <div>
//           <h2 className="text-base font-semibold text-white">
//             Add Media <span className="text-sm font-normal text-slate-400">(Optional)</span>
//           </h2>
//           <p className="text-xs text-slate-400">Upload an image to enhance your content</p>
//         </div>
//       </div>

//       {/* Upload Area */}
//       <input
//         type="file"
//         accept="image/png,image/jpeg"
//         ref={fileRef}
//         onChange={handleImageChange}
//         className="hidden"
//       />

//       {formData.photoUrl ? (
//         <div className="relative h-44 overflow-hidden rounded-xl border border-slate-700">
//           <img src={formData.photoUrl} alt="preview" className="h-full w-full object-cover" />
//           <button
//             onClick={clearImage}
//             className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/80 text-white transition-colors hover:bg-red-500"
//           >
//             <X className="h-4 w-4" />
//           </button>
//         </div>
//       ) : (
//         <div
//           onClick={() => fileRef.current?.click()}
//           className="group flex h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 transition-all hover:border-teal-500 hover:bg-teal-500/5"
//         >
//           <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 transition-colors group-hover:bg-teal-500/10">
//             <ImagePlus className="h-6 w-6 text-slate-400 transition-colors group-hover:text-teal-400" />
//           </div>
//           <div className="text-center">
//             <p className="text-sm font-medium text-slate-300 transition-colors group-hover:text-white">
//               Drag & drop or click to upload
//             </p>
//             <p className="mt-0.5 text-xs text-slate-500">PNG, JPG supported</p>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-between">
//         <Button
//           variant="outline"
//           onClick={onBack}
//           className="rounded-lg border-slate-700 text-slate-300 hover:bg-slate-700"
//         >
//           ← Back
//         </Button>
//         <Button
//           onClick={onNext}
//           className="bg-brand-gradient hover:shadow-l rounded-lg font-semibold text-white shadow-md transition-all hover:scale-[1.02]"
//         >
//           Continue →
//         </Button>
//       </div>
//     </div>
//   )
// }

// export default AddImageForm

// import { Button } from './ui/button'
// import { ImagePlus, X, Sparkles, Loader2 } from 'lucide-react'
// import Image from 'next/image'
// import { useEffect, useRef, useState } from 'react'

// interface FormDataType {
//   title: string
//   blogUrl: string
//   photoUrl: string
//   platforms: string[]
//   tone: string
//   audience: string
//   keywords: string[]
// }
// interface Props {
//   formData: FormDataType
//   setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
//   onNext: () => void
//   onBack: () => void
// }

// const AddImageForm = ({ onNext, onBack, formData, setFormData }: Props) => {
//   const promptRef = useRef<HTMLTextAreaElement>(null)
//   const fileRef = useRef<HTMLInputElement>(null)
//   const [mode, setMode] = useState<'upload' | 'generate'>('upload')
//   const [prompt, setPrompt] = useState('')
//   const [generating, setGenerating] = useState(false)
//   const [error, setError] = useState('')

//   // Auto resize
//   useEffect(() => {
//     const el = promptRef.current
//     if (!el) return
//     el.style.height = 'auto'
//     el.style.height = `${el.scrollHeight}px`
//   }, [prompt])

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return
//     setFormData((p) => ({ ...p, photoUrl: URL.createObjectURL(file) }))
//   }

//   const clearImage = () => setFormData((p) => ({ ...p, photoUrl: '' }))

//   // const generateImage = async () => {
//   //   if (!prompt.trim()) return
//   //   setGenerating(true)
//   //   setError('')

//   //   try {
//   //     const response = await fetch(
//   //       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
//   //       {
//   //         method: 'POST',
//   //         headers: { 'Content-Type': 'application/json' },
//   //         body: JSON.stringify({
//   //           contents: [{ parts: [{ text: prompt }] }],
//   //           generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
//   //         }),
//   //       }
//   //     )

//   //     const data = await response.json()
//   //     const imagePart = data.candidates?.[0]?.content?.parts?.find((p: any) =>
//   //       p.inlineData?.mimeType?.startsWith('image/')
//   //     )

//   //     if (imagePart?.inlineData?.data) {
//   //       const base64 = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`
//   //       setFormData((p) => ({ ...p, photoUrl: base64 }))
//   //     } else {
//   //       setError('No image generated. Try a different prompt.')
//   //     }
//   //   } catch (err) {
//   //     setError('Failed to generate image. Check your API key.')
//   //     console.error(err)
//   //   } finally {
//   //     setGenerating(false)
//   //   }
//   // }

//   const generateImage = async () => {
//     if (!prompt.trim()) return
//     setGenerating(true)
//     setError('')

//     try {
//       const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=450&nologo=true`

//       // Pollinations returns a direct image URL
//       // We need to verify it loads correctly
//       await new Promise((resolve, reject) => {
//         const img = new Image()
//         img.onload = resolve
//         img.onerror = reject
//         img.src = imageUrl
//       })

//       setFormData((p) => ({ ...p, photoUrl: imageUrl }))
//     } catch (err) {
//       setError('Failed to generate image. Please try again.')
//       console.error(err)
//     } finally {
//       setGenerating(false)
//     }
//   }

//   return (
//     <div className="space-y-5">
//       {/* Header */}
//       <div className="flex items-center gap-3">
//         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10">
//           <ImagePlus className="h-5 w-5 text-teal-400" />
//         </div>
//         <div>
//           <h2 className="text-base font-semibold text-white">
//             Add Media <span className="text-sm font-normal text-slate-400">(Optional)</span>
//           </h2>
//           <p className="text-xs text-slate-400">Upload your own or generate with AI</p>
//         </div>
//       </div>

//       {/* Mode Toggle */}
//       <div className="flex gap-1 rounded-xl bg-slate-900/60 p-1">
//         <button
//           onClick={() => setMode('upload')}
//           className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-all ${
//             mode === 'upload'
//               ? 'bg-teal-500 text-white shadow'
//               : 'text-slate-400 hover:text-slate-200'
//           }`}
//         >
//           <ImagePlus className="h-4 w-4" /> Upload Image
//         </button>
//         <button
//           onClick={() => setMode('generate')}
//           className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-all ${
//             mode === 'generate'
//               ? 'bg-teal-500 text-white shadow'
//               : 'text-slate-400 hover:text-slate-200'
//           }`}
//         >
//           <Sparkles className="h-4 w-4" /> Generate with AI
//         </button>
//       </div>

//       {/* Upload Mode */}
//       {mode === 'upload' && (
//         <>
//           <input
//             type="file"
//             accept="image/png,image/jpeg"
//             ref={fileRef}
//             onChange={handleImageChange}
//             className="hidden"
//           />
//           {formData.photoUrl ? (
//             <div className="relative h-44 overflow-hidden rounded-xl border border-slate-700">
//               <Image src={formData.photoUrl} alt="preview" className="h-full w-full object-cover" />
//               <button
//                 onClick={clearImage}
//                 className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/80 text-white transition-colors hover:bg-red-500"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             </div>
//           ) : (
//             <div
//               onClick={() => fileRef.current?.click()}
//               className="group flex h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 transition-all hover:border-teal-500 hover:bg-teal-500/5"
//             >
//               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 transition-colors group-hover:bg-teal-500/10">
//                 <ImagePlus className="h-6 w-6 text-slate-400 transition-colors group-hover:text-teal-400" />
//               </div>
//               <div className="text-center">
//                 <p className="text-sm font-medium text-slate-300 transition-colors group-hover:text-white">
//                   Drag & drop or click to upload
//                 </p>
//                 <p className="mt-0.5 text-xs text-slate-500">PNG, JPG supported</p>
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {/* Generate Mode */}
//       {mode === 'generate' && (
//         <div className="space-y-3">
//           {/* Preview */}
//           {formData.photoUrl?.startsWith('data:') ? (
//             <div className="relative h-44 overflow-hidden rounded-xl border border-slate-700">
//               <Image
//                 src={formData.photoUrl}
//                 alt="AI generated"
//                 className="h-full w-full object-cover"
//               />
//               <button
//                 onClick={clearImage}
//                 className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/80 text-white transition-colors hover:bg-red-500"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//               <div className="absolute bottom-2 left-2 rounded-full bg-teal-500/90 px-2 py-0.5 text-xs text-white">
//                 ✨ AI Generated
//               </div>
//             </div>
//           ) : (
//             <div className="flex h-44 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 bg-slate-900/40">
//               {generating ? (
//                 <>
//                   <Loader2 className="h-8 w-8 animate-spin text-teal-400" />
//                   <p className="text-sm text-slate-400">Generating your image...</p>
//                 </>
//               ) : (
//                 <>
//                   <Sparkles className="h-8 w-8 text-slate-600" />
//                   <p className="text-sm text-slate-500">Your generated image will appear here</p>
//                 </>
//               )}
//             </div>
//           )}

//           {/* Prompt Input */}
//           <div className="flex gap-2">
//             {/* <input
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && generateImage()}
//               placeholder="e.g., A futuristic workspace with glowing screens..."
//               className="flex-1 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-white transition-all outline-none placeholder:text-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30"
//             /> */}
//             <textarea
//               ref={promptRef}
//               rows={1}
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' && !e.shiftKey) {
//                   e.preventDefault()
//                   generateImage()
//                 }
//               }}
//               placeholder="e.g., A futuristic workspace with glowing screens..."
//               className="flex-1 resize-none overflow-hidden rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-white transition-all outline-none placeholder:text-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30"
//             />
//             <Button
//               onClick={generateImage}
//               disabled={generating || !prompt.trim()}
//               className="shrink-0 rounded-xl bg-teal-500 px-4 text-white hover:bg-teal-600 disabled:opacity-40"
//             >
//               {generating ? (
//                 <Loader2 className="h-4 w-4 animate-spin" />
//               ) : (
//                 <Sparkles className="h-4 w-4" />
//               )}
//             </Button>
//           </div>

//           {error && <p className="text-xs text-red-400">{error}</p>}
//           <p className="text-xs text-slate-500">💡 Describe the image you want for your post</p>
//         </div>
//       )}

//       {/* Footer */}
//       <div className="flex justify-between">
//         <Button
//           variant="outline"
//           onClick={onBack}
//           className="rounded-xl border-slate-700 text-slate-300 hover:bg-slate-700"
//         >
//           ← Back
//         </Button>
//         <Button
//           onClick={onNext}
//           className="rounded-xl bg-teal-500 px-6 text-white hover:bg-teal-600"
//         >
//           Continue →
//         </Button>
//       </div>
//     </div>
//   )
// }

// export default AddImageForm

import { Button } from './ui/button'
import { ImagePlus, X, Sparkles, Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import axios from 'axios'
import Image from 'next/image'

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
  onBack: () => void
}

const AddImageForm = ({ onNext, onBack, formData, setFormData }: Props) => {
  const promptRef = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [mode, setMode] = useState<'upload' | 'generate'>('upload')
  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const [imageSource, setImageSource] = useState<'upload' | 'ai' | null>(null)
  const { getToken } = useAuth()

  // Auto resize textarea
  useEffect(() => {
    const el = promptRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [prompt, mode]) // 👈 added mode to fix shrink bug

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageSource('upload')
    setFormData((p) => ({ ...p, photoUrl: URL.createObjectURL(file) }))
  }

  const clearImage = () => {
    setFormData((p) => ({ ...p, photoUrl: '' }))
    setImageSource(null)
  }

  const generateImage = async () => {
    if (!prompt.trim()) return
    setGenerating(true)
    setError('')

    try {
      const token = await getToken()
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/generate-image`,
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setImageSource('ai')
      setFormData((p) => ({ ...p, photoUrl: res.data.imageUrl }))
    } catch (err) {
      setError('Failed to generate image. Please try again.')
      console.error(err)
    } finally {
      setGenerating(false)
    }
  }

  // Preview shown in both tabs if image exists
  const PreviewImage = () => (
    <div className="relative mx-auto h-auto w-full overflow-hidden rounded-xl border border-slate-700">
      <div className="flex items-center justify-center">
        <Image
          src={formData.photoUrl}
          width={300}
          height={300}
          alt="preview"
          className="lg:h-md object-cover lg:w-md"
        />
      </div>
      <button
        onClick={clearImage}
        className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/80 text-white transition-colors hover:bg-red-500"
      >
        <X className="h-4 w-4" />
      </button>
      {imageSource === 'ai' && (
        <div className="absolute bottom-2 left-2 rounded-full bg-teal-500/90 px-2 py-0.5 text-xs text-white">
          ✨ AI Generated
        </div>
      )}
      {imageSource === 'upload' && (
        <div className="absolute bottom-2 left-2 rounded-full bg-slate-700/90 px-2 py-0.5 text-xs text-white">
          📁 Uploaded
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10">
          <ImagePlus className="h-5 w-5 text-teal-400" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">
            Add Media <span className="text-sm font-normal text-slate-400">(Optional)</span>
          </h2>
          <p className="text-xs text-slate-400">Upload your own or generate with AI</p>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-1 rounded-xl bg-slate-900/60 p-1">
        <button
          onClick={() => setMode('upload')} // 👈 no clearImage on tab switch
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-all ${
            mode === 'upload'
              ? 'bg-teal-500 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ImagePlus className="h-4 w-4" /> Upload Image
        </button>
        <button
          onClick={() => setMode('generate')} // 👈 no clearImage on tab switch
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-all ${
            mode === 'generate'
              ? 'bg-teal-500 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="h-4 w-4" /> Generate with AI
        </button>
      </div>

      {/* Upload Mode */}
      {mode === 'upload' && (
        <>
          <input
            type="file"
            accept="image/png,image/jpeg"
            ref={fileRef}
            onChange={handleImageChange}
            className="hidden"
          />
          {formData.photoUrl ? (
            <PreviewImage />
          ) : (
            <div
              onClick={() => fileRef.current?.click()}
              className="group flex h-52 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 transition-all hover:border-teal-500 hover:bg-teal-500/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 transition-colors group-hover:bg-teal-500/10">
                <ImagePlus className="h-6 w-6 text-slate-400 transition-colors group-hover:text-teal-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-300 transition-colors group-hover:text-white">
                  Drag & drop or click to upload
                </p>
                <p className="mt-0.5 text-xs text-slate-500">PNG, JPG supported</p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Generate Mode */}
      {mode === 'generate' && (
        <div className="space-y-3">
          {formData.photoUrl ? (
            <PreviewImage />
          ) : (
            <div className="flex h-52 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 bg-slate-900/40">
              {generating ? (
                <>
                  <Loader2 className="h-8 w-8 animate-spin text-teal-400" />
                  <p className="text-sm text-slate-400">Generating your image...</p>
                  <p className="text-xs text-slate-500">This may take 10–30 seconds</p>
                </>
              ) : (
                <>
                  <Sparkles className="h-8 w-8 text-slate-600" />
                  <p className="text-sm text-slate-500">Your generated image will appear here</p>
                </>
              )}
            </div>
          )}

          {/* Prompt Input */}
          <div className="flex gap-2">
            <textarea
              ref={promptRef}
              rows={1}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  generateImage()
                }
              }}
              placeholder="e.g., A futuristic workspace with glowing screens..."
              className="flex-1 resize-none overflow-hidden rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-white transition-all outline-none placeholder:text-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30"
            />
            <Button
              onClick={generateImage}
              disabled={generating || !prompt.trim()}
              className="shrink-0 self-end rounded-xl bg-teal-500 px-4 text-white hover:bg-teal-600 disabled:opacity-40"
            >
              {generating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
            </Button>
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}
          <p className="text-xs text-slate-500">
            💡 Describe the image you want • Press Enter to generate
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="rounded-xl border-slate-700 text-slate-300 hover:bg-slate-700"
        >
          ← Back
        </Button>
        <Button onClick={onNext} className="bg-brand-gradient rounded-lg">
          Continue →
        </Button>
      </div>
    </div>
  )
}

export default AddImageForm
