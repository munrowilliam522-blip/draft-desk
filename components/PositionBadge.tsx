import type { PositionGroup } from '@/lib/types'

const POSITION_COLORS: Record<string, string> = {
  QB: 'bg-red-900/50 text-red-300 border-red-800/60',
  RB: 'bg-green-900/50 text-green-300 border-green-800/60',
  WR: 'bg-sky-900/50 text-sky-300 border-sky-800/60',
  TE: 'bg-orange-900/50 text-orange-300 border-orange-800/60',
  OL: 'bg-yellow-900/50 text-yellow-300 border-yellow-800/60',
  DL: 'bg-purple-900/50 text-purple-300 border-purple-800/60',
  EDGE: 'bg-pink-900/50 text-pink-300 border-pink-800/60',
  LB: 'bg-teal-900/50 text-teal-300 border-teal-800/60',
  CB: 'bg-indigo-900/50 text-indigo-300 border-indigo-800/60',
  S: 'bg-cyan-900/50 text-cyan-300 border-cyan-800/60',
}

interface Props {
  position: PositionGroup | string
  size?: 'sm' | 'md' | 'lg'
}

export default function PositionBadge({ position, size = 'md' }: Props) {
  const colors = POSITION_COLORS[position] ?? 'bg-slate-800 text-slate-300 border-slate-700'
  const sizeClass =
    size === 'sm'
      ? 'px-1.5 py-0.5 text-xs'
      : size === 'lg'
      ? 'px-3 py-1 text-sm'
      : 'px-2 py-0.5 text-xs'

  return (
    <span
      className={`inline-flex items-center font-bold tracking-wider rounded border ${colors} ${sizeClass}`}
    >
      {position}
    </span>
  )
}
