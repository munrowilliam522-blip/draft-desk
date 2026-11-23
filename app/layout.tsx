import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'DraftDesk — 2027 NFL Draft Scouting',
    template: '%s | DraftDesk',
  },
  description: 'In-depth 2027 NFL Draft scouting reports, prospect grades, and draft analysis.',
  keywords: ['NFL Draft', 'scouting report', '2027 NFL Draft', 'draft grades', 'prospects'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'DraftDesk',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="flex min-h-screen flex-col bg-gray-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
