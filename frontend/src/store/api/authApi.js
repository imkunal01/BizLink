import { baseApi } from './baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => {
        return {
          user: response.user,
          token: response.token,
        }
      },
      invalidatesTags: ['Auth'],
    }),
    
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      transformResponse: (response) => {
        return {
          user: response.user,
          token: response.token,
        }
      },
      invalidatesTags: ['Auth'],
    }),
    
    getProfile: builder.query({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
    
    logoutUser: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetProfileQuery,
  useLogoutUserMutation,
} = authApi