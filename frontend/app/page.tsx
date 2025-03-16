import TweetFeed from "@/components/tweet-feed"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <TweetFeed />
      </div>
    </main>
  )
}

