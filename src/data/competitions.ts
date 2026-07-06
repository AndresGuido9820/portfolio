export interface CompetitionTheme {
  id: string
  name: string
  shortName: string
  logo: string
  fieldBg: string
  gold: string
  goldLight: string
  goldDim: string
  borderColor: string
  glowRgb: string
  grass1: string
  grass2: string
}

export const COMPETITIONS: CompetitionTheme[] = [
  {
    id: 'ucl',
    name: 'UEFA Champions League',
    shortName: 'UCL',
    logo: import.meta.env.BASE_URL + 'icons/ucl.svg',
    fieldBg: import.meta.env.BASE_URL + 'field-bg-c.jpg',
    gold: '#34D399',
    goldLight: '#6EE7B7',
    goldDim: 'rgba(16,185,129,0.30)',
    borderColor: 'rgba(16,185,129,0.7)',
    glowRgb: '16,185,129',
    grass1: '#0e2a1a',
    grass2: '#123a24',
  },
]

const BG_COLORS: Record<string, string> = {
  ucl:          '#0A0B0D',
  libertadores: '#0A0B0D',
  premier:      '#0A0B0D',
}

export function applyCompetitionTheme(theme: CompetitionTheme) {
  const root = document.documentElement
  root.style.setProperty('--ucl-gold', theme.gold)
  root.style.setProperty('--ucl-gold-light', theme.goldLight)
  root.style.setProperty('--ucl-gold-dim', theme.goldDim)
  document.body.style.background = BG_COLORS[theme.id] ?? '#0A0B0D'
  document.body.style.transition = 'background 1s ease'
}
