import type { Prospect } from '@/lib/types'

interface Props {
  prospect: Prospect
}

interface MeasurementItem {
  label: string
  value: string | number | undefined
  unit?: string
  colorClass?: string
}

function fortyTimeColor(time: string | undefined): string {
  if (!time) return 'text-gray-800'
  const val = parseFloat(time)
  if (val <= 4.35) return 'text-green-700'
  if (val <= 4.50) return 'text-blue-700'
  if (val <= 4.75) return 'text-yellow-700'
  return 'text-red-700'
}

export default function MeasurementsGrid({ prospect }: Props) {
  const measurements: MeasurementItem[] = [
    { label: 'Height', value: prospect.height },
    { label: 'Weight', value: prospect.weight, unit: 'lbs' },
    { label: 'Arm Length', value: prospect.armLength, unit: '"' },
    { label: 'Hand Size', value: prospect.handSize, unit: '"' },
    { label: 'Wingspan', value: prospect.wingspan, unit: '"' },
    { label: '40-Yard Dash', value: prospect.fortyTime, unit: 's', colorClass: fortyTimeColor(prospect.fortyTime) },
    { label: '10-Yard Split', value: prospect.tenYardSplit, unit: 's' },
    { label: 'Vertical Jump', value: prospect.vertical, unit: '"' },
    { label: 'Broad Jump', value: prospect.broadJump, unit: '"' },
    { label: '3-Cone Drill', value: prospect.threeCone, unit: 's' },
    { label: 'Shuttle', value: prospect.shuttle, unit: 's' },
  ].filter((m) => m.value !== undefined && m.value !== '')

  if (measurements.length === 0) return null

  return (
    <div>
      <h2 className="section-label mb-4">Measurements &amp; Combine</h2>
      <div className="grid grid-cols-2 gap-px bg-gray-200 overflow-hidden border border-gray-200">
        {measurements.map((m) => (
          <div key={m.label} className="bg-white px-4 py-3 flex flex-col gap-0.5">
            <span className="text-xs text-gray-400 font-medium">{m.label}</span>
            <span className={`text-lg font-bold tabular-nums leading-tight ${m.colorClass ?? 'text-gray-800'}`}>
              {m.value}
              {m.unit && (
                <span className="text-sm font-medium text-gray-400 ml-0.5">{m.unit}</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
