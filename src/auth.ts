// Simple localStorage backed auth helpers

type User = {
  name: string
  email: string
  password: string
}

const USERS_KEY = 'app_users'
const SESSION_KEY = 'app_session'

export function getUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveUser(user: User) {
  const users = getUsers()
  users.push(user)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function findUserByEmail(email: string) {
  return getUsers().find(u => u.email === email)
}

export function register(user: User) {
  if (findUserByEmail(user.email)) {
    return { ok: false, error: 'User already exists' }
  }
  saveUser(user)
  return { ok: true }
}

export function login(email: string, password: string) {
  const user = findUserByEmail(email)
  if (!user || user.password !== password) return { ok: false, error: 'Invalid credentials' }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email: user.email, name: user.name }))
  return { ok: true }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

export function currentUser() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
