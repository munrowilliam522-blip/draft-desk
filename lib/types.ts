export type PositionGroup = 'QB' | 'RB' | 'WR' | 'TE' | 'OL' | 'DL' | 'EDGE' | 'LB' | 'CB' | 'S'

export interface ProspectStat {
  season: string
  team: string
  gamesPlayed: number
  // Passing
  completions?: number
  attempts?: number
  completionPct?: number
  passingYards?: number
  passingTDs?: number
  interceptions?: number
  qbRating?: number
  // Rushing (QB + RB)
  rushAttempts?: number
  rushYards?: number
  yardsPerCarry?: number
  rushTDs?: number
  // Receiving (WR/TE/RB)
  targets?: number
  receptions?: number
  receivingYards?: number
  yardsPerReception?: number
  receivingTDs?: number
  yardsAfterCatch?: number
  // Defense (EDGE/DL/LB)
  tackles?: number
  soloTackles?: number
  tacklesForLoss?: number
  sacks?: number
  qbPressures?: number
  forcedFumbles?: number
  passDeflections?: number
  stuffs?: number
  // CB/S
  targets_allowed?: number
  completionsAllowed?: number
  interceptionsCB?: number
  // OL
  snapsPlayed?: number
  allowedSacks?: number
  allowedPressures?: number
  pressureRate?: number
  penaltiesCommitted?: number
  // Misc
  fumbles?: number
}

export interface Prospect {
  slug: string
  name: string
  school: string
  position: PositionGroup
  draftYear: number
  rank: number
  positionalRank: number
  grade: number
  // Physical
  height: string
  weight: number
  hometown?: string
  age?: number
  // Combine / Pro Day
  fortyTime?: string
  tenYardSplit?: string
  vertical?: string
  broadJump?: string
  threeCone?: string
  shuttle?: string
  armLength?: string
  handSize?: string
  wingspan?: string
  // Content
  bio: string
  stats: ProspectStat[]
  // MDX body (scouting report)
  content: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  tags: string[]
  content: string
  coverImage?: string
}
