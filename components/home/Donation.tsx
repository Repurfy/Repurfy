'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  CoffeeIcon,
  ZapIcon,
  StarIcon,
  ChevronDownIcon,
  HeartIcon,
  ExternalLinkIcon,
} from 'lucide-react'

// ─── CONFIG — update these ────────────────────────────────────────────────────
const UPI_ID = 'yourname@upi'                           // your UPI VPA
const RAZORPAY_LINK = 'https://razorpay.me/@yourhandle' // Razorpay payment page
const STRIPE_LINK = 'https://buy.stripe.com/your-link'  // Stripe payment link
const PAYPAL_LINK = 'https://paypal.me/yourhandle'      // PayPal.me link
// ─────────────────────────────────────────────────────────────────────────────

type Region = 'india' | 'international'

interface Tier {
  icon: React.ElementType
  label: string
  inrAmount: number
  usdAmount: number
  description: string
  popular?: boolean
}

const TIERS: Tier[] = [
  {
    icon: CoffeeIcon,
    label: 'Buy me a chai',
    inrAmount: 99,
    usdAmount: 3,
    description: 'A small gesture that means a lot',
  },
  {
    icon: ZapIcon,
    label: 'Fuel a feature',
    inrAmount: 299,
    usdAmount: 9,
    description: 'Help me ship something cool',
    popular: true,
  },
  {
    icon: StarIcon,
    label: 'Power supporter',
    inrAmount: 999,
    usdAmount: 29,
    description: "You're an absolute legend",
  },
]

const REGIONS = [
  { value: 'india' as Region, flag: '🇮🇳', label: 'India' },
  { value: 'international' as Region, flag: '🌍', label: 'International' },
]

export default function DonationSection() {
  const [region, setRegion] = useState<Region>('india')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState(1)
  const [customAmount, setCustomAmount] = useState('')
  const [showCustom, setShowCustom] = useState(false)

  const activeRegion = REGIONS.find((r) => r.value === region)!
  const tier = TIERS[selectedTier]

  const displayAmount = showCustom
    ? customAmount
      ? `${region === 'india' ? '₹' : '$'}${customAmount}`
      : '—'
    : region === 'india'
    ? `₹${tier.inrAmount}`
    : `$${tier.usdAmount}`

  const handleDonate = () => {
    if (region === 'india') {
      const amt = showCustom ? customAmount : tier.inrAmount
      const isMobile = /Android|iPhone/i.test(navigator.userAgent)
      if (isMobile) {
        // UPI deep link — opens GPay / PhonePe / Paytm on mobile
        window.location.href = `upi://pay?pa=${UPI_ID}&pn=Repurfy&am=${amt}&cu=INR&tn=Repurfy+Support`
      } else {
        window.open(RAZORPAY_LINK, '_blank')
      }
    } else {
      window.open(STRIPE_LINK, '_blank')
    }
  }

  return (
    <section className="relative overflow-hidden px-4 py-24">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[480px] w-[480px] rounded-full bg-brand-teal/5 blur-[130px]" />
      </div>

      <motion.div
        className="relative mx-auto flex max-w-2xl flex-col items-center text-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Badge */}
        <motion.div
          className="mb-6 flex items-center gap-2 rounded-full border border-brand-cyan/20 bg-surface-card px-4 py-2 text-sm text-text-secondary"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <HeartIcon className="h-4 w-4 text-rose-400 fill-rose-400" />
          Built solo, with love
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="font-ai mb-3 text-2xl font-bold sm:text-5xl leading-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Support{' '}
          <span className="text-brand-teal">Repurfy&apos;s</span> journey
        </motion.h2>

        <motion.p
          className="text-text-secondary mb-10 max-w-md text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          I&apos;m a solo indie founder building this in public. If Repurfy saves you time,
          consider buying me a chai — it keeps me going ☕
        </motion.p>

        {/* ── Region selector ── */}
        <motion.div
          className="mb-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          <p className="text-text-secondary mb-1 text-xs uppercase tracking-widest">
            Your region
          </p>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="w-auto flex items-center gap-3 rounded-xl border border-brand-cyan/20 bg-surface-card px-5 py-3 text-sm font-medium transition-all hover:border-brand-cyan/40"
            >
              <span className="text-base">{activeRegion.flag}</span>
              <span>{activeRegion.label}</span>
              <ChevronDownIcon
                className={`h-4 w-4 text-text-secondary transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="w-40 absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-xl border border-brand-cyan/20 bg-surface-card shadow-xl"
                >
                  {REGIONS.map((r) => (
                    <li key={r.value}>
                      <button
                        onClick={() => {
                          setRegion(r.value)
                          setDropdownOpen(false)
                          setShowCustom(false)
                          setCustomAmount('')
                          setSelectedTier(1)
                        }}
                        className={`flex w-full items-center gap-3 px-5 py-3 text-sm transition-colors hover:bg-brand-cyan/5 ${
                          region === r.value
                            ? 'font-medium text-brand-teal'
                            : 'text-text-secondary'
                        }`}
                      >
                        <span className="text-base">{r.flag}</span>
                        <span>{r.label}</span>
                        {region === r.value && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-teal" />
                        )}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Payment method hint */}
          <AnimatePresence mode="wait">
            <motion.p
              key={region}
              className="text-text-secondary mt-1 text-xs"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {region === 'india'
                ? '🔒 UPI / Razorpay · Billed in ₹ INR'
                : '🔒 Stripe · Billed in $ USD'}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* ── Tier cards ── */}
        <motion.div
          className="mb-6 grid w-full grid-cols-3 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {TIERS.map((t, i) => {
            const Icon = t.icon
            const isActive = !showCustom && selectedTier === i
            return (
              <motion.button
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                onClick={() => {
                  setSelectedTier(i)
                  setShowCustom(false)
                  setCustomAmount('')
                }}
                className={`relative flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all duration-200 ${
                  isActive
                    ? 'border-brand-teal bg-brand-teal/10 shadow-lg shadow-teal-500/10'
                    : 'border-brand-cyan/15 bg-surface-card hover:border-brand-cyan/35'
                }`}
              >
                {t.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-sm whitespace-nowrap">
                    Popular
                  </span>
                )}
                <Icon
                  className={`h-5 w-5 ${isActive ? 'text-brand-teal' : 'text-text-secondary'}`}
                />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${region}-${i}`}
                    className={`text-lg font-bold ${isActive ? 'text-brand-teal' : ''}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {region === 'india' ? `₹${t.inrAmount}` : `$${t.usdAmount}`}
                  </motion.span>
                </AnimatePresence>
                <span className="text-text-secondary text-[11px] leading-tight">{t.label}</span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* ── Custom amount ── */}
        <motion.div
          className="mb-8 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {!showCustom ? (
            <button
              onClick={() => setShowCustom(true)}
              className="text-text-secondary hover:text-brand-teal text-sm underline underline-offset-4 transition-colors"
            >
              Enter a custom amount
            </button>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-brand-cyan/25 bg-surface-card px-4 py-3">
              <span className="text-text-secondary font-medium">
                {region === 'india' ? '₹' : '$'}
              </span>
              <input
                type="number"
                min={1}
                placeholder={region === 'india' ? 'e.g. 500' : 'e.g. 15'}
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-secondary/40"
                autoFocus
              />
              <button
                onClick={() => {
                  setShowCustom(false)
                  setCustomAmount('')
                }}
                className="text-text-secondary hover:text-brand-teal text-xs transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </motion.div>

        {/* ── CTA Button ── */}
        <motion.div
          className="w-1/3"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 }}
        >
          <Button
            onClick={handleDonate}
            className="bg-brand-gradient group inline-flex w-full items-center justify-center gap-2 rounded-xl p-6 text-base font-semibold text-white shadow-lg shadow-teal-500/25 transition-all duration-300 hover:scale-[1.02]"
          >
            <HeartIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-125" />
            Donate {displayAmount}
            <ExternalLinkIcon className="h-4 w-4 opacity-60" />
          </Button>

          {/* PayPal fallback for international */}
          {region === 'international' && (
            <motion.p
              className="text-text-secondary mt-3 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Prefer PayPal?{' '}
              <a
                href={PAYPAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-teal underline underline-offset-2 hover:opacity-80"
              >
                Click here
              </a>
            </motion.p>
          )}
        </motion.div>

        {/* Footer note */}
        <motion.p
          className="text-text-secondary mt-8 max-w-sm text-xs leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65 }}
        >
          Donations are voluntary and non-refundable. You won&apos;t receive a product or service
          in return — just my deepest gratitude 🙏
        </motion.p>
      </motion.div>
    </section>
  )
}