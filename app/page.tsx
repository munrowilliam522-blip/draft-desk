import { getProspectsByYear } from '@/lib/prospects'
import PlayerList from '@/components/PlayerList'

export default function HomePage() {
  const prospects = getProspectsByYear(2027)

  return (
    <div className="page-container py-12">
      {/* Page header */}
      <div className="mb-10 border-b border-gray-200 pb-8">
        <p className="section-label mb-2">2027 NFL Draft</p>
        <h1 className="text-5xl sm:text-6xl font-black text-gray-900 tracking-tight leading-none">
          Big Board
        </h1>
        <p className="mt-3 text-base text-gray-400">
          {prospects.length} prospect{prospects.length !== 1 ? 's' : ''} ranked
        </p>
      </div>

      <PlayerList prospects={prospects} />
    </div>
  )
}
