'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react'
import type { Prospect } from '@/lib/types'
import PositionBadge from '@/components/PositionBadge'

type SortMode = 'grade-desc' | 'grade-asc' | 'position'

interface Props {
  prospects: Prospect[]
}

export default function PlayerList({ prospects }: Props) {
  const [sortMode, setSortMode] = useState<SortMode>('grade-desc')

  const sorted = [...prospects].sort((a, b) => {
    if (sortMode === 'position') {
      const posCmp = a.position.localeCompare(b.position)
      if (posCmp !== 0) return posCmp
      return b.grade - a.grade
    }
    if (sortMode === 'grade-asc') return a.grade - b.grade
    return b.grade - a.grade  // grade-desc default
  })

  const handleGradeClick = () => {
    setSortMode((prev) => (prev === 'grade-desc' ? 'grade-asc' : 'grade-desc'))
  }

  const handlePositionClick = () => {
    setSortMode((prev) => (prev === 'position' ? 'grade-desc' : 'position'))
  }

  const GradeIcon = () => {
    if (sortMode === 'grade-desc') return <ChevronDown size={12} className="text-maroon-600" />
    if (sortMode === 'grade-asc') return <ChevronUp size={12} className="text-maroon-600" />
    return <ArrowUpDown size={12} className="opacity-40" />
  }

  const PositionIcon = () => {
    if (sortMode === 'position') return <ChevronUp size={12} className="text-maroon-600" />
    return <ArrowUpDown size={12} className="opacity-40" />
  }

  const gradeActive = sortMode === 'grade-desc' || sortMode === 'grade-asc'

  return (
    <>
      {/* Column headers */}
      <div className="hidden sm:grid grid-cols-[48px_72px_1fr_110px_90px] gap-4 px-5 pb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
        <span>#</span>
        <span></span>
        <span>Player</span>

        {/* Position — clickable sort */}
        <button
          onClick={handlePositionClick}
          className={`flex items-center gap-1 hover:text-maroon-600 transition-colors ${
            sortMode === 'position' ? 'text-maroon-600' : ''
          }`}
        >
          Position
          <PositionIcon />
        </button>

        {/* Grade — clickable sort, toggles high→low / low→high */}
        <button
          onClick={handleGradeClick}
          className={`flex items-center gap-1 justify-end w-full hover:text-maroon-600 transition-colors ${
            gradeActive ? 'text-maroon-600' : ''
          }`}
        >
          Grade
          <GradeIcon />
        </button>
      </div>

      {/* Player list */}
      <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden shadow-md">
        {sorted.length === 0 && (
          <div className="py-20 text-center text-gray-400 text-base">
            No prospects added yet.
          </div>
        )}
        {sorted.map((prospect) => (
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
              <span className="text-2xl font-black tabular-nums text-maroon-600">
                {prospect.grade > 0 ? prospect.grade.toFixed(1) : '—'}
              </span>
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide mt-0.5 hidden sm:block">
                grade
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
