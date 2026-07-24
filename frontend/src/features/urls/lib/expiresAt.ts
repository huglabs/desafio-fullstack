/** Formata Date para o valor usado em inputs date/time locais (sem timezone). */
export function toLocalDateTimeParts(date: Date): { date: string; time: string } {
  const pad = (n: number) => String(n).padStart(2, '0')

  return {
    date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    time: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
  }
}

export function toLocalDateTimeValue(date: Date): string {
  const { date: d, time } = toLocalDateTimeParts(date)
  return `${d}T${time}`
}

export function splitLocalDateTime(value: string | undefined): { date: string; time: string } {
  if (!value) {
    return { date: '', time: '' }
  }

  const [date = '', time = ''] = value.split('T')
  return { date, time: time.slice(0, 5) }
}

export function joinLocalDateTime(date: string, time: string): string {
  if (!date) {
    return ''
  }

  return `${date}T${time || '23:59'}`
}

export function formatExpiresAtLabel(value: string | undefined): string | null {
  if (!value) {
    return null
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return null
  }

  return parsed.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

export function addHoursFromNow(hours: number): string {
  const date = new Date()
  date.setMinutes(0, 0, 0)
  date.setHours(date.getHours() + hours)
  return toLocalDateTimeValue(date)
}

export function addDaysFromNow(days: number, atHour = 23, atMinute = 59): string {
  const date = new Date()
  date.setDate(date.getDate() + days)
  date.setHours(atHour, atMinute, 0, 0)
  return toLocalDateTimeValue(date)
}

export function minLocalDateTimeValue(): string {
  return toLocalDateTimeValue(new Date())
}
