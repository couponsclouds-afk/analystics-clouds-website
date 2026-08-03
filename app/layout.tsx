import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Analytics Clouds | Performance Marketing & SEO Agency in Noida',
    template: '%s | Analytics Clouds',
  },
  description: 'Analytics Clouds is a full-service digital growth agency helping businesses scale through SEO, performance marketing, and data-driven web experiences.',
  icons: {
    icon: 'https://res.cloudinary.com/couponsbit/image/upload/v1785759820/favicon_if9ge3.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-white text-gray-800 font-sans antialiased selection:bg-[#FE7146] selection:text-white flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
