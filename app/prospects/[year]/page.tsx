import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProspectsByYear, getAvailableYears } from '@/lib/prospects'
import ProspectsGrid from '@/components/ProspectsGrid'

interface Props {
  params: Promise<{ year: string }>
}

export async function generateStaticParams() {
  const years = getAvailableYears()
  return years.map((year) => ({ year: String(year) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params
  return {
    title: `${year} NFL Draft Prospects`,
    description: `Scouting reports and grades for every ${year} NFL Draft prospect. Complete big board with combine data.`,
  }
}

export default async function YearProspectsPage({ params }: Props) {
  const { year } = await params
  const yearNum = parseInt(year, 10)
  if (isNaN(yearNum)) notFound()

  const prospects = getProspectsByYear(yearNum)
  if (prospects.length === 0) notFound()

  const positionGroups = Array.from(new Set(prospects.map((p) => p.position))).sort()

  return (
    <div className="page-container py-10">
      {/* Header */}
      <div className="mb-8 pb-8 border-b border-navy-500">
        <span className="section-label">{year} NFL Draft</span>
        <h1 className="section-heading mt-1">Draft Class Big Board</h1>
        <p className="mt-2 text-sm text-slate-400">
          {prospects.length} prospects &middot; {positionGroups.length} positions &middot; Sorted by overall grade
        </p>
      </div>

      <ProspectsGrid prospects={prospects} />
    </div>
  )
}
