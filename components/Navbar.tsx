'use client'

import Link from 'next/link'
import { ClipboardList } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-maroon-600 shadow-sm">
      <div className="page-container">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <ClipboardList size={18} className="text-white" strokeWidth={2} />
            <span className="text-sm font-bold tracking-tight text-white">
              Draft<span className="text-maroon-200">Desk</span>
            </span>
          </Link>

          {/* Right side label */}
          <span className="text-sm font-semibold text-white/70 tracking-wide">
            2027 NFL Draft
          </span>
        </div>
      </div>
    </header>
  )
}
