/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/seo', destination: '/services/seo', permanent: true },
      { source: '/google-ads', destination: '/services/google-ads', permanent: true },
      { source: '/performance-marketing', destination: '/services/performance-marketing', permanent: true },
      { source: '/email-marketing', destination: '/services/email-marketing', permanent: true },
      { source: '/sms-marketing', destination: '/services/sms-marketing', permanent: true },
      { source: '/display-native-ads', destination: '/services/display-native-ads', permanent: true },
      { source: '/web-design-development', destination: '/services/web-design-development', permanent: true },
      { source: '/social-media-marketing', destination: '/services/social-media-marketing', permanent: true },
    ]
  },
}
export default nextConfig
