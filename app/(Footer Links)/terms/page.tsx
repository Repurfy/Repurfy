import Footer from '@/components/common/FooterSection'
import Header from '@/components/common/Header'
import { ScrollText } from 'lucide-react'

export default function TermsOfService() {
  const lastUpdated = 'May 1, 2026'

  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      text: 'By accessing or using Repurfy ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Service. These Terms apply to all visitors, users, and others who access or use Repurfy.',
    },
    {
      id: 'description',
      title: '2. Description of Service',
      text: 'Repurfy is a content repurposing platform that enables creators to transform existing content — including blog posts, YouTube videos, and other media — into multiple formats for distribution across different channels. We reserve the right to modify, suspend, or discontinue the Service at any time with reasonable notice.',
    },
    {
      id: 'accounts',
      title: '3. Accounts & Registration',
      content: [
        {
          subtitle: 'Eligibility',
          text: 'You must be at least 13 years of age to use Repurfy. By creating an account, you represent that you meet this requirement and that all information you provide is accurate and complete.',
        },
        {
          subtitle: 'Account Security',
          text: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately at contact@repurfy.com if you suspect any unauthorized use.',
        },
        {
          subtitle: 'One Account Per User',
          text: 'Each user may maintain only one active account. Creating duplicate or fraudulent accounts may result in immediate termination of all associated accounts.',
        },
      ],
    },
    {
      id: 'acceptable-use',
      title: '4. Acceptable Use',
      text: 'You agree not to use Repurfy to:',
      items: [
        'Violate any applicable local, national, or international laws or regulations',
        'Upload, process, or distribute content that infringes on any third-party intellectual property rights',
        'Submit content that is defamatory, obscene, hateful, or otherwise objectionable',
        'Attempt to reverse-engineer, decompile, or extract the source code of the platform',
        'Use automated scripts or bots to scrape, crawl, or abuse the Service',
        'Resell, sublicense, or commercially exploit the Service without express written permission',
        'Impersonate any person or entity or misrepresent your affiliation with any person or entity',
      ],
    },
    {
      id: 'intellectual-property',
      title: '5. Intellectual Property',
      content: [
        {
          subtitle: 'Your Content',
          text: 'You retain full ownership of all content you submit to Repurfy. By uploading content, you grant us a limited, non-exclusive, royalty-free license to process and transform your content solely for the purpose of providing the Service to you.',
        },
        {
          subtitle: 'Our Platform',
          text: 'Repurfy and its original content, features, and functionality are owned by Rahul Kumar and are protected by international copyright, trademark, and other intellectual property laws. You may not copy, reproduce, or distribute any part of the platform without explicit written permission.',
        },
        {
          subtitle: 'Feedback',
          text: 'Any feedback, suggestions, or ideas you provide about Repurfy may be used by us without any obligation to compensate you. You waive any rights you may have in such feedback.',
        },
      ],
    },
    {
      id: 'payments',
      title: '6. Payments & Subscriptions',
      content: [
        {
          subtitle: 'Billing',
          text: 'Paid plans are billed in advance on a monthly or annual basis. All prices are listed in the applicable currency for your region (INR for India, USD for international users). Prices are inclusive of applicable taxes unless stated otherwise.',
        },
        {
          subtitle: 'Refund Policy',
          text: 'We offer a 7-day refund window for new paid subscriptions if you are not satisfied with the Service. Refund requests must be submitted to contact@repurfy.com. After 7 days, all payments are non-refundable.',
        },
        {
          subtitle: 'Cancellation',
          text: 'You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of the current billing period. You will retain access to paid features until then.',
        },
      ],
    },
    {
      id: 'termination',
      title: '7. Termination',
      text: 'We reserve the right to suspend or terminate your account and access to the Service at our sole discretion, without notice, for conduct that we determine violates these Terms, is harmful to other users, the public, us, or for any other reason. Upon termination, your right to use the Service will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive.',
    },
    {
      id: 'disclaimers',
      title: '8. Disclaimers',
      text: 'The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Service will be uninterrupted, error-free, or completely secure. Use of the Service is at your own risk.',
    },
    {
      id: 'limitation',
      title: '9. Limitation of Liability',
      text: 'To the maximum extent permitted by applicable law, Repurfy and its founder shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of profits, data, goodwill, or other intangible losses — resulting from your use of or inability to use the Service, even if we have been advised of the possibility of such damages. Our total liability for any claim shall not exceed the amount you paid us in the 3 months prior to the event giving rise to the claim.',
    },
    {
      id: 'third-party',
      title: '10. Third-Party Services',
      text: 'Repurfy integrates with third-party services including but not limited to Clerk (authentication), Stripe and Razorpay (payments), and cloud infrastructure providers. These services have their own Terms and Privacy Policies. We are not responsible for the practices of any third-party services linked to or integrated with Repurfy.',
    },
    {
      id: 'governing-law',
      title: '11. Governing Law',
      text: 'These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Uttar Pradesh, India. If you are an international user, you agree to submit to such jurisdiction.',
    },
    {
      id: 'changes',
      title: '12. Changes to Terms',
      text: "We reserve the right to update or modify these Terms at any time. When we make material changes, we will update the 'Last Updated' date at the top of this page and notify you via email or an in-app notification. Your continued use of the Service after changes become effective constitutes your acceptance of the revised Terms.",
    },
    {
      id: 'contact',
      title: '13. Contact Us',
      text: 'If you have any questions about these Terms of Service, please contact us:',
      contact: {
        email: 'contact@repurfy.com',
        website: 'www.repurfy.com',
      },
    },
  ]

  return (
    <main className="bg-bg-secondary dark:bg-main-gradient text-text-secondary min-h-screen">
      {/* Nav */}
      <div className="border-bottom border">
        <Header />
      </div>

      <div className="container mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="fade-in-up mb-16">
          <div className="font-ai glass mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60">
            <ScrollText size={18} className="text-brand-teal" />
            Legal Document
          </div>

          <h1 className="mb-4 text-5xl leading-tight font-bold text-white md:text-6xl font-ai">
            Terms of <span className="text-brand-gradient">Service</span>
          </h1>
          <p className="mt-4 text-base text-white/50">
            Last updated: <span className="font-medium text-white/70">{lastUpdated}</span>
          </p>
          <p className="mt-6 max-w-2xl leading-relaxed text-white/60">
            Please read these Terms of Service carefully before using Repurfy. They govern your
            access to and use of our platform, and by using Repurfy, you agree to be bound by them.
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

              {/* Intro text before items (for sections that have both) */}
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

              {/* Plain text only (no items) */}
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

        {/* Cross-link to Privacy Policy */}
        <div className="glass-card mt-12 flex items-center justify-between border border-white/10 p-6">
          <div>
            <p className="text-sm font-medium text-white/80">Also read our Privacy Policy</p>
            <p className="mt-0.5 text-xs text-white/40">
              Understand how we collect and handle your data
            </p>
          </div>
          <a
            href="/privacy"
            className="glass rounded-lg border border-white/10 px-4 py-2 text-xs text-white/60 transition-all duration-200 hover:border-white/30 hover:text-white"
          >
            View Policy →
          </a>
        </div>
      </div>

      <Footer />
    </main>
  )
}