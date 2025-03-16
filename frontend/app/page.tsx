import Header from "@/components/Header"
import { TweetFeed } from "@/components/tweet-feed"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-6">
        <TweetFeed />
      </main>
    </div>
  )
}
