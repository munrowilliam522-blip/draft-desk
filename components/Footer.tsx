import Link from 'next/link'
import { ClipboardList } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-navy-500 bg-navy-900">
      <div className="page-container py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ClipboardList size={16} className="text-accent-blue" strokeWidth={2} />
              <span className="text-sm font-bold text-white">
                Draft<span className="text-accent-blue">Desk</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Independent NFL Draft coverage. In-depth scouting reports, prospect grades, and
              analysis written by scouts, for fans.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
              Draft Classes
            </p>
            <ul className="space-y-1.5">
              {[2026, 2025, 2024].map((year) => (
                <li key={year}>
                  <Link
                    href={`/prospects/${year}`}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {year} NFL Draft
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
              Site
            </p>
            <ul className="space-y-1.5">
              <li>
                <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/prospects"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  All Prospects
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Analysis
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-navy-500 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} DraftDesk. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Scouting reports &amp; grades are editorial opinions only.
          </p>
        </div>
      </div>
    </footer>
  )
}
