import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '@/store/api/authApi'

const initialState = {
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.role = action.payload.user.role
      state.isAuthenticated = true
      state.error = null
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.role = null
      state.isAuthenticated = false
      state.error = null
    },
    setAuthError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    resetAuthState: (state) => {
      state.loading = false
      state.error = null
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addMatcher(
        authApi.endpoints.loginUser.matchPending,
        (state) => {
          state.loading = true
          state.error = null
        }
      )
      .addMatcher(
        authApi.endpoints.loginUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload.user
          state.token = action.payload.token
          state.role = action.payload.user.role
          state.isAuthenticated = true
          state.loading = false
          state.error = null
        }
      )
      .addMatcher(
        authApi.endpoints.loginUser.matchRejected,
        (state, action) => {
          state.loading = false
          state.error = action.error?.data?.message || 'Login failed'
        }
      )
      // Register
      .addMatcher(
        authApi.endpoints.registerUser.matchPending,
        (state) => {
          state.loading = true
          state.error = null
        }
      )
      .addMatcher(
        authApi.endpoints.registerUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload.user
          state.token = action.payload.token
          state.role = action.payload.user.role
          state.isAuthenticated = true
          state.loading = false
          state.error = null
        }
      )
      .addMatcher(
        authApi.endpoints.registerUser.matchRejected,
        (state, action) => {
          state.loading = false
          state.error = action.error?.data?.message || 'Registration failed'
        }
      )
  },
})

export const { setCredentials, logout, setAuthError, resetAuthState, updateUser } = authSlice.actions
export default authSlice.reducer