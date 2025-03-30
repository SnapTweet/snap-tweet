import axios from "axios"

const API_URL = "https://5201-2607-fea8-1ec2-1f50-f1f8-1d0c-6897-3105.ngrok-free.app/api"

const axiosInstance = axios.create({
  baseURL: API_URL,
})

// Add a request interceptor to add the auth token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosInstance

