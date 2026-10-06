import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Background } from '@/components/layout/Background'
import { ScrollProgressCircle } from '@/components/ui/ScrollProgressCircle'
import { Preloader } from '@/components/ui/Preloader'
import { CustomCursor } from '@/components/ui/CustomCursor'
import SmoothScroll from '@/components/motion/SmoothScroll'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.webcris.dev'),
  title: 'Cris John Labiaga | Full Stack & AI Developer',
  description: 'Full Stack & AI Developer building modern web applications, REST APIs, database-driven systems, RAG workflows, AI integrations, and automation.',
  openGraph: {
    title: 'Cris John Labiaga | Full Stack & AI Developer',
    description: 'Full Stack & AI Developer building modern web applications, REST APIs, database-driven systems, RAG workflows, AI integrations, and automation.',
    siteName: 'Cris John Labiaga',
    images: [
      {
        url: '/portfolio_logo.png',
        width: 800,
        height: 800,
        alt: 'Cris John Labiaga',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cris John Labiaga | Full Stack & AI Developer',
    description: 'Full Stack & AI Developer building modern web applications.',
    images: ['/portfolio_logo.png'],
  },
  icons: {
    icon: [
      { url: '/portfolio_logo.png' },
      { url: '/portfolio_logo.png', sizes: '32x32' },
      { url: '/portfolio_logo.png', sizes: '192x192' },
    ],
    shortcut: '/portfolio_logo.png',
    apple: [
      { url: '/portfolio_logo.png' },
      { url: '/portfolio_logo.png', sizes: '180x180' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans dark`} suppressHydrationWarning>
      <body className={`${inter.className} text-zinc-100 antialiased min-h-screen cursor-none tracking-tight`}>
        <CustomCursor />
        <Preloader />
        <SmoothScroll>
          <Background />
          <ScrollProgressCircle />
          <div className="relative z-10">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  )
}
