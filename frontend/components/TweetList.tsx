"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import TweetForm from "@/components/TweetForm"
import Tweet from "@/components/Tweet"
import api from "@/utils/api"
import { toast } from "react-toastify"

export default function TweetList() {
  const { user } = useAuth()
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTweets()
  }, [])

  const fetchTweets = async () => {
    try {
      setLoading(true)
      const data = await api.fetchTweets()
      setTweets(data)
    } catch (error) {
      toast.error("Failed to fetch tweets")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleTweetAdded = (newTweet) => {
    setTweets([newTweet, ...tweets])
  }

  const handleTweetDeleted = (tweetId) => {
    setTweets(tweets.filter((tweet) => tweet.id !== tweetId))
  }

  const handleLikeToggle = (tweetId, isLiked) => {
    setTweets(
      tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          const updatedLikes = isLiked ? [...tweet.likes, user.id] : tweet.likes.filter((id) => id !== user.id)

          return { ...tweet, likes: updatedLikes }
        }
        return tweet
      }),
    )
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading tweets...</p>
      </div>
    )
  }

  return (
    <div>
      {user && <TweetForm onTweetAdded={handleTweetAdded} />}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Tweets</h2>

        {tweets.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">No tweets yet. Be the first to tweet!</p>
          </div>
        ) : (
          tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} onDelete={handleTweetDeleted} onLikeToggle={handleLikeToggle} />
          ))
        )}
      </div>
    </div>
  )
}

