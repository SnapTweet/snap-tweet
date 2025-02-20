"use client"
import { useEffect, useState } from "react"

export default function Home() {
  const [message, setMessage] = useState("Loading...")

  useEffect(() => {
    fetch("http://localhost:5000/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Failed to load"))
  }, [])

  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Next.js + Express + MongoDB</h1>
      <p>{message}</p>
    </main>
  )
}
