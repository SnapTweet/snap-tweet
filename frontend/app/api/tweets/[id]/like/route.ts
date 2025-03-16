import { NextResponse } from "next/server"

// Mock tweets data (same as in tweets/route.ts)
const mockTweets = [
  {
    id: "1",
    content: "Hello world! This is my first tweet on Snap-Tweet.",
    userId: "1",
    userName: "Demo User",
    createdAt: new Date().toISOString(),
    likes: [],
  },
  {
    id: "2",
    content: "Snap-Tweet is awesome! Loving the clean interface.",
    userId: "2",
    userName: "Jane Doe",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    likes: ["1"],
  },
  {
    id: "3",
    content: "Just deployed my new project. Check it out at vercel.com!",
    userId: "3",
    userName: "John Smith",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    likes: ["1", "2"],
  },
]

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find the tweet
  const tweet = mockTweets.find((tweet) => tweet.id === id)

  if (!tweet) {
    return NextResponse.json({ message: "Tweet not found" }, { status: 404 })
  }

  // In a real app, you'd get the user ID from the authenticated session
  const userId = "1" // Mock user ID

  // Add the like if it doesn't exist
  if (!tweet.likes.includes(userId)) {
    tweet.likes.push(userId)
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find the tweet
  const tweet = mockTweets.find((tweet) => tweet.id === id)

  if (!tweet) {
    return NextResponse.json({ message: "Tweet not found" }, { status: 404 })
  }

  // In a real app, you'd get the user ID from the authenticated session
  const userId = "1" // Mock user ID

  // Remove the like if it exists
  tweet.likes = tweet.likes.filter((id) => id !== userId)

  return NextResponse.json({ success: true })
}

