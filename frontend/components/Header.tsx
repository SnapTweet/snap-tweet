"use client"

import Link from "next/link"
import { useAuth, User } from "@/context/AuthContext"

export interface AuthContextType {
  user: User | null
  logout: () => void
}
export default function Header() {
  const authContext = useAuth()
  const user = authContext?.user
  const logout = authContext?.logout

  return (
    <header className="bg-white shadow">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          <Link href="/">Snap-Tweet</Link>
        </h1>

        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Hello, {user.name}</span>
            <button
              onClick={logout}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-2">
            <Link
              href="/login"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
