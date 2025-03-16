"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Heart, Trash2 } from "lucide-react"
import type { Tweet } from "@/components/tweet-feed"

interface TweetCardProps {
  tweet: Tweet
  onDelete: (tweetId: string) => void
  onLikeToggle: (tweetId: string, isLiked: boolean) => void
}

export function TweetCard({ tweet, onDelete, onLikeToggle }: TweetCardProps) {
  const { user } = useAuth()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLiking, setIsLiking] = useState(false)
  const { toast } = useToast()

  const isOwner = user && tweet.userId === user.id
  const hasLiked = user && tweet.likes.includes(user.id)

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this tweet?")) {
      return
    }

    setIsDeleting(true)

    try {
      await api.deleteTweet(tweet.id)
      toast({
        title: "Success",
        description: "Tweet deleted",
      })
      onDelete(tweet.id)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete tweet",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleLikeToggle = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to like tweets",
        variant: "destructive",
      })
      return
    }

    setIsLiking(true)

    try {
      if (hasLiked) {
        await api.unlikeTweet(tweet.id)
      } else {
        await api.likeTweet(tweet.id)
      }

      onLikeToggle(tweet.id, !hasLiked)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive",
      })
    } finally {
      setIsLiking(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-800">{tweet.userName}</h3>
            <p className="text-sm text-gray-500">{formatDate(tweet.createdAt)}</p>
          </div>

          {isOwner && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-gray-400 hover:text-red-500 hover:bg-red-50"
              aria-label="Delete tweet"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          )}
        </div>

        <p className="my-3 text-gray-800">{tweet.content}</p>

        <div className="flex items-center mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLikeToggle}
            disabled={isLiking || !user}
            className={`flex items-center gap-1 ${
              hasLiked
                ? "text-red-500 hover:text-red-600 hover:bg-red-50"
                : "text-gray-500 hover:text-red-500 hover:bg-red-50"
            }`}
            aria-label={hasLiked ? "Unlike" : "Like"}
          >
            <Heart className="h-5 w-5" fill={hasLiked ? "currentColor" : "none"} />
            <span>{tweet.likes.length}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

