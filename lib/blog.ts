import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))

  return files
    .map((file) => {
      const slug = file.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8')
      const { data, content } = matter(raw)
      return { ...(data as Omit<BlogPost, 'slug' | 'content'>), slug, content }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { ...(data as Omit<BlogPost, 'slug' | 'content'>), slug, content }
}

export function getRecentPosts(limit = 3): BlogPost[] {
  return getAllPosts().slice(0, limit)
}
