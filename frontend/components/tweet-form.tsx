"use client"

import type React from "react"

import { useState } from "react"
import { useTweets } from "@/context/tweet-context"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function TweetForm() {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { createTweet } = useTweets()
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim() || !user) return

    setIsSubmitting(true)
    try {
      await createTweet(content)
      setContent("")
    } catch (error) {
      console.error("Failed to create tweet:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) return null

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.username ? user.username.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="What's happening?"
                className="min-h-[80px] resize-none border-none focus-visible:ring-0 p-0"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={280}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center px-4 py-2 border-t">
          <div className="text-xs text-muted-foreground">{content.length}/280</div>
          <Button type="submit" disabled={!content.trim() || isSubmitting}>
            {isSubmitting ? "Posting..." : "Tweet"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

