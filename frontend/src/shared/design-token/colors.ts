/** CSS variable names — values live in src/index.css */
export const colorTokens = {
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  card: 'var(--card)',
  cardForeground: 'var(--card-foreground)',
  popover: 'var(--popover)',
  popoverForeground: 'var(--popover-foreground)',
  primary: 'var(--primary)',
  primaryForeground: 'var(--primary-foreground)',
  secondary: 'var(--secondary)',
  secondaryForeground: 'var(--secondary-foreground)',
  muted: 'var(--muted)',
  mutedForeground: 'var(--muted-foreground)',
  accent: 'var(--accent)',
  accentForeground: 'var(--accent-foreground)',
  destructive: 'var(--destructive)',
  border: 'var(--border)',
  input: 'var(--input)',
  ring: 'var(--ring)',
  surfaceGlow: 'var(--surface-glow)',
  surfaceGlowStrong: 'var(--surface-glow-strong)',
} as const

/** Chart palette (oklch green family) for Recharts / shadcn Chart */
export const chartColors = {
  primary: 'oklch(0.52 0.14 150)',
  secondary: 'oklch(0.62 0.12 155)',
  tertiary: 'oklch(0.72 0.1 145)',
  muted: 'oklch(0.78 0.06 150)',
} as const

export type ColorToken = keyof typeof colorTokens
