import React, { useState } from 'react'
import { Event } from '../types'

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export default function EventForm({ onCreate }: { onCreate: (e: Event) => void }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const t = title.trim()
    const d = date.trim()
    if (!t || !d) return
    const newEvent: Event = { id: uid(), title: t, date: d, location: location.trim() || undefined, description: description.trim() || undefined }
    onCreate(newEvent)
    setTitle('')
    setDate('')
    setLocation('')
    setDescription('')
  }

  return (
    <form className="event-form" onSubmit={submit}>
      <h2>Create event</h2>
      <label>
        Title
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </label>
      <label>
        Date
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </label>
      <label>
        Location
        <input value={location} onChange={e => setLocation(e.target.value)} />
      </label>
      <label>
        Description
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <div className="form-actions">
        <button type="submit">Add event</button>
      </div>
    </form>
  )
}
