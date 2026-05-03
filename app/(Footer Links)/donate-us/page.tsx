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
import Header from '@/components/common/Header'
import Footer from '@/components/common/FooterSection'

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const UPI_ID = '8882231629-2@ibl'
const PAYPAL_LINK = 'https://paypal.me/kumarRahul5757'
// ─────────────────────────────────────────────────────────────────────────────

type Region = 'india' | 'international'

interface Tier {
  icon: React.ElementType
  label: string
  inrAmount: number
  usdAmount: number
  popular?: boolean
}

const TIERS: Tier[] = [
  {
    icon: CoffeeIcon,
    label: 'Buy me a chai',
    inrAmount: 99,
    usdAmount: 3,
  },
  {
    icon: ZapIcon,
    label: 'Fuel a feature',
    inrAmount: 299,
    usdAmount: 9,
    popular: true,
  },
  {
    icon: StarIcon,
    label: 'Power supporter',
    inrAmount: 999,
    usdAmount: 29,
  },
]

const REGIONS = [
  { value: 'india' as Region, flag: '🇮🇳', label: 'India' },
  { value: 'international' as Region, flag: '🌍', label: 'International' },
]

function buildUpiLink(amount: number) {
  return `upi://pay?pa=${UPI_ID}&pn=Repurfy&am=${amount}&cu=INR&tn=Repurfy+Support`
}

function buildPayPalLink(amount: number) {
  return `${PAYPAL_LINK}/${amount}USD`
}

export default function DonationPage() {
  const [region, setRegion] = useState<Region>('india')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState(1)
  const [customAmount, setCustomAmount] = useState('')
  const [showCustom, setShowCustom] = useState(false)
  const [showUpiDesktop, setShowUpiDesktop] = useState(false)
  const [copied, setCopied] = useState(false)

  const activeRegion = REGIONS.find((r) => r.value === region)!
  const tier = TIERS[selectedTier]

  const activeInr = showCustom ? parseInt(customAmount) || 0 : tier.inrAmount
  const activeUsd = showCustom ? parseInt(customAmount) || 0 : tier.usdAmount

  const displayAmount = showCustom
    ? customAmount
      ? `${region === 'india' ? '₹' : '$'}${customAmount}`
      : '—'
    : region === 'india'
      ? `₹${tier.inrAmount}`
      : `$${tier.usdAmount}`

  const handleCopy = () => {
    navigator.clipboard.writeText(UPI_ID)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDonate = () => {
    if (region === 'india') {
      const isMobile = /Android|iPhone/i.test(navigator.userAgent)
      if (isMobile) {
        window.location.href = buildUpiLink(activeInr)
      } else {
        setShowUpiDesktop(true)
      }
    } else {
      window.open(buildPayPalLink(activeUsd), '_blank')
    }
  }

  return (
    <main className="bg-bg-secondary dark:bg-main-gradient text-text-secondary min-h-screen">
      <div className="border-bottom border">
        <Header />
      </div>

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
            <HeartIcon className="h-4 w-4 fill-rose-400 text-rose-400" />
            Built solo, with love
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="font-ai mb-3 text-2xl font-bold leading-14 sm:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Support <span className="text-brand-teal">Repurfy&apos;s</span> journey
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
                className=" flex items-center gap-3 rounded-xl border border-brand-cyan/20 bg-surface-card px-5 py-3 text-sm font-medium transition-all hover:border-brand-cyan/40"
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
                    className="absolute left-0 right-0 z-20 mt-2 w-fit overflow-hidden rounded-xl border border-brand-cyan/20 bg-surface-card shadow-xl"
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
                            setShowUpiDesktop(false)
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

            {/* Payment method hint — animates between regions */}
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
                  ? '🔒 Paid via UPI · Billed in ₹ INR'
                  : '🔒 Paid via PayPal · Billed in $ USD'}
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
                    setShowUpiDesktop(false)
                  }}
                  className={`relative flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all duration-200 ${
                    isActive
                      ? 'border-brand-teal bg-brand-teal/10 shadow-lg shadow-teal-500/10'
                      : 'border-brand-cyan/15 bg-surface-card hover:border-brand-cyan/35'
                  }`}
                >
                  {t.popular && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-gradient px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-sm">
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
                onClick={() => {
                  setShowCustom(true)
                  setShowUpiDesktop(false)
                }}
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
            className="w-fit"
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
          </motion.div>

          {/* ── Desktop UPI card (shown after clicking Donate on desktop) ── */}
          <AnimatePresence>
            {showUpiDesktop && region === 'india' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
                className="mt-6 w-full max-w-sm rounded-2xl border border-brand-cyan/20 bg-surface-card p-5 text-left"
              >
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-secondary">
                  Pay via UPI
                </p>
                <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                  Open GPay, PhonePe or Paytm and send{' '}
                  <span className="font-semibold text-white">₹{activeInr}</span> to:
                </p>

                {/* UPI ID row */}
                <div className="flex items-center justify-between gap-3 rounded-xl border border-brand-cyan/20 bg-white/5 px-4 py-3">
                  <span className="font-mono text-sm text-brand-teal">{UPI_ID}</span>
                  <button
                    onClick={handleCopy}
                    className={`shrink-0 text-xs underline underline-offset-2 transition-colors ${
                      copied ? 'text-brand-teal' : 'text-text-secondary hover:text-brand-teal'
                    }`}
                  >
                    {copied ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>

                <p className="text-text-secondary mt-3 text-xs">
                  Add note:{' '}
                  <span className="font-medium text-white/70">Repurfy Support</span>
                </p>

                <button
                  onClick={() => setShowUpiDesktop(false)}
                  className="text-text-secondary hover:text-brand-teal mt-4 text-xs underline underline-offset-2 transition-colors"
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>

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

      <Footer />
    </main>
  )
}