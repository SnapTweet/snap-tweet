"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { useAuth } from "@/context/AuthContext"
import api from "@/utils/api"

export default function Tweet({ tweet, onDelete, onLikeToggle }) {
  const { user } = useAuth()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLiking, setIsLiking] = useState(false)

  const isOwner = user && tweet.userId === user.id
  const hasLiked = user && tweet.likes.includes(user.id)

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this tweet?")) {
      return
    }

    setIsDeleting(true)

    try {
      await api.deleteTweet(tweet.id)
      toast.success("Tweet deleted")
      if (onDelete) {
        onDelete(tweet.id)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete tweet")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleLikeToggle = async () => {
    if (!user) {
      toast.error("You must be logged in to like tweets")
      return
    }

    setIsLiking(true)

    try {
      if (hasLiked) {
        await api.unlikeTweet(tweet.id)
      } else {
        await api.likeTweet(tweet.id)
      }

      if (onLikeToggle) {
        onLikeToggle(tweet.id, !hasLiked)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update like")
    } finally {
      setIsLiking(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-gray-800">{tweet.userName}</h3>
          <p className="text-sm text-gray-500">{formatDate(tweet.createdAt)}</p>
        </div>

        {isOwner && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-gray-400 hover:text-red-500"
            aria-label="Delete tweet"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>

      <p className="my-3 text-gray-800">{tweet.content}</p>

      <div className="flex items-center mt-2">
        <button
          onClick={handleLikeToggle}
          disabled={isLiking || !user}
          className={`flex items-center space-x-1 ${hasLiked ? "text-blue-600" : "text-gray-500"} hover:text-blue-600`}
          aria-label={hasLiked ? "Unlike" : "Like"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill={hasLiked ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span>{tweet.likes.length}</span>
        </button>
      </div>
    </div>
  )
}

