import { parseISO } from 'date-fns'

export function assignLanes(items) {
    const mapped = items
        .map(i => ({
            ...i,
            _s: parseISO(i.start).getTime(),
            _e: parseISO(i.end).getTime()
        }))
        .sort((a, b) => a._s - b._s)

    const lanes = []

    for (const item of mapped) {
        let placed = false

        for (const lane of lanes) {
            const last = lane[lane.length - 1]
            if (last._e < item._s) {
                lane.push(item)
                placed = true
                break
            }
        }
        
        if (!placed) lanes.push([item])
    }

    const assignment = {}
    lanes.forEach((lane, idx) =>
        lane.forEach(it => (assignment[it.id] = idx))
    )

    return { lanesCount: lanes.length, assignment }
}
