'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import NavLink from './nav-link'
import { HeartIcon } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const socialIcons = [
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@Repurfy',
    icon: (
      <svg role="img" fill="currentColor" className="h-4 w-4" viewBox="0 0 24 24">
        <title>YouTube</title>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/repurfy',
    icon: (
      <svg fill="currentColor" className="h-4 w-4" role="img" viewBox="0 0 24 24">
        <title>LinkedIn</title>
        <path d="M20.447 20.452H17.2V14.86c0-1.332-.027-3.047-1.858-3.047-1.859 0-2.142 1.45-2.142 2.946v5.693h-3.25V9h3.125v1.56h.045c.435-.824 1.495-1.69 3.075-1.69 3.287 0 3.895 2.165 3.895 4.978v6.604zM5.337 7.433a1.88 1.88 0 1 1 0-3.761 1.88 1.88 0 0 1 0 3.76zM6.813 20.452H3.86V9h2.954v11.452zM22.225 0H1.771C.792 0 0 .772 0 1.723v20.555C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.278V1.723C24 .772 23.2 0 22.225 0z" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/repurfy',
    icon: (
      <svg fill="currentColor" className="h-4 w-4" role="img" viewBox="0 0 24 24">
        <title>X</title>
        <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/repurfy',
    icon: (
      <svg fill="currentColor" className="h-4 w-4" role="img" viewBox="0 0 24 24">
        <title>Instagram</title>
        <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A4 4 0 0 1 8 12.0077" />
      </svg>
    ),
  },
]

const companyLinks = [
  { label: 'Early Access', href: 'https://forms.gle/53BNApyitQJJdnCQ9' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Demo', href: '#how-it-works' },
]

const helpLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Support', href: 'mailto:support@repurfy.com' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Donate Us', href: '/donate-us' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-2 md:grid-cols-4"
        >
          {/* Logo + About */}
          <motion.div variants={fadeUp} className="sm:col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <Image src="/logo.svg" alt="Repurfy Logo" width={32} height={32} />
              <span className="font-ai text-xl font-semibold tracking-tighter">Repurfy</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              AI-powered content repurposing to transform blogs, podcasts, and posts into
              high-performing content for every platform.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-6">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="hover:border-brand-teal/40 hover:bg-brand-teal/10 hover:text-brand-teal flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Company */}
          <motion.div variants={fadeUp}>
            <h3 className="mb-5 font-semibold tracking-wide text-white/90 uppercase">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-brand-teal text-gray-400 transition-all duration-150 hover:font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Help */}
          <motion.div variants={fadeUp}>
            <h3 className="mb-5 font-semibold tracking-wide text-white/90 uppercase">Legal</h3>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-brand-teal text-gray-400 transition-all duration-150 hover:font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Donate Us */}
          <motion.div variants={fadeUp}>
            <h3 className="mb-5 text-sm font-semibold tracking-wide text-white/90 uppercase">
              Support Us
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Repurfy is built solo, with love. If it saves you time, consider buying me a chai ☕
            </p>
            <Link href="/donate-us">
              <Button className="bg-brand-gradient group flex w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white shadow-teal-500/25 hover:scale-[1.02] hover:shadow-xl transition-all duration-200">
                <HeartIcon className="h-4 w-4 fill transition-transform duration-200 group-hover:scale-125" />
                Support Us
              </Button>
            </Link>
            <p className="mt-3 text-xs text-gray-600">UPI · PayPal · Any amount welcome.</p>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-6 text-sm text-gray-500 sm:flex-row">
          <span className="text-center">
            &copy; {new Date().getFullYear()}{' '}
            <NavLink href="/" className="text-brand-teal font-medium">
              Repurfy
            </NavLink>{' '}
            — Made with ❤️ for creators.
          </span>
          <span className="text-xs text-gray-600">All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
