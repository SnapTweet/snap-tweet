"use client"

import type React from "react"

import { useState } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import type { Tweet } from "@/components/tweet-feed"

interface TweetFormProps {
  onTweetAdded: (tweet: Tweet) => void
}

export function TweetForm({ onTweetAdded }: TweetFormProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const maxLength = 280

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Tweet cannot be empty",
        variant: "destructive",
      })
      return
    }

    if (content.length > maxLength) {
      toast({
        title: "Error",
        description: `Tweet is too long (${content.length}/${maxLength})`,
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const newTweet = await api.postTweet(content)
      toast({
        title: "Success",
        description: "Tweet posted!",
      })
      setContent("")
      onTweetAdded(newTweet)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post tweet",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="resize-none mb-2"
            rows={3}
            maxLength={maxLength}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {content.length}/{maxLength}
            </span>
            <Button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="bg-blue-600 hover:bg-blue-700 rounded-full"
            >
              {isSubmitting ? "Posting..." : "Tweet"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

