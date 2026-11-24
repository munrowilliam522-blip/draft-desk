import type { PositionGroup } from '@/lib/types'

const POSITION_COLORS: Record<string, string> = {
  QB:   'text-red-800 border-gray-300',
  RB:   'text-green-800 border-gray-300',
  WR:   'text-sky-800 border-gray-300',
  TE:   'text-orange-800 border-gray-300',
  OL:   'text-yellow-800 border-gray-300',
  DL:   'text-purple-800 border-gray-300',
  EDGE: 'text-pink-800 border-gray-300',
  LB:   'text-teal-800 border-gray-300',
  CB:   'text-indigo-800 border-gray-300',
  S:    'text-cyan-800 border-gray-300',
}

interface Props {
  position: PositionGroup | string
  size?: 'sm' | 'md' | 'lg'
}

export default function PositionBadge({ position, size = 'md' }: Props) {
  const colors = POSITION_COLORS[position] ?? 'text-gray-700 border-gray-300'
  const sizeClass =
    size === 'sm'
      ? 'px-1.5 py-0.5 text-xs'
      : size === 'lg'
      ? 'px-3 py-1 text-sm'
      : 'px-2 py-0.5 text-xs'

  return (
    <span
      className={`inline-flex items-center font-bold tracking-wider border ${colors} ${sizeClass}`}
    >
      {position}
    </span>
  )
}
