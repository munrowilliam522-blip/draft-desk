interface Props {
  grade: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

function gradeColor(grade: number): string {
  if (grade >= 9.0) return 'text-accent-gold'
  if (grade >= 8.0) return 'text-green-400'
  if (grade >= 7.0) return 'text-blue-400'
  if (grade >= 6.0) return 'text-slate-300'
  return 'text-slate-500'
}

function gradeLabel(grade: number): string {
  if (grade >= 9.0) return 'Elite'
  if (grade >= 8.0) return 'Top-10'
  if (grade >= 7.0) return 'First Round'
  if (grade >= 6.0) return 'Day 2'
  if (grade >= 5.0) return 'Day 3'
  return 'Priority FA'
}

export default function GradeDisplay({ grade, size = 'md', showLabel = false }: Props) {
  const sizeClass =
    size === 'sm'
      ? 'text-xl font-black'
      : size === 'lg'
      ? 'text-5xl font-black'
      : 'text-2xl font-black'

  return (
    <div className="flex flex-col items-center">
      <span className={`${sizeClass} ${gradeColor(grade)} tabular-nums leading-none`}>
        {grade.toFixed(1)}
      </span>
      {showLabel && (
        <span className="mt-0.5 text-xs font-medium text-slate-500 uppercase tracking-wide">
          {gradeLabel(grade)}
        </span>
      )}
    </div>
  )
}
