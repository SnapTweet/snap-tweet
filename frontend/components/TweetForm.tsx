"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import api from "@/utils/api"

export default function TweetForm({ onTweetAdded }) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const maxLength = 280

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!content.trim()) {
      toast.error("Tweet cannot be empty")
      return
    }

    if (content.length > maxLength) {
      toast.error(`Tweet is too long (${content.length}/${maxLength})`)
      return
    }

    setIsSubmitting(true)

    try {
      const newTweet = await api.postTweet(content)
      toast.success("Tweet posted!")
      setContent("")
      if (onTweetAdded) {
        onTweetAdded(newTweet)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post tweet")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={3}
            maxLength={maxLength}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>
              {content.length}/{maxLength}
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? "Posting..." : "Tweet"}
          </button>
        </div>
      </form>
    </div>
  )
}

