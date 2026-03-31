import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Prospect } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'prospects')

export function getAllProspects(): Prospect[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const prospects: Prospect[] = []
  const years = fs.readdirSync(CONTENT_DIR).filter((f) =>
    fs.statSync(path.join(CONTENT_DIR, f)).isDirectory()
  )

  for (const year of years) {
    const yearDir = path.join(CONTENT_DIR, year)
    const files = fs.readdirSync(yearDir).filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))

    for (const file of files) {
      const slug = file.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(yearDir, file), 'utf-8')
      const { data, content } = matter(raw)
      prospects.push({ ...(data as Omit<Prospect, 'slug' | 'content'>), slug, content })
    }
  }

  return prospects.sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
}

export function getProspectsByYear(year: number): Prospect[] {
  return getAllProspects().filter((p) => p.draftYear === year)
}

export function getProspect(year: string, slug: string): Prospect | null {
  const filePath = path.join(CONTENT_DIR, year, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { ...(data as Omit<Prospect, 'slug' | 'content'>), slug, content }
}

export function getAvailableYears(): number[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => fs.statSync(path.join(CONTENT_DIR, f)).isDirectory())
    .map(Number)
    .sort((a, b) => b - a)
}

export function getFeaturedProspects(limit = 4): Prospect[] {
  return getAllProspects().slice(0, limit)
}

export function getRecentProspects(limit = 6): Prospect[] {
  return getAllProspects().slice(0, limit)
}
