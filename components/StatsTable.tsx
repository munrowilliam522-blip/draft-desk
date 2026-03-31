import type { Prospect, ProspectStat } from '@/lib/types'

interface Column {
  key: keyof ProspectStat
  label: string
  format?: (val: number | string) => string
  highlight?: boolean
}

const QB_COLUMNS: Column[] = [
  { key: 'season', label: 'Season' },
  { key: 'team', label: 'Team' },
  { key: 'gamesPlayed', label: 'G' },
  { key: 'completions', label: 'CMP' },
  { key: 'attempts', label: 'ATT' },
  { key: 'completionPct', label: 'PCT%', format: (v) => `${v}%` },
  { key: 'passingYards', label: 'YDS', highlight: true },
  { key: 'passingTDs', label: 'TD', highlight: true },
  { key: 'interceptions', label: 'INT' },
  { key: 'qbRating', label: 'RTG', highlight: true },
  { key: 'rushAttempts', label: 'RUSH ATT' },
  { key: 'rushYards', label: 'RUSH YDS' },
  { key: 'rushTDs', label: 'RUSH TD' },
]

const RB_COLUMNS: Column[] = [
  { key: 'season', label: 'Season' },
  { key: 'team', label: 'Team' },
  { key: 'gamesPlayed', label: 'G' },
  { key: 'rushAttempts', label: 'ATT' },
  { key: 'rushYards', label: 'YDS', highlight: true },
  { key: 'yardsPerCarry', label: 'YPC', highlight: true },
  { key: 'rushTDs', label: 'TD' },
  { key: 'receptions', label: 'REC' },
  { key: 'receivingYards', label: 'REC YDS' },
  { key: 'receivingTDs', label: 'REC TD' },
  { key: 'fumbles', label: 'FUM' },
]

const WR_TE_COLUMNS: Column[] = [
  { key: 'season', label: 'Season' },
  { key: 'team', label: 'Team' },
  { key: 'gamesPlayed', label: 'G' },
  { key: 'targets', label: 'TGT' },
  { key: 'receptions', label: 'REC', highlight: true },
  { key: 'receivingYards', label: 'YDS', highlight: true },
  { key: 'yardsPerReception', label: 'YPR' },
  { key: 'receivingTDs', label: 'TD', highlight: true },
  { key: 'yardsAfterCatch', label: 'YAC' },
]

const EDGE_DL_COLUMNS: Column[] = [
  { key: 'season', label: 'Season' },
  { key: 'team', label: 'Team' },
  { key: 'gamesPlayed', label: 'G' },
  { key: 'tackles', label: 'TKL' },
  { key: 'soloTackles', label: 'SOLO' },
  { key: 'tacklesForLoss', label: 'TFL', highlight: true },
  { key: 'sacks', label: 'SACKS', highlight: true },
  { key: 'qbPressures', label: 'PRESS', highlight: true },
  { key: 'forcedFumbles', label: 'FF' },
  { key: 'passDeflections', label: 'PD' },
]

const LB_COLUMNS: Column[] = [
  { key: 'season', label: 'Season' },
  { key: 'team', label: 'Team' },
  { key: 'gamesPlayed', label: 'G' },
  { key: 'tackles', label: 'TKL', highlight: true },
  { key: 'soloTackles', label: 'SOLO' },
  { key: 'tacklesForLoss', label: 'TFL' },
  { key: 'sacks', label: 'SACKS' },
  { key: 'interceptionsCB', label: 'INT' },
  { key: 'passDeflections', label: 'PD' },
]

const DB_COLUMNS: Column[] = [
  { key: 'season', label: 'Season' },
  { key: 'team', label: 'Team' },
  { key: 'gamesPlayed', label: 'G' },
  { key: 'tackles', label: 'TKL' },
  { key: 'interceptionsCB', label: 'INT', highlight: true },
  { key: 'passDeflections', label: 'PD', highlight: true },
  { key: 'targets_allowed', label: 'TGT ALW' },
  { key: 'forcedFumbles', label: 'FF' },
]

const OL_COLUMNS: Column[] = [
  { key: 'season', label: 'Season' },
  { key: 'team', label: 'Team' },
  { key: 'gamesPlayed', label: 'G' },
  { key: 'snapsPlayed', label: 'SNAPS', highlight: true },
  { key: 'allowedSacks', label: 'SACKS ALW' },
  { key: 'allowedPressures', label: 'PRESS ALW' },
  { key: 'pressureRate', label: 'PRESS%', format: (v) => `${v}%` },
  { key: 'penaltiesCommitted', label: 'PEN' },
]

function getColumns(position: string): Column[] {
  switch (position) {
    case 'QB': return QB_COLUMNS
    case 'RB': return RB_COLUMNS
    case 'WR':
    case 'TE': return WR_TE_COLUMNS
    case 'EDGE':
    case 'DL': return EDGE_DL_COLUMNS
    case 'LB': return LB_COLUMNS
    case 'CB':
    case 'S': return DB_COLUMNS
    case 'OL': return OL_COLUMNS
    default: return QB_COLUMNS
  }
}

interface Props {
  prospect: Prospect
}

export default function StatsTable({ prospect }: Props) {
  const { stats, position } = prospect
  if (!stats || stats.length === 0) return null

  const allColumns = getColumns(position)
  // Only show columns that have at least one non-null/undefined value
  const activeColumns = allColumns.filter((col) =>
    stats.some((s) => s[col.key] !== undefined && s[col.key] !== null)
  )

  return (
    <div>
      <h2 className="section-label mb-4">Career Statistics</h2>
      <div className="overflow-x-auto rounded-lg border border-navy-500">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-500 bg-navy-700">
              {activeColumns.map((col) => (
                <th
                  key={col.key}
                  className={`stat-cell text-left font-semibold uppercase tracking-wider text-xs whitespace-nowrap ${
                    col.highlight ? 'text-accent-blue' : 'text-slate-400'
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stats.map((row, i) => (
              <tr
                key={i}
                className="border-b border-navy-600 last:border-0 hover:bg-navy-700/50 transition-colors"
              >
                {activeColumns.map((col) => {
                  const rawVal = row[col.key]
                  const display =
                    rawVal === undefined || rawVal === null
                      ? '—'
                      : col.format
                      ? col.format(rawVal as number)
                      : String(rawVal)

                  return (
                    <td
                      key={col.key}
                      className={`stat-cell whitespace-nowrap ${
                        col.highlight && rawVal !== undefined
                          ? 'text-slate-100 font-semibold'
                          : 'text-slate-300'
                      } ${col.key === 'season' ? 'font-semibold text-accent-blue' : ''} ${
                        col.key === 'team' ? 'text-slate-400' : ''
                      }`}
                    >
                      {display}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
