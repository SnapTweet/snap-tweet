"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { TweetForm } from "@/components/tweet-form"
import { TweetCard } from "@/components/tweet-card"
import { api } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

export type Tweet = {
  id: string
  content: string
  userId: string
  userName: string
  createdAt: string
  likes: string[]
}

export function TweetFeed() {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchTweets()
  }, [])

  const fetchTweets = async () => {
    try {
      setIsLoading(true)
      const data = await api.fetchTweets()
      setTweets(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load tweets",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTweetAdded = (newTweet: Tweet) => {
    setTweets([newTweet, ...tweets])
  }

  const handleTweetDeleted = (tweetId: string) => {
    setTweets(tweets.filter((tweet) => tweet.id !== tweetId))
  }

  const handleLikeToggle = (tweetId: string, isLiked: boolean) => {
    setTweets(
      tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          const updatedLikes = isLiked ? [...tweet.likes, user?.id || ""] : tweet.likes.filter((id) => id !== user?.id)

          return { ...tweet, likes: updatedLikes }
        }
        return tweet
      }),
    )
  }

  return (
    <div className="space-y-6">
      {user && <TweetForm onTweetAdded={handleTweetAdded} />}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Tweets</h2>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-16 w-full mb-4" />
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        ) : tweets.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">No tweets yet. Be the first to tweet!</p>
            {!user && (
              <p className="mt-2 text-sm text-gray-500">
                <a href="/login" className="text-blue-600 hover:underline">
                  Login
                </a>{" "}
                to post a tweet.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {tweets.map((tweet) => (
              <TweetCard key={tweet.id} tweet={tweet} onDelete={handleTweetDeleted} onLikeToggle={handleLikeToggle} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

