import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Background } from '@/components/layout/Background'
import { ScrollProgressCircle } from '@/components/ui/ScrollProgressCircle'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Cris John Labiaga | Full Stack & AI Developer',
  description: 'Full Stack & AI Developer building modern web applications, REST APIs, database-driven systems, RAG workflows, AI integrations, and automation.',
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
    <html lang="en" className={`${inter.variable} font-sans scroll-smooth dark`} suppressHydrationWarning>
      <body className="text-zinc-100 antialiased min-h-screen">
        <Background />
        <ScrollProgressCircle />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
