import { ClipboardList } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="page-container py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ClipboardList size={15} className="text-maroon-600" strokeWidth={2} />
            <span className="text-sm font-bold text-gray-800">
              Draft<span className="text-maroon-600">Desk</span>
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-gray-400">
            <p>&copy; {new Date().getFullYear()} DraftDesk. All rights reserved.</p>
            <p>Scouting grades are editorial opinions only.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
