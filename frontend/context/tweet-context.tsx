"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import axios from "axios"
import { useAuth } from "./auth-context"
import type { Tweet } from "@/types"

interface TweetContextType {
  tweets: Tweet[]
  loading: boolean
  fetchTweets: () => Promise<void>
  createTweet: (content: string) => Promise<void>
  deleteTweet: (id: string) => Promise<void>
  likeTweet: (id: string) => Promise<void>
  unlikeTweet: (id: string) => Promise<void>
  getUserTweets: (userId: string) => Promise<Tweet[]>
}

const TweetContext = createContext<TweetContextType | undefined>(undefined)

export function TweetProvider({ children }: { children: ReactNode }) {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  // Update the API URL
  const API_URL = "http://localhost:5000/api"

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token")
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  }

  const fetchTweets = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/tweets`)
      setTweets(response.data)
    } catch (error) {
      console.error("Failed to fetch tweets:", error)
    } finally {
      setLoading(false)
    }
  }, [API_URL])

  const createTweet = async (content: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/tweets`,
        { content },
        getAuthHeaders()
      )
      setTweets((prev) => [response.data, ...prev])
      return response.data
    } catch (error) {
      console.error("Failed to create tweet:", error)
      throw error
    }
  }

  const deleteTweet = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/tweets/${id}`, getAuthHeaders())
      setTweets((prev) => prev.filter((tweet) => tweet._id !== id))
    } catch (error) {
      console.error("Failed to delete tweet:", error)
      throw error
    }
  }

  const likeTweet = async (id: string) => {
    if (!user) return

    try {
      await axios.post(`${API_URL}/tweets/${id}/like`, {}, getAuthHeaders())

      // Update local state
      setTweets((prev) =>
        prev.map((tweet) => {
          if (tweet._id === id) {
            const updatedLikes = [...(tweet.likes || []), { userId: user.id }]
            return { ...tweet, likes: updatedLikes }
          }
          return tweet
        })
      )
    } catch (error) {
      console.error("Failed to like tweet:", error)
      throw error
    }
  }

  const unlikeTweet = async (id: string) => {
    if (!user) return

    try {
      await axios.delete(`${API_URL}/tweets/${id}/like`, getAuthHeaders())

      // Update local state
      setTweets((prev) =>
        prev.map((tweet) => {
          if (tweet._id === id) {
            const updatedLikes = (tweet.likes || []).filter(
              (like) => like.userId !== user.id
            )
            return { ...tweet, likes: updatedLikes }
          }
          return tweet
        })
      )
    } catch (error) {
      console.error("Failed to unlike tweet:", error)
      throw error
    }
  }

  // Update the getUserTweets function since there might not be a specific endpoint
  const getUserTweets = async (userId: string): Promise<Tweet[]> => {
    try {
      // Since there's no specific endpoint for user tweets, we'll fetch all tweets
      // and filter them on the client side
      const response = await axios.get(`${API_URL}/tweets`)

      // Ensure we're returning an array
      let allTweets: Tweet[] = []
      if (Array.isArray(response.data)) {
        allTweets = response.data
      } else if (
        response.data &&
        typeof response.data === "object" &&
        Array.isArray(response.data.tweets)
      ) {
        allTweets = response.data.tweets
      } else {
        console.error("Unexpected API response format:", response.data)
        return []
      }

      // Filter tweets by user ID
      return allTweets.filter((tweet) => tweet.userId === userId)
    } catch (error) {
      console.error("Failed to fetch user tweets:", error)
      return []
    }
  }

  return (
    <TweetContext.Provider
      value={{
        tweets,
        loading,
        fetchTweets,
        createTweet,
        deleteTweet,
        likeTweet,
        unlikeTweet,
        getUserTweets,
      }}
    >
      {children}
    </TweetContext.Provider>
  )
}

export function useTweets() {
  const context = useContext(TweetContext)
  if (context === undefined) {
    throw new Error("useTweets must be used within a TweetProvider")
  }
  return context
}
