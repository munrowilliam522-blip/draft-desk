import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import BlogCard from '@/components/BlogCard'

export const metadata: Metadata = {
  title: 'NFL Draft Analysis',
  description: 'In-depth NFL Draft analysis, big board breakdowns, positional rankings, and prospect deep-dives.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="page-container py-10">
      <div className="mb-10 pb-8 border-b border-navy-500">
        <span className="section-label">Editorial</span>
        <h1 className="section-heading mt-1">Draft Analysis</h1>
        <p className="mt-2 text-sm text-slate-400 max-w-2xl">
          Big board updates, positional rankings, scheme fits, and everything else you need to
          understand the draft.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-slate-500">No posts yet. Check back soon.</p>
      ) : (
        <div className="max-w-4xl">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
