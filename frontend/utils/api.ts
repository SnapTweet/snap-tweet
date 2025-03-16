import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to add auth token to requests
if (typeof window !== "undefined") {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error),
  )
}

const api = {
  // Auth endpoints
  signupUser: async (name, email, password) => {
    const response = await axiosInstance.post("/auth/signup", {
      name,
      email,
      password,
    })
    return response.data
  },

  loginUser: async (email, password) => {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    })
    return response.data
  },

  // Tweet endpoints
  fetchTweets: async () => {
    const response = await axiosInstance.get("/tweets")
    return response.data
  },

  postTweet: async (content) => {
    const response = await axiosInstance.post("/tweets", { content })
    return response.data
  },

  deleteTweet: async (tweetId) => {
    const response = await axiosInstance.delete(`/tweets/${tweetId}`)
    return response.data
  },

  // Like endpoints
  likeTweet: async (tweetId) => {
    const response = await axiosInstance.post(`/tweets/${tweetId}/like`)
    return response.data
  },

  unlikeTweet: async (tweetId) => {
    const response = await axiosInstance.delete(`/tweets/${tweetId}/like`)
    return response.data
  },
}

export default api

