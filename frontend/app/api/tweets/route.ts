import { NextResponse } from "next/server"

// Mock tweets data
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

export async function GET() {
  // Return mock tweets
  return NextResponse.json(mockTweets)
}

export async function POST(request: Request) {
  try {
    const { content } = await request.json()

    // Create a new mock tweet
    const newTweet = {
      id: (mockTweets.length + 1).toString(),
      content,
      userId: "1",
      userName: "Demo User",
      createdAt: new Date().toISOString(),
      likes: [],
    }

    // In a real app, you'd save this to a database
    mockTweets.unshift(newTweet)

    return NextResponse.json(newTweet)
  } catch (error) {
    return NextResponse.json({ message: "Failed to create tweet" }, { status: 500 })
  }
}

