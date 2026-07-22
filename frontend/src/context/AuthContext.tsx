import { createContext, useEffect, useState } from "react"
import type { User } from "../types/user"

interface AuthContextType {
  token: string | null
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  refreshUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )

  const [user, setUser]   = useState<User | null>(null)

  useEffect(() => {
    if (!token) return

    fetch('/api/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Token invalide')
        return res.json()
      })
      .then(data => setUser(data))
      .catch(() => {
        setToken(null)
        localStorage.removeItem('token')
      })
  }, [])

  const login = async (email: string, password: string) => {
      try {
          // Étape 1 — login
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })

          if (!res.ok) throw new Error('Identifiants incorrects')

          const data = await res.json()
          setToken(data.token)
          localStorage.setItem('token', data.token)

          // Étape 2 — récupère le user avec le token frais
          const meRes = await fetch('/api/me', {
              headers: { 'Authorization': `Bearer ${data.token}` },
          })

          const user = await meRes.json()
          setUser(user)

      } catch (err) {
          throw new Error(err instanceof Error ? err.message : 'Erreur inconnue')
      }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token') // ← nettoie
  }

  const refreshUser = async () => {
      const res = await fetch('/api/me', {
          headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) return
      const data = await res.json()
      setUser(data)
  }

  return (
    <AuthContext.Provider value={{
      token,
      user,
      login,
      logout,
      isAuthenticated: !!token,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}