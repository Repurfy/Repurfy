// privacy-policy.tsx
// Drop this file into your Next.js app/pages directory
// Uses your existing global.css classes: .repurfy-bg, .glass, .card-repurfy, .text-brand-gradient, etc.

import Footer from '@/components/common/FooterSection'
import Header from '@/components/common/Header'
import { Badge, FileBadge, FileBadge2Icon } from 'lucide-react'

export default function PrivacyPolicy() {
  const lastUpdated = 'April 14, 2026'

  const sections = [
    {
      id: 'information-we-collect',
      title: '1. Information We Collect',
      content: [
        {
          subtitle: 'Account Information',
          text: 'When you create a Repurfy account, we collect your name, email address, and password. If you sign up via OAuth (Google, GitHub), we receive only the data permitted by your authorization.',
        },
        {
          subtitle: 'Usage Data',
          text: 'We automatically collect data about how you interact with our platform — including pages visited, features used, content processed, and time spent. This helps us improve product quality.',
        },
        {
          subtitle: 'Content You Upload',
          text: 'To repurpose your content, we temporarily process the text, audio, or video you submit. We do not store your raw content beyond what is required to complete the repurposing task.',
        },
        {
          subtitle: 'Payment Information',
          text: 'Payments are processed by our third-party provider (Stripe). We never store your full card details on our servers.',
        },
      ],
    },
    {
      id: 'how-we-use',
      title: '2. How We Use Your Information',
      items: [
        'To provide, operate, and improve the Repurfy platform',
        'To personalize your experience and content suggestions',
        'To send transactional emails (billing, account alerts)',
        'To send product updates and newsletters (you may opt out anytime)',
        'To detect and prevent fraud, abuse, or security incidents',
        'To comply with legal obligations',
      ],
    },
    {
      id: 'sharing',
      title: '3. How We Share Your Information',
      content: [
        {
          subtitle: 'We do not sell your data.',
          text: 'Repurfy does not sell, rent, or trade your personal information to third parties for marketing purposes.',
        },
        {
          subtitle: 'Service Providers',
          text: 'We share data with trusted vendors (hosting, payments, analytics) strictly to operate our service. All vendors are bound by data processing agreements.',
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose information if required by law, court order, or to protect the rights and safety of Repurfy, our users, or the public.',
        },
      ],
    },
    {
      id: 'cookies',
      title: '4. Cookies & Tracking',
      items: [
        'Essential cookies — required for login sessions and security',
        'Analytics cookies — help us understand usage patterns (e.g., PostHog, Plausible)',
        'Preference cookies — remember your settings and theme choices',
        'You can disable non-essential cookies in your browser settings at any time',
      ],
    },
    {
      id: 'data-retention',
      title: '5. Data Retention',
      text: 'We retain your account data for as long as your account is active. If you delete your account, we remove your personal data within 30 days, except where retention is required by law (e.g., billing records for up to 7 years).',
    },
    {
      id: 'your-rights',
      title: '6. Your Rights',
      items: [
        'Access — request a copy of the personal data we hold about you',
        'Correction — ask us to fix inaccurate or incomplete data',
        'Deletion — request that we delete your account and personal data',
        'Portability — receive your data in a machine-readable format',
        'Opt-out — unsubscribe from marketing emails at any time',
        'Withdraw consent — where processing is based on consent, you may withdraw it',
      ],
    },
    {
      id: 'security',
      title: '7. Security',
      text: 'We use industry-standard security measures including TLS encryption in transit, encrypted storage at rest, and access controls. However, no system is 100% secure. Please use a strong, unique password and enable two-factor authentication when available.',
    },
    {
      id: 'children',
      title: "8. Children's Privacy",
      text: 'Repurfy is not intended for users under 13 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us data, contact us and we will delete it promptly.',
    },
    {
      id: 'international',
      title: '9. International Transfers',
      text: 'Repurfy is operated from India. If you are accessing the service from outside India, your data may be transferred to and processed in countries with different data protection laws. We take appropriate safeguards to protect your information during such transfers.',
    },
    {
      id: 'changes',
      title: '10. Changes to This Policy',
      text: "We may update this Privacy Policy from time to time. When we do, we'll update the 'Last Updated' date and, for material changes, notify you via email or an in-app banner. Continued use of Repurfy after changes constitutes acceptance of the updated policy.",
    },
    {
      id: 'contact',
      title: '11. Contact Us',
      text: 'If you have questions, concerns, or data requests regarding this Privacy Policy, please reach out:',
      contact: {
        email: 'contact@repurfy.com',
        website: 'www.repurfy.com',
      },
    },
  ]

  return (
    // <main className="repurfy-bg text-text-secondary min-h-screen">
    <main className="bg-bg-secondary dark:bg-main-gradient text-text-secondary min-h-screen">
      {/* Nav */}
      <div className="border-bottom border">
        <Header />
      </div>

      <div className="container mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="fade-in-up mb-16">
          <div className="font-ai glass mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60">
            <FileBadge size={18} className="text-brand-teal" />
            Legal Document
          </div>

          <h1 className="mb-4 text-5xl leading-tight font-bold text-white md:text-6xl">
            Privacy <span className="text-brand-gradient">Policy</span>
          </h1>
          <p className="mt-4 text-base text-white/50">
            Last updated: <span className="font-medium text-white/70">{lastUpdated}</span>
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            At Repurfy, your privacy matters. This policy explains what data we collect, why we
            collect it, and how you remain in control of your information.
          </p>
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
        <div className="space-y-6">
          {sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              className="card-repurfy scroll-mt-24 border-white/10 bg-white/[0.04] hover:border-white/20"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <h2 className="mb-5 flex items-center gap-3 text-xl font-semibold text-white">
                <span className="bg-brand-gradient flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold text-white shadow-sm">
                  {i + 1}
                </span>
                {section.title.split('. ')[1]}
              </h2>

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

              {/* Plain text */}
              {section.text && !section.contact && (
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

        {/* Footer note */}
        {/* <div className="mt-16 text-center">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Repurfy. All rights reserved.
          </p>
          <div className="mt-3 flex justify-center gap-6">
            <a
              href="/terms"
              className="text-xs text-white/30 transition-colors hover:text-white/60"
            >
              Terms of Service
            </a>
            <a
              href="/cookies"
              className="text-xs text-white/30 transition-colors hover:text-white/60"
            >
              Cookie Policy
            </a>
          </div>
        </div> */}
      </div>
      <Footer />
    </main>
  )
}
