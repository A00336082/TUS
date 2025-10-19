import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Event } from './types'
import EventList from './components/EventList'
import EventForm from './components/EventForm'
import EventDetails from './components/EventDetails'
import Register from './pages/Register'
import Login from './pages/Login'
import RequireAuth from './components/RequireAuth'
import { currentUser, logout } from './auth'
import { useNavigate } from 'react-router-dom'

const initialEvents: Event[] = [
  { id: '1', title: 'Welcome Week Fair', date: '2025-09-01', location: 'Main Quad', description: 'Join us for food, music, and clubs!' },
  { id: '2', title: 'Career Expo', date: '2025-10-05', location: 'Student Center', description: 'Meet top employers recruiting on campus.' }
]

export default function App() {
  const navigate = useNavigate()
  const user = currentUser()
  function handleLogout() {
    logout()
    navigate('/login')
  }
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [selected, setSelected] = useState<Event | null>(null)

  function addEvent(e: Event) {
    setEvents(prev => [e, ...prev])
  }

  function removeEvent(id: string) {
    setEvents(prev => prev.filter(ev => ev.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  return (
    <div className="app">
      <header>
        <h1> Sprintables Campus Event Planner</h1>
        <nav>
          <Link to="/">Home</Link> |
          {!user && (
            <>
              <Link to="/register"> Register</Link> |
              <Link to="/login"> Login</Link>
            </>
          )}
          {user && (
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={handleLogout} style={{ marginLeft: 8 }}>Logout</button>
            </>
          )}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={(
            <RequireAuth>
              <div className="home">
                <section className="left">
                  <EventForm onCreate={addEvent} />
                  <EventList events={events} onSelect={setSelected} onDelete={removeEvent} />
                </section>
                <aside className="right">
                  <EventDetails event={selected} />
                </aside>
              </div>
            </RequireAuth>
          )} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  )
}
