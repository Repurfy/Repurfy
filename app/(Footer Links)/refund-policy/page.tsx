import Footer from '@/components/common/FooterSection'
import Header from '@/components/common/Header'
import { BanknoteArrowDown } from 'lucide-react'

export default function RefundPolicy() {
  const lastUpdated = 'May 1, 2026'

  const sections = [
    {
      id: 'overview',
      title: '1. Overview',
      text: 'At Repurfy, we stand behind the quality of our product. This Refund Policy outlines when and how you can request a refund for payments made on our platform. We aim to be fair, transparent, and responsive to all refund requests.',
    },
    {
      id: 'eligibility',
      title: '2. Refund Eligibility',
      content: [
        {
          subtitle: '7-Day Money-Back Guarantee',
          text: 'New paid subscribers are eligible for a full refund within 7 days of their first payment. This applies to both monthly and annual plans. If Repurfy does not meet your expectations, simply reach out within 7 days and we will process your refund — no questions asked.',
        },
        {
          subtitle: 'Annual Plan Refunds',
          text: 'If you are on an annual plan and request a refund after the 7-day window, we may offer a pro-rated refund for the unused months at our discretion, on a case-by-case basis. Contact us and we will do our best to find a fair resolution.',
        },
        {
          subtitle: 'Monthly Plan Refunds',
          text: 'Monthly plan refunds are only available within the 7-day window from the date of each billing cycle payment. After 7 days, the payment for that cycle is non-refundable. You may cancel to avoid future charges.',
        },
      ],
    },
    {
      id: 'non-refundable',
      title: '3. Non-Refundable Situations',
      text: 'Refunds will not be issued in the following cases:',
      items: [
        'Requests made after the 7-day eligibility window has passed',
        'Accounts suspended or terminated due to violations of our Terms of Service',
        'One-time add-on purchases or credits that have already been consumed',
        'Donations made via the Support page — these are voluntary and non-refundable',
        'Partial use of a plan cycle (e.g., using the product for 6 days then requesting a refund on day 8)',
        'Refund requests due to forgetting to cancel before a renewal — we recommend setting a reminder',
      ],
    },
    {
      id: 'process',
      title: '4. How to Request a Refund',
      content: [
        {
          subtitle: 'Step 1 — Email Us',
          text: 'Send a refund request to contact@repurfy.com with the subject line "Refund Request". Include your registered email address, the date of payment, and a brief reason for the request.',
        },
        {
          subtitle: 'Step 2 — We Review',
          text: 'We will review your request within 2 business days and confirm eligibility. If approved, we will initiate the refund immediately.',
        },
        {
          subtitle: 'Step 3 — Refund Processing',
          text: 'Approved refunds are processed back to your original payment method. Timelines depend on your payment provider — typically 5–7 business days for cards, and 1–3 business days for UPI.',
        },
      ],
    },
    {
      id: 'payment-methods',
      title: '5. Refunds by Payment Method',
      content: [
        {
          subtitle: '🇮🇳 Indian Users — UPI / Razorpay',
          text: 'Refunds for payments made via UPI or Razorpay are returned to the originating UPI ID or bank account. Processing typically takes 1–3 business days after approval.',
        },
        {
          subtitle: '🌍 International Users — Stripe',
          text: 'Refunds for Stripe payments are returned to the original credit or debit card. Processing typically takes 5–10 business days depending on your card issuer.',
        },
        {
          subtitle: 'PayPal',
          text: 'Refunds for PayPal payments are returned to your PayPal balance or original funding source within 3–5 business days.',
        },
      ],
    },
    {
      id: 'cancellation',
      title: '6. Cancellation vs. Refund',
      text: 'A cancellation and a refund are two separate actions. Cancelling your subscription stops future billing and retains your access until the end of the current paid period. A refund returns money already paid. You can cancel anytime from your account settings — no email needed. For a refund, you must contact us directly.',
    },
    {
      id: 'disputes',
      title: '7. Chargebacks & Disputes',
      text: 'We strongly encourage you to contact us before initiating a chargeback or payment dispute with your bank. Chargebacks are costly for small indie businesses and often take weeks to resolve. We commit to resolving legitimate issues directly and quickly. Accounts with active chargebacks may be temporarily suspended pending resolution.',
    },
    {
      id: 'plan-changes',
      title: '8. Plan Upgrades & Downgrades',
      content: [
        {
          subtitle: 'Upgrades',
          text: 'When you upgrade your plan mid-cycle, you are billed the prorated difference immediately. The upgrade takes effect right away.',
        },
        {
          subtitle: 'Downgrades',
          text: 'Downgrading takes effect at the start of your next billing cycle. You will not receive a refund for the difference in the current cycle, but you retain access to the higher plan until the cycle ends.',
        },
      ],
    },
    {
      id: 'changes',
      title: '9. Changes to This Policy',
      text: "We may update this Refund Policy from time to time. Changes will be reflected by updating the 'Last Updated' date. For significant changes, we will notify you via email. Continued use of Repurfy after changes are posted constitutes your acceptance of the updated policy.",
    },
    {
      id: 'contact',
      title: '10. Contact Us',
      text: 'Have a question about a refund or need help with a billing issue? We respond within 24–48 hours on business days.',
      contact: {
        email: 'contact@repurfy.com',
        website: 'www.repurfy.com',
      },
    },
  ]

  return (
    <main className="bg-bg-secondary dark:bg-main-gradient text-text-secondary min-h-screen">
      <div className="border-bottom border">
        <Header />
      </div>

      <div className="container mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="fade-in-up mb-16">
          <div className="font-ai glass mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60">
            <BanknoteArrowDown size={18} className="text-brand-teal" />
            Legal Document
          </div>

          <h1 className="mb-4 text-5xl leading-tight font-bold text-white md:text-6xl font-ai">
            Refund <span className="text-brand-gradient">Policy</span>
          </h1>
          <p className="mt-4 text-base text-white/50">
            Last updated: <span className="font-medium text-white/70">{lastUpdated}</span>
          </p>
          <p className="mt-6 max-w-2xl leading-relaxed text-white/60">
            We believe in fair and transparent billing. If something isn&apos;t right, we&apos;ll
            make it right. Here&apos;s everything you need to know about refunds at Repurfy.
          </p>
        </div>

        {/* 7-day guarantee highlight card */}
        <div className="glass-card mb-12 border border-brand-teal/20 bg-brand-teal/5 p-6">
          <div className="flex items-start gap-4">
            <div className="bg-brand-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg shadow-md">
              🛡️
            </div>
            <div>
              <p className="text-sm font-semibold text-white">7-Day Money-Back Guarantee</p>
              <p className="mt-1 text-sm leading-relaxed text-white/55">
                Not satisfied within the first 7 days? Email us at{' '}
                <a
                  href="mailto:contact@repurfy.com"
                  className="text-brand-teal underline underline-offset-2 hover:opacity-80"
                >
                  contact@repurfy.com
                </a>{' '}
                and we&apos;ll issue a full refund — no questions asked.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Nav */}
        <div className="glass-card mb-12 border border-white/10 p-6">
          <p className="mb-4 text-xs font-medium tracking-widest text-white/40 uppercase">
            Jump to Section
          </p>
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="glass rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60 transition-all duration-200 hover:border-white/30 hover:text-white"
              >
                {s.title.split('. ')[1]}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              className="card-repurfy scroll-mt-24 border-white/10 bg-white/4 hover:border-white/20"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <h2 className="mb-5 flex items-center gap-3 text-xl font-semibold text-white">
                <span className="bg-brand-gradient flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-sm font-bold text-white shadow-sm">
                  {i + 1}
                </span>
                {section.title.split('. ')[1]}
              </h2>

              {/* Intro text before items */}
              {section.text && section.items && (
                <p className="mb-4 text-sm leading-relaxed text-white/55">{section.text}</p>
              )}

              {/* Subsections with subtitle */}
              {section.content && (
                <div className="space-y-5">
                  {section.content.map((item, j) => (
                    <div key={j} className="border-l border-white/10 pl-4">
                      <p className="mb-1 text-sm font-medium text-white/80">{item.subtitle}</p>
                      <p className="text-sm leading-relaxed text-white/50">{item.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Bullet list */}
              {section.items && (
                <ul className="space-y-3">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <span className="bg-brand-teal mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                      <span className="leading-relaxed text-white/55">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Plain text only */}
              {section.text && !section.items && !section.contact && (
                <p className="text-sm leading-relaxed text-white/55">{section.text}</p>
              )}

              {/* Contact section */}
              {section.contact && (
                <>
                  <p className="mb-5 text-sm leading-relaxed text-white/55">{section.text}</p>
                  <div className="glass space-y-3 rounded-xl border border-white/10 p-5">
                    <a
                      href={`mailto:${section.contact.email}`}
                      className="group flex items-center gap-3"
                    >
                      <div className="bg-brand-gradient/20 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-brand-teal"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-white/60 transition-colors group-hover:text-white">
                        {section.contact.email}
                      </span>
                    </a>
                    <a
                      href={`https://${section.contact.website}`}
                      className="group flex items-center gap-3"
                    >
                      <div className="bg-brand-gradient/20 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-brand-blue"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                          <path d="M2 12h20" />
                        </svg>
                      </div>
                      <span className="text-sm text-white/60 transition-colors group-hover:text-white">
                        {section.contact.website}
                      </span>
                    </a>
                  </div>
                </>
              )}
            </section>
          ))}
        </div>

        {/* Cross-links */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            href="/privacy"
            className="glass-card flex items-center justify-between border border-white/10 p-5 transition-all hover:border-white/20"
          >
            <div>
              <p className="text-sm font-medium text-white/80">Privacy Policy</p>
              <p className="mt-0.5 text-xs text-white/40">How we handle your data</p>
            </div>
            <span className="text-xs text-white/30">→</span>
          </a>
          <a
            href="/terms"
            className="glass-card flex items-center justify-between border border-white/10 p-5 transition-all hover:border-white/20"
          >
            <div>
              <p className="text-sm font-medium text-white/80">Terms of Service</p>
              <p className="mt-0.5 text-xs text-white/40">Rules that govern usage</p>
            </div>
            <span className="text-xs text-white/30">→</span>
          </a>
        </div>
      </div>

      <Footer />
    </main>
  )
}