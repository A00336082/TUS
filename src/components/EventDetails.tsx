import React from 'react'
import { Event } from '../types'

export default function EventDetails({ event }: { event: Event | null }) {
  if (!event) return <div className="empty">Select an event to see details</div>

  return (
    <div className="details">
      <h2>{event.title}</h2>
      <div className="meta">{event.date}{event.location ? ` • ${event.location}` : ''}</div>
      {event.description && <p>{event.description}</p>}
    </div>
  )
}
