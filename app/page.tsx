import Link from 'next/link'
import Image from 'next/image'
import { User } from 'lucide-react'
import { getProspectsByYear } from '@/lib/prospects'
import PositionBadge from '@/components/PositionBadge'

export default function HomePage() {
  const prospects = getProspectsByYear(2027)

  return (
    <div className="page-container py-12">
      {/* Page header */}
      <div className="mb-10 border-b border-gray-200 pb-8">
        <p className="section-label mb-2">2027 NFL Draft</p>
        <h1 className="text-5xl sm:text-6xl font-black text-gray-900 tracking-tight leading-none">
          Big Board
        </h1>
        <p className="mt-3 text-base text-gray-400">
          {prospects.length} prospect{prospects.length !== 1 ? 's' : ''} ranked
        </p>
      </div>

      {/* Column headers */}
      <div className="hidden sm:grid grid-cols-[48px_72px_1fr_110px_90px] gap-4 px-5 pb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
        <span>#</span>
        <span></span>
        <span>Player</span>
        <span>Position</span>
        <span className="text-right">Grade</span>
      </div>

      {/* Player list */}
      <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden shadow-md">
        {prospects.length === 0 && (
          <div className="py-20 text-center text-gray-400 text-base">
            No prospects added yet.
          </div>
        )}
        {prospects.map((prospect) => (
          <div
            key={prospect.slug}
            className="grid grid-cols-[48px_72px_1fr_auto] sm:grid-cols-[48px_72px_1fr_110px_90px] gap-4 items-center px-5 py-5 bg-white hover:bg-maroon-50 transition-colors group"
          >
            {/* Rank */}
            <span className="text-xl font-black text-gray-200 tabular-nums group-hover:text-maroon-300 transition-colors">
              {prospect.rank}
            </span>

            {/* Photo */}
            <div className="relative w-14 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
              {prospect.imageUrl ? (
                <Image
                  src={prospect.imageUrl}
                  alt={prospect.name}
                  fill
                  className="object-cover object-top"
                  sizes="56px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User size={26} className="text-gray-300" />
                </div>
              )}
            </div>

            {/* Name + School */}
            <div className="min-w-0">
              <Link
                href={`/prospects/2027/${prospect.slug}`}
                className="text-xl font-black text-gray-900 hover:text-maroon-600 transition-colors leading-tight block truncate"
              >
                {prospect.name}
              </Link>
              <p className="text-sm font-medium text-gray-400 mt-1 truncate">{prospect.school}</p>
            </div>

            {/* Position */}
            <div className="hidden sm:flex justify-start">
              <PositionBadge position={prospect.position} size="md" />
            </div>

            {/* Grade */}
            <div className="text-right">
              <span className="text-2xl font-black text-maroon-600 tabular-nums">
                {prospect.grade.toFixed(1)}
              </span>
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide mt-0.5 hidden sm:block">grade</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
