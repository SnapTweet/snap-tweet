"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import axios from "axios"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  // Update the API endpoints and field names to match the provided API
  const API_URL = "http://localhost:5000/api"

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    if (token) {
      fetchUser(token)
    } else {
      setLoading(false)
    }
  }, [])

  // Update the fetchUser function to use the correct endpoint
  const fetchUser = async (token: string) => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUser(response.data)
    } catch (error) {
      console.error("Failed to fetch user:", error)
      localStorage.removeItem("token")
    } finally {
      setLoading(false)
    }
  }

  // Update the login function to match the API
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      })

      // Update to match the API response structure
      const token = response.data.token
      localStorage.setItem("token", token)

      // Fetch user details with the token
      await fetchUser(token)
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || "Login failed")
      }
      throw new Error("Network error. Please try again.")
    }
  }

  // Update the signup function to match the API
  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        username: name, // API expects username instead of name
        email,
        password,
      })

      // Update to match the API response structure
      const token = response.data.token
      localStorage.setItem("token", token)

      // Fetch user details with the token
      await fetchUser(token)
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || "Signup failed")
      }
      throw new Error("Network error. Please try again.")
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

