import { SignupForm } from "@/components/signup-form"
import Link from "next/link"

export const metadata = {
  title: "Sign Up | Snap-Tweet",
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Snap-Tweet</h1>
          <p className="text-gray-600 mt-2">Create a new account</p>
        </div>

        <SignupForm />

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

