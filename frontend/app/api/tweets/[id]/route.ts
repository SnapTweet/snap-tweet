import { NextResponse } from "next/server"

// Mock tweets data (same as in tweets/route.ts)
let mockTweets = [
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find the tweet index
  const tweetIndex = mockTweets.findIndex((tweet) => tweet.id === id)

  if (tweetIndex === -1) {
    return NextResponse.json({ message: "Tweet not found" }, { status: 404 })
  }

  // In a real app, you'd check if the user is authorized to delete this tweet

  // Remove the tweet
  mockTweets = mockTweets.filter((tweet) => tweet.id !== id)

  return NextResponse.json({ success: true })
}

