"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function WelcomeMessage() {
  const [message, setMessage] = useState("Loading...")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:5000/api/hello")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message)
        setError(false)
      })
      .catch(() => {
        setMessage("Failed to load")
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <Card className="p-6">
        <Skeleton className="h-6 w-48 mx-auto" />
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="p-6">
      <p className="text-2xl font-medium text-blue-800">{message}</p>
    </Card>
  )
}

