import Link from 'next/link'
import { ArrowRight, TrendingUp, FileText, Users } from 'lucide-react'
import { getFeaturedProspects, getRecentProspects } from '@/lib/prospects'
import { getRecentPosts } from '@/lib/blog'
import ProspectCard from '@/components/ProspectCard'
import BlogCard from '@/components/BlogCard'

const CURRENT_YEAR = 2026

export default function HomePage() {
  const featured = getFeaturedProspects(4)
  const recent = getRecentProspects(6)
  const recentPosts = getRecentPosts(3)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-navy-500">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,142,247,0.08),transparent_60%)]" />
        <div className="relative page-container py-16 sm:py-24">
          <div className="max-w-2xl">
            <span className="section-label">
              {CURRENT_YEAR} NFL Draft — Live Coverage
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.1]">
              The Scout's Take on Every Prospect
            </h1>
            <p className="mt-4 text-lg text-slate-400 leading-relaxed max-w-xl">
              In-depth scouting reports, combine data, and prospect grades for every round of the
              NFL Draft. Straight talk, no filler.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/prospects/${CURRENT_YEAR}`} className="btn-primary">
                {CURRENT_YEAR} Big Board
                <ArrowRight size={16} />
              </Link>
              <Link href="/blog" className="btn-ghost">
                Draft Analysis
              </Link>
            </div>

            {/* Quick stats */}
            <div className="mt-12 flex flex-wrap gap-6">
              {[
                { icon: Users, label: 'Prospects Profiled', value: '100+' },
                { icon: FileText, label: 'Scouting Reports', value: '60+' },
                { icon: TrendingUp, label: 'Draft Classes', value: '3' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-blue-subtle border border-blue-800/40">
                    <Icon size={16} className="text-accent-blue" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white leading-none">{value}</p>
                    <p className="text-xs text-slate-500">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Draft Year nav */}
      <section className="border-b border-navy-500 bg-navy-800/50">
        <div className="page-container">
          <div className="flex overflow-x-auto">
            {[2026, 2025, 2024].map((year) => (
              <Link
                key={year}
                href={`/prospects/${year}`}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition-colors ${
                  year === CURRENT_YEAR
                    ? 'border-accent-blue text-accent-blue'
                    : 'border-transparent text-slate-400 hover:text-white hover:border-slate-600'
                }`}
              >
                {year} Draft
                {year === CURRENT_YEAR && (
                  <span className="badge bg-accent-blue text-white text-[10px]">Current</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="page-container py-12 sm:py-16">
        {/* Featured Prospects */}
        {featured.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="section-label">Top Prospects</span>
                <h2 className="section-heading mt-1">{CURRENT_YEAR} Big Board</h2>
              </div>
              <Link href={`/prospects/${CURRENT_YEAR}`} className="btn-ghost text-sm">
                Full Board
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map((p) => (
                <ProspectCard key={`${p.draftYear}-${p.slug}`} prospect={p} featured />
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Recent Scouting Reports */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="section-label">Scouting Reports</span>
                <h2 className="section-heading mt-1">Recently Added</h2>
              </div>
              <Link href="/prospects" className="btn-ghost text-sm">
                All Prospects
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-2">
              {recent.map((p) => (
                <ProspectCard key={`${p.draftYear}-${p.slug}`} prospect={p} />
              ))}
            </div>
          </section>

          {/* Recent Blog Posts */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="section-label">Analysis</span>
                <h2 className="section-heading mt-1">Latest Posts</h2>
              </div>
            </div>
            <div className="space-y-3">
              {recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} compact />
                ))
              ) : (
                <p className="text-slate-500 text-sm">No posts yet.</p>
              )}
            </div>
            <div className="mt-4">
              <Link href="/blog" className="btn-ghost w-full justify-center">
                All Analysis Posts
                <ArrowRight size={14} />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
