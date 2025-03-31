import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Mock authentication - in a real app, you'd verify credentials
    if (email && password) {
      return NextResponse.json({
        token: "mock-jwt-token",
        user: {
          id: "1",
          name: "Demo User",
          email: email,
        },
      });
    } else {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
