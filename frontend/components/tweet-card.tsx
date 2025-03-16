"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { useAuth } from "@/context/auth-context"
import { useTweets } from "@/context/tweet-context"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, Trash2 } from "lucide-react"
import type { Tweet } from "@/types"

interface TweetCardProps {
  tweet: Tweet
}

export default function TweetCard({ tweet }: TweetCardProps) {
  const { user } = useAuth()
  const { likeTweet, unlikeTweet, deleteTweet } = useTweets()
  const [isLiked, setIsLiked] = useState(
    tweet.likes?.some((like) => like.userId === user?.id) || false
  )
  const [likeCount, setLikeCount] = useState(tweet.likes?.length || 0)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        await unlikeTweet(tweet._id)
        setLikeCount((prev) => prev - 1)
      } else {
        await likeTweet(tweet._id)
        setLikeCount((prev) => prev + 1)
      }
      setIsLiked(!isLiked)
    } catch (error) {
      console.error("Failed to toggle like:", error)
    }
  }

  const handleDelete = async () => {
    if (!user || user.id !== tweet.userId) return

    setIsDeleting(true)
    try {
      await deleteTweet(tweet._id)
    } catch (error) {
      console.error("Failed to delete tweet:", error)
      setIsDeleting(false)
    }
  }

  const formattedDate = tweet.createdAt
    ? formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true })
    : "recently"

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary">
              {tweet.user?.username
                ? tweet.user.username.charAt(0).toUpperCase()
                : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="font-medium">
                  {tweet.user?.username || "Unknown User"}
                </p>
                <span className="text-xs text-muted-foreground">
                  {formattedDate}
                </span>
              </div>
              {user && user.id === tweet.userId && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              )}
            </div>
            <p className="text-sm">{tweet.content}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-2 border-t">
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-1 text-xs ${
            isLiked ? "text-red-500" : "text-muted-foreground"
          }`}
          onClick={handleLikeToggle}
          disabled={!user}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          <span>{likeCount}</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
