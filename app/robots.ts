import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/pricing',
        '/privacy',
        '/privacy-policy',
        '/terms',
        '/refund-policy',
        '/donate-us',
      ],
      disallow: [
        '/dashboard/',
        '/billing/',
        '/checkout/',
        '/create/',
        '/history/',
        '/settings/',
        '/results/',
      ],
    },
    sitemap: 'https://repurfy.com/sitemap.xml',
  }
}
