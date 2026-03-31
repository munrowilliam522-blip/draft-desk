import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/lib/types'

interface Props {
  post: BlogPost
  compact?: boolean
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Full editorial row — used on the /blog listing page
function EditorialRow({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block py-7 border-b border-navy-500 last:border-0"
    >
      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
        <span className="text-xs text-slate-500">{formatDate(post.date)}</span>
        <span className="text-navy-400 text-xs">/</span>
        <span className="text-xs text-slate-500">{post.author}</span>
        <span className="text-navy-400 text-xs">/</span>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="badge bg-accent-blue-subtle text-accent-blue border border-blue-900/60 text-[10px] tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-accent-blue transition-colors duration-150 leading-snug mb-2">
        {post.title}
      </h3>

      {/* Excerpt + Read link row */}
      <div className="flex items-end justify-between gap-6">
        <p className="text-sm text-slate-400 leading-relaxed max-w-2xl line-clamp-2">
          {post.excerpt}
        </p>
        <span className="shrink-0 flex items-center gap-1 text-xs font-semibold text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-150 pb-0.5">
          Read
          <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  )
}

// Compact variant — used in the homepage sidebar
function CompactRow({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block py-4 border-b border-navy-500 last:border-0">
      <div className="flex items-center gap-2 mb-1.5">
        {post.tags.slice(0, 1).map((tag) => (
          <span
            key={tag}
            className="badge bg-accent-blue-subtle text-accent-blue border border-blue-900/60 text-[10px]"
          >
            {tag}
          </span>
        ))}
        <span className="text-xs text-slate-500">{formatDate(post.date)}</span>
      </div>
      <h3 className="text-sm font-semibold text-slate-200 group-hover:text-accent-blue transition-colors leading-snug line-clamp-2">
        {post.title}
      </h3>
    </Link>
  )
}

export default function BlogCard({ post, compact = false }: Props) {
  return compact ? <CompactRow post={post} /> : <EditorialRow post={post} />
}
