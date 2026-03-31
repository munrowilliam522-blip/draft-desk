'use client'

import { useState, useMemo } from 'react'
import type { Prospect, PositionGroup } from '@/lib/types'
import ProspectCard from './ProspectCard'
import PositionBadge from './PositionBadge'

const POSITIONS: Array<PositionGroup | 'ALL'> = [
  'ALL', 'QB', 'RB', 'WR', 'TE', 'OL', 'EDGE', 'DL', 'LB', 'CB', 'S',
]

interface Props {
  prospects: Prospect[]
  showYearFilter?: boolean
  defaultYear?: number | 'ALL'
}

export default function ProspectsGrid({
  prospects,
  showYearFilter = false,
  defaultYear = 'ALL',
}: Props) {
  const [posFilter, setPosFilter] = useState<PositionGroup | 'ALL'>('ALL')
  const [yearFilter, setYearFilter] = useState<number | 'ALL'>(defaultYear)

  const availableYears = useMemo(
    () =>
      ['ALL', ...Array.from(new Set(prospects.map((p) => p.draftYear))).sort((a, b) => b - a)] as
        Array<number | 'ALL'>,
    [prospects]
  )

  const filtered = useMemo(
    () =>
      prospects
        .filter((p) => posFilter === 'ALL' || p.position === posFilter)
        .filter((p) => yearFilter === 'ALL' || p.draftYear === yearFilter),
    [prospects, posFilter, yearFilter]
  )

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 space-y-3">
        {showYearFilter && availableYears.length > 2 && (
          <div className="flex flex-wrap gap-2">
            <span className="self-center text-xs text-slate-500 font-medium mr-1">Year:</span>
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => setYearFilter(year)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  yearFilter === year
                    ? 'bg-accent-blue text-white'
                    : 'bg-navy-700 text-slate-400 hover:text-white hover:bg-navy-600'
                }`}
              >
                {year === 'ALL' ? 'All Years' : year}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <span className="self-center text-xs text-slate-500 font-medium mr-1">Position:</span>
          {POSITIONS.map((pos) => {
            const count = prospects.filter(
              (p) =>
                (pos === 'ALL' || p.position === pos) &&
                (yearFilter === 'ALL' || p.draftYear === yearFilter)
            ).length
            if (count === 0 && pos !== 'ALL') return null
            return (
              <button
                key={pos}
                onClick={() => setPosFilter(pos)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  posFilter === pos
                    ? 'bg-accent-blue text-white'
                    : 'bg-navy-700 text-slate-400 hover:text-white hover:bg-navy-600'
                }`}
              >
                {pos === 'ALL' ? `All (${prospects.filter(p => yearFilter === 'ALL' || p.draftYear === yearFilter).length})` : `${pos} (${count})`}
              </button>
            )
          })}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-slate-500">
          No prospects found for the selected filters.
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((prospect) => (
            <ProspectCard key={`${prospect.draftYear}-${prospect.slug}`} prospect={prospect} />
          ))}
        </div>
      )}
    </div>
  )
}
