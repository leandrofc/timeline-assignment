import React, { useState, useEffect } from 'react'
import { format, parseISO } from 'date-fns'

const COLORS = [
  '#3b82f6',
  '#ef4444',
  '#10b981',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
]

export default function TimelineItem({ item, onEdit }) {
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(item.name)
    const [color, setColor] = useState(COLORS[0])

    useEffect(() => {
        const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]
        setColor(randomColor)
    }, [])

    const startDate = format(parseISO(item.start), 'MMM dd, yyyy')
    const endDate = format(parseISO(item.end), 'MMM dd, yyyy')

    return (
        <div
            className="relative h-10 w-full rounded shadow-sm overflow-visible transition group"
            style={{ backgroundColor: color }}
            title={`${item.name} • ${startDate} → ${endDate}`}
        >
        <div className="pointer-events-none absolute left-0 top-full mt-1 w-max max-w-xs whitespace-normal bg-gray-900 text-white text-xs rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-[1000] shadow-lg">
            <div className="font-semibold">
                {item.name}
            </div>
            <div className="text-gray-200 text-[11px]">
                Start: {startDate}
            </div>
            <div className="text-gray-200 text-[11px]">
                End: {endDate}
            </div>
        </div>

        <button
            className="absolute top-1 right-1 z-30 text-xs bg-white bg-opacity-90 text-gray-800 rounded px-1 py-0.5 shadow-sm"
            onClick={() => setEditing(true)}
            aria-label={`Edit ${item.name}`}
        >
            ✎
        </button>

        <div className="h-full flex items-center px-2 text-sm text-white">
            {editing ? (
                <input
                    className="w-full bg-transparent outline-none text-white"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onBlur={() => {
                    setEditing(false)
                    onEdit(item.id, value)
                    }}
                    onKeyDown={e => {
                    if (e.key === 'Enter') {
                        setEditing(false)
                        onEdit(item.id, value)
                    }
                    }}
                    autoFocus
                />
            ) : (
                <div className="flex items-center w-full truncate">
                    {item.name}
                </div>
            )}
        </div>
        </div>
    )
}
