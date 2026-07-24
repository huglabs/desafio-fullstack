import * as React from 'react'
import * as RechartsPrimitive from 'recharts'

import { cn } from '@/shared/lib/utils'

const THEMES = { light: '', dark: '.dark' } as const

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />')
  }
  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<'div'> & {
  config: ChartConfig
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children']
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn(
          'flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke="#ccc"]]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke="#fff"]]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke="#ccc"]]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke="#ccc"]]:stroke-border [&_.recharts-sector[stroke="#fff"]]:stroke-transparent [&_.recharts-surface]:outline-none',
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(([, item]) => item.theme || item.color)

  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join('\n')}
}
`,
          )
          .join('\n'),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  label,
  className,
}: {
  active?: boolean
  payload?: Array<{
    name?: string
    value?: number
    color?: string
    dataKey?: string | number
    payload?: { fill?: string; stroke?: string }
  }>
  label?: string
  className?: string
  hideLabel?: boolean
}) {
  const { config } = useChart()

  if (!active || !payload?.length) return null

  return (
    <div
      className={cn(
        'grid min-w-[8rem] items-start gap-1.5 rounded-xl border border-border/70 bg-card px-2.5 py-1.5 text-xs shadow-xl',
        className,
      )}
    >
      {label ? <div className="font-medium">{label}</div> : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${item.name || item.dataKey || 'value'}`
          const itemConfig = config[key as keyof typeof config]
          const indicatorColor = item.color || item.payload?.fill || item.payload?.stroke

          return (
            <div key={index} className="flex w-full items-center gap-2">
              <div
                className="size-2.5 shrink-0 rounded-[2px]"
                style={{ backgroundColor: indicatorColor }}
              />
              <div className="flex flex-1 justify-between gap-4 leading-none">
                <span className="text-muted-foreground">
                  {itemConfig?.label || item.name}
                </span>
                <span className="font-mono font-medium tabular-nums text-foreground">
                  {item.value?.toLocaleString()}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartStyle }
