import { describe, expect, it } from 'vitest'

import {
  formatExpiresAtLabel,
  joinLocalDateTime,
  splitLocalDateTime,
  toLocalDateTimeValue,
} from '@/features/urls/lib/expiresAt'

describe('helpers de expiração', () => {
  it('monta e separa data/hora local', () => {
    const value = toLocalDateTimeValue(new Date(2026, 6, 24, 15, 30))

    expect(value).toBe('2026-07-24T15:30')
    expect(splitLocalDateTime(value)).toEqual({ date: '2026-07-24', time: '15:30' })
    expect(joinLocalDateTime('2026-07-24', '')).toBe('2026-07-24T23:59')
  })

  it('formata label em pt-BR', () => {
    const label = formatExpiresAtLabel('2026-07-24T15:30')

    expect(label).toMatch(/24/)
    expect(label).toMatch(/07|7/)
  })

  it('retorna null para valor vazio', () => {
    expect(formatExpiresAtLabel('')).toBeNull()
    expect(formatExpiresAtLabel(undefined)).toBeNull()
  })
})
