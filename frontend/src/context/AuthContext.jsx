import { createContext, useEffect, useMemo, useRef, useState } from 'react'
import { login as apiLogin, signup as apiSignup, logout as apiLogout, refresh as apiRefresh, profile as apiProfile } from '../services/auth'

function parseJwt(token) {
  try {
    const base64 = token.split('.')[1]
    const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(json)
  } catch {
    return null
  }
}

const AuthContext = createContext(null)

const STORAGE_KEY = 'auth'

function loadStoredAuth() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveStoredAuth(auth) {
  if (typeof window === 'undefined') return
  try {
    if (!auth || !auth.token) {
      window.localStorage.removeItem(STORAGE_KEY)
    } else {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(auth))
    }
  } catch {
    // ignore storage errors (Safari private mode, etc.)
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const refreshTimer = useRef(null)
  const initialized = useRef(false)

  async function scheduleRefresh(accessToken) {
    if (refreshTimer.current) clearTimeout(refreshTimer.current)
    // Access tokens expire in ~15m; refresh a bit earlier
    const fifteenMinutes = 15 * 60 * 1000
    refreshTimer.current = setTimeout(refreshAccess, Math.max(1, fifteenMinutes - 60 * 1000))
    const payload = parseJwt(accessToken)
    if (payload) setRole(payload.role)
  }

  async function refreshAccess() {
    const res = await apiRefresh().catch(() => null)
    const accessToken = res?.data?.token
    if (accessToken) {
      setToken(accessToken)
      scheduleRefresh(accessToken)
      const meRes = await apiProfile(accessToken)
      setUser(meRes?.data || null)
      const storedRole = parseJwt(accessToken)?.role || null
      setRole(storedRole)
      saveStoredAuth({
        token: accessToken,
        user: meRes?.data || null,
        role: storedRole,
      })
      return true
    }
    setToken(null)
    setUser(null)
    setRole(null)
    saveStoredAuth(null)
    return false
  }

  async function signIn({ email, password }) {
    const res = await apiLogin({ email, password })
    const payload = res?.data || {}
    setToken(payload.token)
    setUser({ _id: payload._id, name: payload.name, email: payload.email, role: payload.role })
    setRole(payload.role)
    await scheduleRefresh(payload.token)
    saveStoredAuth({
      token: payload.token,
      user: { _id: payload._id, name: payload.name, email: payload.email, role: payload.role },
      role: payload.role,
    })
    return payload
  }

  async function signUp({ name, email, password, role }) {
    const res = await apiSignup({ name, email, password, role })
    const payload = res?.data || {}
    setToken(payload.token)
    setUser({ _id: payload._id, name: payload.name, email: payload.email, role: payload.role })
    setRole(payload.role)
    await scheduleRefresh(payload.token)
    saveStoredAuth({
      token: payload.token,
      user: { _id: payload._id, name: payload.name, email: payload.email, role: payload.role },
      role: payload.role,
    })
    return payload
  }

  async function signOut() {
    await apiLogout().catch(() => {})
    setToken(null)
    setUser(null)
    setRole(null)
    if (refreshTimer.current) clearTimeout(refreshTimer.current)
     saveStoredAuth(null)
  }

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    // 1) Synchronously hydrate from localStorage so deep links don't
    //    immediately redirect on hard refresh.
    const stored = loadStoredAuth()
    if (stored?.token) {
      setToken(stored.token)
      setUser(stored.user || null)
      setRole(stored.role || null)
      scheduleRefresh(stored.token)
    }

    // 2) Then validate/refresh token from backend.
    //    Until this finishes, `loading` stays true and ProtectedRoute
    //    will show a loading screen instead of redirecting.
    refreshAccess().finally(() => setLoading(false))
    return () => { if (refreshTimer.current) clearTimeout(refreshTimer.current) }
  }, [])

  const value = useMemo(() => ({ token, user, role, loading, signIn, signUp, signOut }), [token, user, role, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export default AuthContext
