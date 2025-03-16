import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Mock signup - in a real app, you'd create a user in the database
    if (name && email && password) {
      return NextResponse.json({
        token: "mock-jwt-token",
        user: {
          id: "1",
          name: name,
          email: email,
        },
      })
    } else {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

