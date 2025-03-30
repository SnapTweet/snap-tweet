"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Home, User, LogOut, Twitter } from "lucide-react"

export default function Navbar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Twitter className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">Snap-Tweet</span>
        </Link>

        <nav>
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant={pathname === "/" ? "default" : "ghost"}
                  size="icon"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Home</span>
                </Button>
              </Link>
              <Link href="/profile">
                <Button
                  variant={pathname === "/profile" ? "default" : "ghost"}
                  size="icon"
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
              <Link href="/profile">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.username
                      ? user.username.charAt(0).toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="outline">Sign in</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
