export interface PromoValidationResult {
  isValid: boolean
  message: string
  code?: string
  discountType?: 'percentage' | 'fixed'
  discountValue?: number
  discountedClerkPlanId?: string
}

export const validatePromoCodeClient = (
  promo: {
    active: boolean
    expiresAt?: string | Date
    maxUses?: number
    usedCount?: number
    applicablePlans?: string[]
  },
  originalPlanId: string,
  now: Date = new Date()
): { isValid: boolean; message: string } => {
  if (!promo.active) {
    return { isValid: false, message: 'This promo code is inactive' }
  }
  if (promo.expiresAt && new Date(promo.expiresAt) < now) {
    return { isValid: false, message: 'This promo code has expired' }
  }
  if (promo.maxUses !== undefined && promo.maxUses !== null && (promo.usedCount ?? 0) >= promo.maxUses) {
    return { isValid: false, message: 'This promo code is fully redeemed' }
  }
  if (promo.applicablePlans && promo.applicablePlans.length > 0) {
    if (!promo.applicablePlans.includes(originalPlanId)) {
      return { isValid: false, message: 'This promo code is not applicable to the selected plan' }
    }
  }
  return { isValid: true, message: 'Promo code is valid' }
}

export const calculateDiscount = (
  originalPrice: number,
  discountType: 'percentage' | 'fixed',
  discountValue: number
): number => {
  if (discountType === 'percentage') {
    return Number(((originalPrice * discountValue) / 100).toFixed(2))
  } else if (discountType === 'fixed') {
    return Math.min(discountValue, originalPrice)
  }
  return 0
}

export const calculateFinalPrice = (
  originalPrice: number,
  discountAmount: number
): number => {
  return Number(Math.max(0, originalPrice - discountAmount).toFixed(2))
}
