import { CalendarClock, X } from 'lucide-react'
import { useState } from 'react'

import {
  addDaysFromNow,
  addHoursFromNow,
  formatExpiresAtLabel,
  joinLocalDateTime,
  minLocalDateTimeValue,
  splitLocalDateTime,
} from '@/features/urls/lib/expiresAt'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { cn } from '@/shared/lib/utils'

const PRESETS = [
  { id: '1h', label: '1 hora', value: () => addHoursFromNow(1) },
  { id: '24h', label: '24 horas', value: () => addHoursFromNow(24) },
  { id: '7d', label: '7 dias', value: () => addDaysFromNow(7) },
  { id: '30d', label: '30 dias', value: () => addDaysFromNow(30) },
] as const

type PresetId = (typeof PRESETS)[number]['id'] | 'none' | 'custom'

interface ExpiresAtFieldProps {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  disabled?: boolean
  id?: string
}

export function ExpiresAtField({
  value,
  onChange,
  onBlur,
  disabled,
  id,
}: ExpiresAtFieldProps) {
  const [presetId, setPresetId] = useState<PresetId>(value ? 'custom' : 'none')
  const { date, time } = splitLocalDateTime(value)
  const minParts = splitLocalDateTime(minLocalDateTimeValue())
  const summary = formatExpiresAtLabel(value)

  function clearExpiration() {
    setPresetId('none')
    onChange('')
  }

  function applyPreset(nextId: (typeof PRESETS)[number]['id'], nextValue: string) {
    setPresetId(nextId)
    onChange(nextValue)
  }

  function updatePart(nextDate: string, nextTime: string) {
    setPresetId(nextDate ? 'custom' : 'none')
    onChange(joinLocalDateTime(nextDate, nextTime))
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={presetId === 'none' ? 'default' : 'outline'}
          disabled={disabled}
          onClick={clearExpiration}
        >
          Sem expiração
        </Button>
        {PRESETS.map((preset) => (
          <Button
            key={preset.id}
            type="button"
            size="sm"
            variant={presetId === preset.id ? 'default' : 'outline'}
            disabled={disabled}
            onClick={() => applyPreset(preset.id, preset.value())}
          >
            {preset.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className="text-xs font-medium text-muted-foreground">Data</span>
          <Input
            id={id}
            type="date"
            value={date}
            min={minParts.date}
            disabled={disabled}
            onBlur={onBlur}
            onChange={(event) => updatePart(event.target.value, time || '23:59')}
            className={cn(!date && 'text-muted-foreground')}
          />
        </label>
        <label className="space-y-1.5">
          <span className="text-xs font-medium text-muted-foreground">Horário</span>
          <Input
            type="time"
            value={time}
            disabled={disabled || !date}
            onBlur={onBlur}
            onChange={(event) => updatePart(date, event.target.value)}
          />
        </label>
      </div>

      <div className="flex min-h-8 items-center justify-between gap-2 rounded-xl border border-border/60 bg-muted/40 px-3 py-2 text-sm">
        <p className="inline-flex items-center gap-2 text-muted-foreground">
          <CalendarClock className="size-3.5 shrink-0" aria-hidden />
          {summary ? (
            <span>
              Expira em <span className="font-medium text-foreground">{summary}</span>
            </span>
          ) : (
            <span>Link sem data de expiração</span>
          )}
        </p>
        {value ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 shrink-0 px-2"
            disabled={disabled}
            onClick={clearExpiration}
            aria-label="Limpar data de expiração"
          >
            <X className="size-3.5" />
            Limpar
          </Button>
        ) : null}
      </div>
    </div>
  )
}
