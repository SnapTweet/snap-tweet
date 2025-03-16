// Mock data for preview
const mockTweets = [
  {
    id: "1",
    content: "Just launched my new project on Vercel! Check it out and let me know what you think.",
    userId: "1",
    userName: "Sarah Johnson",
    createdAt: new Date().toISOString(),
    likes: ["2", "3"],
  },
  {
    id: "2",
    content: "Learning Next.js has been a game changer for my frontend development skills. The App Router is amazing!",
    userId: "2",
    userName: "Alex Chen",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    likes: ["1"],
  },
  {
    id: "3",
    content: "Just deployed my portfolio using Vercel. The process was incredibly smooth!",
    userId: "3",
    userName: "Miguel Rodriguez",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    likes: [],
  },
]

// Helper to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// API client
export const api = {
  // Auth endpoints
  signupUser: async (name: string, email: string, password: string) => {
    await delay(800)

    // For preview, return mock data
    return {
      token: "mock-jwt-token",
      user: {
        id: "1",
        name,
        email,
      },
    }
  },

  loginUser: async (email: string, password: string) => {
    await delay(800)

    // For preview, return mock data
    return {
      token: "mock-jwt-token",
      user: {
        id: "1",
        name: "Demo User",
        email,
      },
    }
  },

  // Tweet endpoints
  fetchTweets: async () => {
    await delay(1000)
    return [...mockTweets]
  },

  postTweet: async (content: string) => {
    await delay(800)

    const newTweet = {
      id: Date.now().toString(),
      content,
      userId: "1",
      userName: "Demo User",
      createdAt: new Date().toISOString(),
      likes: [],
    }

    mockTweets.unshift(newTweet)
    return newTweet
  },

  deleteTweet: async (tweetId: string) => {
    await delay(500)

    const index = mockTweets.findIndex((t) => t.id === tweetId)
    if (index !== -1) {
      mockTweets.splice(index, 1)
    }

    return { success: true }
  },

  // Like endpoints
  likeTweet: async (tweetId: string) => {
    await delay(300)

    const tweet = mockTweets.find((t) => t.id === tweetId)
    if (tweet && !tweet.likes.includes("1")) {
      tweet.likes.push("1")
    }

    return { success: true }
  },

  unlikeTweet: async (tweetId: string) => {
    await delay(300)

    const tweet = mockTweets.find((t) => t.id === tweetId)
    if (tweet) {
      tweet.likes = tweet.likes.filter((id) => id !== "1")
    }

    return { success: true }
  },
}

// In a real app, you would use Axios or fetch to make actual API calls
// Example with Axios:
/*
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token to requests
if (typeof window !== 'undefined') {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

export const api = {
  signupUser: async (name, email, password) => {
    const response = await axiosInstance.post('/auth/signup', {
      name,
      email,
      password,
    });
    return response.data;
  },
  
  // ... other API methods
  loginUser: async (email, password) => {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  fetchTweets: async () => {
    const response = await axiosInstance.get('/tweets');
    return response.data;
  },

  postTweet: async (content) => {
    const response = await axiosInstance.post('/tweets', { content });
    return response.data;
  },

  deleteTweet: async (tweetId) => {
    const response = await axiosInstance.delete(`/tweets/${tweetId}`);
    return response.data;
  },

  likeTweet: async (tweetId) => {
    const response = await axiosInstance.post(`/tweets/${tweetId}/like`);
    return response.data;
  },

  unlikeTweet: async (tweetId) => {
    const response = await axiosInstance.delete(`/tweets/${tweetId}/like`);
    return response.data;
  },
};
*/

