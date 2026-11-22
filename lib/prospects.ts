import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Prospect } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'prospects')

function assignRanks(prospects: Prospect[]): Prospect[] {
  const byYear = new Map<number, Prospect[]>()
  for (const p of prospects) {
    if (!byYear.has(p.draftYear)) byYear.set(p.draftYear, [])
    byYear.get(p.draftYear)!.push(p)
  }

  for (const yearProspects of byYear.values()) {
    yearProspects.sort((a, b) => b.grade - a.grade)
    yearProspects.forEach((p, i) => {
      p.rank = i + 1
    })

    const posCounter = new Map<string, number>()
    for (const p of yearProspects) {
      const next = (posCounter.get(p.position) ?? 0) + 1
      posCounter.set(p.position, next)
      p.positionalRank = next
    }
  }

  return prospects
}

function loadAllRaw(): Prospect[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const prospects: Prospect[] = []
  const years = fs.readdirSync(CONTENT_DIR).filter((f) =>
    fs.statSync(path.join(CONTENT_DIR, f)).isDirectory()
  )

  for (const year of years) {
    const yearDir = path.join(CONTENT_DIR, year)
    const files = fs
      .readdirSync(yearDir)
      .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))

    for (const file of files) {
      const slug = file.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(yearDir, file), 'utf-8')
      const { data, content } = matter(raw)
      prospects.push({ ...(data as Omit<Prospect, 'slug' | 'content'>), slug, content })
    }
  }

  return prospects
}

export function getAllProspects(): Prospect[] {
  const prospects = loadAllRaw()
  assignRanks(prospects)
  return prospects.sort((a, b) =>
    b.draftYear !== a.draftYear ? b.draftYear - a.draftYear : a.rank - b.rank
  )
}

export function getProspectsByYear(year: number): Prospect[] {
  return getAllProspects().filter((p) => p.draftYear === year)
}

export function getProspect(year: string, slug: string): Prospect | null {
  const yearNum = parseInt(year, 10)
  return getProspectsByYear(yearNum).find((p) => p.slug === slug) ?? null
}

export function getAvailableYears(): number[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => fs.statSync(path.join(CONTENT_DIR, f)).isDirectory())
    .map(Number)
    .sort((a, b) => b - a)
}
