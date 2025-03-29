"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useTweets } from "@/context/tweet-context"
import Navbar from "@/components/navbar"
import TweetCard from "@/components/tweet-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import type { Tweet } from "@/types"

export default function ProfilePage() {
  const { user } = useAuth()
  const { getUserTweets } = useTweets()
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserTweets = async () => {
      if (user) {
        try {
          const userTweets = await getUserTweets(user.id)
          setTweets(userTweets)
        } catch (error) {
          console.error("Failed to fetch user tweets:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchUserTweets()
  }, [user, getUserTweets])

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.username}</CardTitle>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </CardHeader>
        </Card>

        <h2 className="text-xl font-bold mb-4">Your Tweets</h2>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
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
            {tweets.map((tweet) => (
              <TweetCard key={tweet._id} tweet={tweet} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            You haven&apos;t posted any tweets yet.
          </p>
        )}
      </div>
    </main>
  )
}
