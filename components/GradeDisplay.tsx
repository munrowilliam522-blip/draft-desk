interface Props {
  grade: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

function gradeColor(grade: number): string {
  if (grade >= 9.0) return 'text-maroon-600'
  if (grade >= 8.0) return 'text-green-700'
  if (grade >= 7.0) return 'text-blue-700'
  if (grade >= 6.0) return 'text-gray-600'
  return 'text-gray-400'
}

function gradeLabel(grade: number): string {
  if (grade >= 9.0) return 'Top Pick'
  if (grade >= 8.4) return 'Solid First Round'
  if (grade >= 7.8) return 'First or Second Round'
  if (grade >= 7.0) return 'Day 2 Pick'
  if (grade >= 6.0) return 'Day 3 Pick'
  return 'Undrafted'
}

export default function GradeDisplay({ grade, size = 'md', showLabel = false }: Props) {
  const sizeClass =
    size === 'sm'
      ? 'text-xl font-black'
      : size === 'lg'
      ? 'text-5xl font-black'
      : 'text-2xl font-black'

  if (grade === 0) {
    return (
      <div className="flex flex-col items-center">
        <span className={`${sizeClass} text-gray-300 tabular-nums leading-none`}>—</span>
        {showLabel && (
          <span className="mt-0.5 text-xs font-medium text-gray-400 uppercase tracking-wide">
            Not graded
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <span className={`${sizeClass} ${gradeColor(grade)} tabular-nums leading-none`}>
        {grade.toFixed(1)}
      </span>
      {showLabel && (
        <span className="mt-0.5 text-xs font-medium text-gray-500 uppercase tracking-wide">
          {gradeLabel(grade)}
        </span>
      )}
    </div>
  )
}
