import { toast } from 'react-toastify'
import axios from 'axios'

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data

    // 🎯 Rate limit case (your main issue)
    if (data?.message?.toLowerCase().includes('rate limit')) {
      toast.error('🚫 Daily limit reached (5/day). Upgrade to continue.', {
        autoClose: 4000,
      })
      return
    }

    // ⚠️ Generic backend message
    if (data?.message) {
      toast.error(`⚠️ ${data.message}`)
      return
    }
  }

  // ❌ Fallback
  toast.error('Something went wrong. Try again.')
}
