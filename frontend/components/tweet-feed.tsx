"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useTweets } from "@/context/tweet-context"
import TweetForm from "@/components/tweet-form"
import TweetCard from "@/components/tweet-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { Tweet } from "@/types"
import { RefreshCw } from "lucide-react"

export default function TweetFeed() {
  const { user } = useAuth()
  const { tweets, fetchTweets, loading } = useTweets()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchTweets()
  }, [fetchTweets])

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchTweets()
    setRefreshing(false)
  }

  return (
    <div>
      {user ? (
        <TweetForm />
      ) : (
        <Card className="mb-6">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">
              Welcome to Snap-Tweet
            </h2>
            <p className="text-muted-foreground mb-4">
              Sign in to join the conversation and share your thoughts.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="w-24" asChild>
                <a href="/login">Sign in</a>
              </Button>
              <Button className="w-24" asChild>
                <a href="/signup">Sign up</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Latest Tweets</h2>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={handleRefresh}
          disabled={loading || refreshing}
        >
          <RefreshCw
            className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          />
          <span>Refresh</span>
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : tweets.length > 0 ? (
        <div className="space-y-4">
          {tweets.map((tweet: Tweet) => (
            <TweetCard key={tweet._id} tweet={tweet} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          No tweets yet. Be the first to tweet!
        </p>
      )}
    </div>
  )
}
