import axios from 'axios'
import { store } from '@/store'
import { logout } from '@/store/slices/authSlice'
import { toast } from 'sonner'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const token = state.auth.token
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (import.meta.env.DEV) {
      console.log('🚀 Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        headers: config.headers,
      })
    }

    return config
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error('❌ Request Error:', error)
    }
    
    // Show toast for network errors
    if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please try again.')
    } else if (!error.response) {
      toast.error('Network error. Please check your connection.')
    }
    
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log('✅ Response:', {
        status: response.status,
        data: response.data,
        url: response.config.url,
      })
    }
    return response
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error('❌ Response Error:', {
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      })
    }

    const { response } = error
    
    if (response) {
      switch (response.status) {
        case 401:
          // Unauthorized - logout and redirect
          store.dispatch(logout())
          toast.error('Session expired. Please login again.')
          setTimeout(() => {
            window.location.href = '/login'
          }, 1500)
          break
          
        case 403:
          // Forbidden
          toast.error('You do not have permission to perform this action.')
          break
          
        case 404:
          // Not found
          toast.error('Resource not found.')
          break
          
        case 422: {
          // Validation error
          const validationErrors = response.data?.errors
          if (validationErrors) {
            Object.values(validationErrors).forEach(err => {
              toast.error(Array.isArray(err) ? err[0] : err)
            })
          } else {
            toast.error(response.data?.message || 'Validation error occurred.')
          }
          break
        }
          
        case 500:
          // Server error
          toast.error('Server error. Please try again later.')
          break
          
        default:
          // Generic error
          toast.error(response.data?.message || 'An error occurred. Please try again.')
      }
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please try again.')
    } else if (!error.response) {
      toast.error('Network error. Please check your connection.')
    }

    return Promise.reject(error)
  }
)

export default axiosInstance