import { differenceInCalendarDays, parseISO } from 'date-fns'

export function dayIndex(dateStr, origin) {
    return differenceInCalendarDays(parseISO(dateStr), parseISO(origin))
}

export function getRange(items) {
    const dates = items.flatMap(i => [i.start, i.end])
    const min = dates.reduce((a, b) => (a < b ? a : b))
    const max = dates.reduce((a, b) => (a > b ? a : b))
    return { min, max }
}

export const COLORS = [
    '#3b82f6',
    '#ef4444',
    '#10b981',
    '#f59e0b',
    '#8b5cf6',
    '#ec4899',
    '#14b8a6',
]