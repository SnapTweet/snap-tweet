import { WelcomeMessage } from "@/components/welcome-message"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="container flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-blue-600">
            Welcome
          </h1>
          <WelcomeMessage />
        </div>
      </div>
    </main>
  )
}

