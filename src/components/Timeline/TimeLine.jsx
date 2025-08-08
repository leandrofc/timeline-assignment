import React, { useMemo, useState } from 'react'
import { assignLanes } from './assignLanes'
import { getRange, dayIndex } from './utils'
import TimelineItem from './TimelineItem'
import { addDays, differenceInCalendarDays, parseISO, format } from 'date-fns'

export default function Timeline({ items }) {
    const [scale, setScale] = useState(50)
    const [localItems, setLocalItems] = useState(items)

    const { min, max } = useMemo(() => getRange(localItems), [localItems])

    const totalDays = differenceInCalendarDays(parseISO(max), parseISO(min)) + 1

    const { assignment, lanesCount } = useMemo(() => assignLanes(localItems), [localItems])

    const pxWidth = totalDays * scale

    function onEdit(id, name) {
        setLocalItems(prev => prev.map(p => p.id === id ? { ...p, name } : p))
    }

    return (
        <div className="flex flex-col gap-3 p-4">
            <div className="flex items-center gap-2">
                <button onClick={() => setScale(s => Math.max(25, s - 2))} className="px-3 py-1 rounded bg-gray-200">
                    -
                </button>

                <div className="text-sm">
                    Zoom
                </div>

                <button onClick={() => setScale(s => Math.min(80, s + 4))} className="px-3 py-1 rounded bg-gray-200">
                    +
                </button>

                <div className="ml-auto text-sm text-gray-600">
                    Scale: {scale}px/day
                </div>
            </div>

            <div className="overflow-auto border rounded bg-white">
                <div style={{ width: pxWidth }} className="relative min-h-[100px]">
                    <div className="absolute top-0 left-0 h-full w-full pointer-events-none">
                        {Array.from({ length: totalDays }).map((_, i) => {
                            const date = addDays(parseISO(min), i)
                            return (
                                <div
                                    key={i}
                                    style={{ left: i * scale }}
                                    className="absolute top-0 h-full border-r border-gray-200/30"
                                >
                                    <div
                                        className="absolute mt-2 top-0 flex items-center justify-center text-xs text-gray-500 text-center"
                                        style={{
                                            width: scale,
                                            height: '24px',
                                        }}
                                    >
                                        {format(date, 'MMM dd')}
                                    </div>
                                </div>
                            )
                        })}

                        <div
                            style={{ left: totalDays * scale }}
                            className="absolute top-0 h-full border-r border-gray-200/30"
                        />
                    </div>

                    <div className="pt-10 pb-6">
                        {Array.from({ length: lanesCount }).map((_, laneIdx) => (
                        <div key={laneIdx} className="relative h-12 mb-3">
                            {localItems.map(item => {
                                if (assignment[item.id] !== laneIdx) return null

                                    const leftDays = dayIndex(item.start, min)
                                    const widthDays = Math.max(1, dayIndex(item.end, min) - leftDays + 1)

                                    const leftPx = leftDays * scale + 2
                                    const widthPx = Math.max(widthDays * scale - 4, 8)

                                return (
                                    <div
                                        key={item.id}
                                        style={{
                                            left: leftPx,
                                            width: widthPx,
                                            top: 0
                                        }}
                                        className="absolute group"
                                    >
                                        <TimelineItem item={item} onEdit={onEdit} />
                                    </div>
                                )
                            })}
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
