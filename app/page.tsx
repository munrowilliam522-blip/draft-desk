import Link from 'next/link'
import Image from 'next/image'
import { User } from 'lucide-react'
import { getProspectsByYear } from '@/lib/prospects'
import PositionBadge from '@/components/PositionBadge'

export default function HomePage() {
  const prospects = getProspectsByYear(2027)

  return (
    <div className="page-container py-10">
      {/* Page header */}
      <div className="mb-8 border-b border-gray-200 pb-6">
        <p className="section-label mb-1">2027 NFL Draft</p>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Big Board</h1>
        <p className="mt-2 text-sm text-gray-500">
          {prospects.length} prospect{prospects.length !== 1 ? 's' : ''} ranked
        </p>
      </div>

      {/* Column headers */}
      <div className="hidden sm:grid grid-cols-[40px_64px_1fr_100px_80px] gap-4 px-4 pb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
        <span>#</span>
        <span></span>
        <span>Player</span>
        <span>Position</span>
        <span className="text-right">Grade</span>
      </div>

      {/* Player list */}
      <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {prospects.length === 0 && (
          <div className="py-16 text-center text-gray-400 text-sm">
            No prospects added yet.
          </div>
        )}
        {prospects.map((prospect) => (
          <div
            key={prospect.slug}
            className="grid grid-cols-[40px_64px_1fr_auto] sm:grid-cols-[40px_64px_1fr_100px_80px] gap-4 items-center px-4 py-4 bg-white hover:bg-gray-50 transition-colors"
          >
            {/* Rank */}
            <span className="text-sm font-bold text-gray-300 tabular-nums">
              {prospect.rank}
            </span>

            {/* Photo */}
            <div className="relative w-12 h-16 shrink-0 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
              {prospect.imageUrl ? (
                <Image
                  src={prospect.imageUrl}
                  alt={prospect.name}
                  fill
                  className="object-cover object-top"
                  sizes="48px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User size={22} className="text-gray-300" />
                </div>
              )}
            </div>

            {/* Name + School */}
            <div className="min-w-0">
              <Link
                href={`/prospects/2027/${prospect.slug}`}
                className="text-base font-bold text-maroon-600 hover:text-maroon-700 hover:underline leading-tight block truncate"
              >
                {prospect.name}
              </Link>
              <p className="text-sm text-gray-500 mt-0.5 truncate">{prospect.school}</p>
            </div>

            {/* Position */}
            <div className="hidden sm:flex justify-start">
              <PositionBadge position={prospect.position} size="sm" />
            </div>

            {/* Grade */}
            <div className="text-right">
              <span className="text-lg font-black text-maroon-600 tabular-nums">
                {prospect.grade.toFixed(1)}
              </span>
              <p className="text-xs text-gray-400 hidden sm:block">grade</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
