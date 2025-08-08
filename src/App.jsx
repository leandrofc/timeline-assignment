import React from 'react'
import Timeline from './components/Timeline/TimeLine'
import timelineItems from "./timelineItems.js";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Airtable — Timeline</h1>
        <Timeline items={timelineItems} />
      </div>
    </div>
  )
}
