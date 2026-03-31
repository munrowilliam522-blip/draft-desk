'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, ChevronDown, ClipboardList } from 'lucide-react'

const DRAFT_YEARS = [2026, 2025, 2024]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [prospectsOpen, setProspectsOpen] = useState(false)

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <header className="sticky top-0 z-50 border-b border-navy-500 bg-navy-900/95 backdrop-blur-sm">
      <div className="page-container">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <ClipboardList size={18} className="text-accent-blue" strokeWidth={2} />
            <span className="text-sm font-bold tracking-tight text-white">
              Draft<span className="text-accent-blue">Desk</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`nav-link px-3 py-1.5 rounded-md ${isActive('/') && pathname === '/' ? 'nav-link-active bg-navy-700' : ''}`}
            >
              Home
            </Link>

            {/* Prospects dropdown */}
            <div className="relative">
              <button
                onClick={() => setProspectsOpen(!prospectsOpen)}
                onBlur={() => setTimeout(() => setProspectsOpen(false), 150)}
                className={`nav-link flex items-center gap-1 px-3 py-1.5 rounded-md ${
                  isActive('/prospects') ? 'nav-link-active bg-navy-700' : ''
                }`}
              >
                Prospects
                <ChevronDown
                  size={14}
                  className={`transition-transform ${prospectsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {prospectsOpen && (
                <div className="absolute top-full left-0 mt-1 w-44 rounded-lg border border-navy-500 bg-navy-800 py-1 shadow-xl">
                  <Link
                    href="/prospects"
                    className="flex items-center px-3 py-2 text-sm text-slate-300 hover:bg-navy-700 hover:text-white"
                    onClick={() => setProspectsOpen(false)}
                  >
                    All Prospects
                  </Link>
                  <div className="my-1 border-t border-navy-500" />
                  {DRAFT_YEARS.map((year) => (
                    <Link
                      key={year}
                      href={`/prospects/${year}`}
                      className="flex items-center justify-between px-3 py-2 text-sm text-slate-300 hover:bg-navy-700 hover:text-white"
                      onClick={() => setProspectsOpen(false)}
                    >
                      <span>{year} Draft</span>
                      {year === 2026 && (
                        <span className="badge bg-accent-blue-subtle text-accent-blue">
                          Live
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className={`nav-link px-3 py-1.5 rounded-md ${isActive('/blog') ? 'nav-link-active bg-navy-700' : ''}`}
            >
              Analysis
            </Link>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-navy-500 bg-navy-900 px-4 py-3 space-y-1">
          <Link
            href="/"
            className="block py-2 text-sm text-slate-300 hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/prospects"
            className="block py-2 text-sm text-slate-300 hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            All Prospects
          </Link>
          {DRAFT_YEARS.map((year) => (
            <Link
              key={year}
              href={`/prospects/${year}`}
              className="block py-2 pl-4 text-sm text-slate-400 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {year} Draft Class
            </Link>
          ))}
          <Link
            href="/blog"
            className="block py-2 text-sm text-slate-300 hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            Analysis
          </Link>
        </div>
      )}
    </header>
  )
}
