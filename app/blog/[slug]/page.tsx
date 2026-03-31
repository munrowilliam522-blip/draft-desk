import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, User, ChevronLeft, Tag } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPost, getAllPosts } from '@/lib/blog'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
    },
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-navy-500 bg-navy-800/40">
        <div className="page-container py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-slate-300 transition-colors">Analysis</Link>
            <span>/</span>
            <span className="text-slate-300 truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Post header */}
      <header className="border-b border-navy-500 bg-gradient-to-b from-navy-800/60 to-transparent">
        <div className="page-container py-10 sm:py-14">
          <div className="max-w-3xl">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="badge bg-accent-blue-subtle text-accent-blue border border-blue-800/40"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-6">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <User size={14} />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formatDate(post.date)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Article body */}
      <div className="page-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <article className="lg:col-span-3">
            <div className="prose prose-scout max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:leading-relaxed prose-p:text-slate-300 prose-strong:text-slate-100 prose-li:text-slate-300 prose-li:leading-relaxed">
              <MDXRemote source={post.content} />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="card p-4 sticky top-20">
              <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wide">
                In this post
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge bg-navy-600 text-slate-400 border border-navy-400 flex items-center gap-1"
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="/blog" className="btn-ghost w-full justify-center text-sm">
                <ChevronLeft size={14} />
                All Analysis
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
