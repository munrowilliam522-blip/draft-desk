import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'DraftDesk — NFL Draft Scouting Reports',
    template: '%s | DraftDesk',
  },
  description:
    'In-depth NFL Draft scouting reports, prospect grades, combine data, and draft analysis.',
  keywords: ['NFL Draft', 'scouting report', 'NFL prospects', 'draft grades', 'combine'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'DraftDesk',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
