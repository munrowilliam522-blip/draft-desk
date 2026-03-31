import Link from 'next/link'
import { User } from 'lucide-react'
import type { Prospect } from '@/lib/types'
import PositionBadge from './PositionBadge'
import GradeDisplay from './GradeDisplay'

interface Props {
  prospect: Prospect
  featured?: boolean
}

export default function ProspectCard({ prospect, featured = false }: Props) {
  const href = `/prospects/${prospect.draftYear}/${prospect.slug}`

  if (featured) {
    return (
      <Link href={href} className="group block card card-hover">
        {/* Image placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-navy-700 to-navy-600 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy-800/80" />
          <div className="flex flex-col items-center text-navy-500">
            <User size={56} strokeWidth={1} />
          </div>
          {/* Rank badge */}
          <div className="absolute top-3 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-navy-900/80 border border-navy-400">
            <span className="text-xs font-bold text-slate-300">#{prospect.rank}</span>
          </div>
          {/* Grade */}
          <div className="absolute top-3 right-3 bg-navy-900/80 rounded px-2 py-0.5 border border-navy-400">
            <GradeDisplay grade={prospect.grade} size="sm" />
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-slate-100 group-hover:text-accent-blue transition-colors leading-tight">
              {prospect.name}
            </h3>
            <PositionBadge position={prospect.position} size="sm" />
          </div>
          <p className="text-sm text-slate-400 mb-3">{prospect.school}</p>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>{prospect.height} / {prospect.weight} lbs</span>
            {prospect.fortyTime && <span>{prospect.fortyTime}s</span>}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className="group flex items-center gap-4 card card-hover p-4">
      {/* Rank */}
      <div className="w-8 shrink-0 text-center">
        <span className="text-sm font-bold text-slate-500">#{prospect.rank}</span>
      </div>

      {/* Avatar placeholder */}
      <div className="h-10 w-10 shrink-0 rounded-full bg-navy-600 flex items-center justify-center border border-navy-400">
        <User size={18} className="text-navy-400" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-semibold text-slate-100 group-hover:text-accent-blue transition-colors truncate">
            {prospect.name}
          </span>
          <PositionBadge position={prospect.position} size="sm" />
        </div>
        <p className="text-xs text-slate-500 truncate">{prospect.school}</p>
      </div>

      {/* Grade */}
      <div className="shrink-0">
        <GradeDisplay grade={prospect.grade} size="sm" />
      </div>
    </Link>
  )
}
