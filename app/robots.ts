import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://thehumanloops.com' // Replace with actual domain if different

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/', // Example of disallowed route
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
