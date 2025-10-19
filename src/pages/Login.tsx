import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email || !password) {
      setError('Please fill all fields')
      return
    }
    const res = login(email, password)
    if (!res.ok) {
      setError(res.error)
      return
    }
    // successful login -> go to home
    navigate('/')
  }

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          {error && <div className="error">{error}</div>}
          <div className="auth-actions">
            <button type="submit" className="btn">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}
