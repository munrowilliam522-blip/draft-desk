import type { Metadata } from 'next'
import { getAllProspects } from '@/lib/prospects'
import ProspectsGrid from '@/components/ProspectsGrid'

export const metadata: Metadata = {
  title: 'All NFL Draft Prospects',
  description: 'Browse every NFL Draft prospect across all draft classes with scouting grades and reports.',
}

export default function AllProspectsPage() {
  const prospects = getAllProspects()

  return (
    <div className="page-container py-10">
      <div className="mb-8">
        <span className="section-label">Prospect Database</span>
        <h1 className="section-heading mt-1">All Draft Prospects</h1>
        <p className="mt-2 text-sm text-slate-400">
          {prospects.length} prospects profiled across 3 draft classes.
        </p>
      </div>
      <ProspectsGrid prospects={prospects} showYearFilter />
    </div>
  )
}
