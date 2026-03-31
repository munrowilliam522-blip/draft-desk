import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, User, MapPin, Calendar } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getProspect, getProspectsByYear, getAvailableYears } from '@/lib/prospects'
import PositionBadge from '@/components/PositionBadge'
import GradeDisplay from '@/components/GradeDisplay'
import MeasurementsGrid from '@/components/MeasurementsGrid'
import StatsTable from '@/components/StatsTable'

interface Props {
  params: Promise<{ year: string; slug: string }>
}

export async function generateStaticParams() {
  const years = getAvailableYears()
  const paths: Array<{ year: string; slug: string }> = []
  for (const year of years) {
    const prospects = getProspectsByYear(year)
    for (const p of prospects) {
      paths.push({ year: String(year), slug: p.slug })
    }
  }
  return paths
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, slug } = await params
  const prospect = getProspect(year, slug)
  if (!prospect) return {}
  return {
    title: `${prospect.name} — ${year} NFL Draft Scouting Report`,
    description: `${prospect.name} (${prospect.position}, ${prospect.school}) scouting report, combine data, stats, and NFL Draft grade. ${year} NFL Draft prospect.`,
    openGraph: {
      title: `${prospect.name} | DraftHub Scouting Report`,
      description: prospect.bio?.slice(0, 155),
    },
  }
}

export default async function PlayerPage({ params }: Props) {
  const { year, slug } = await params
  const prospect = getProspect(year, slug)
  if (!prospect) notFound()

  const hasScoutingReport = prospect.content.trim().length > 0

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-navy-500 bg-navy-800/40">
        <div className="page-container py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/prospects/${year}`} className="hover:text-slate-300 transition-colors">
              {year} Draft
            </Link>
            <span>/</span>
            <span className="text-slate-300 truncate">{prospect.name}</span>
          </nav>
        </div>
      </div>

      {/* Player header */}
      <section className="border-b border-navy-500 bg-gradient-to-b from-navy-800/60 to-transparent">
        <div className="page-container py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row gap-6 sm:items-start">
            {/* Avatar */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-navy-700 border-2 border-navy-500">
              <User size={40} className="text-navy-400" strokeWidth={1} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <PositionBadge position={prospect.position} size="lg" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  {year} NFL Draft
                </span>
                {prospect.rank && (
                  <span className="badge bg-navy-600 text-slate-300 border border-navy-400">
                    #{prospect.rank} Overall
                  </span>
                )}
                {prospect.positionalRank && (
                  <span className="badge bg-navy-600 text-slate-400 border border-navy-500">
                    #{prospect.positionalRank} {prospect.position}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1">
                {prospect.name}
              </h1>
              <p className="text-xl text-slate-400 font-medium mb-3">{prospect.school}</p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                <span>
                  {prospect.height} &middot; {prospect.weight} lbs
                </span>
                {prospect.hometown && (
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {prospect.hometown}
                  </span>
                )}
                {prospect.age && (
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    Age {prospect.age}
                  </span>
                )}
              </div>
            </div>

            {/* Grade */}
            <div className="flex flex-col items-center justify-center card px-6 py-4 shrink-0 border-navy-400">
              <span className="section-label mb-2">DraftHub Grade</span>
              <GradeDisplay grade={prospect.grade} size="lg" showLabel />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="page-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Bio */}
            {prospect.bio && (
              <div>
                <h2 className="section-label mb-4">Player Bio</h2>
                <p className="text-slate-300 leading-relaxed">{prospect.bio}</p>
              </div>
            )}

            {/* Scouting Report (MDX body) */}
            {hasScoutingReport && (
              <div>
                <h2 className="section-label mb-4">Scouting Report</h2>
                <div className="prose prose-scout max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2 prose-p:leading-relaxed prose-strong:text-slate-100">
                  <MDXRemote source={prospect.content} />
                </div>
              </div>
            )}

            {/* Stats table */}
            <StatsTable prospect={prospect} />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <MeasurementsGrid prospect={prospect} />

            {/* Back to class */}
            <div className="card p-4">
              <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wide">
                Back to Draft Class
              </p>
              <Link href={`/prospects/${year}`} className="btn-ghost w-full justify-center">
                <ChevronLeft size={14} />
                {year} Draft Board
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
