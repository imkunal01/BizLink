import { createSlice } from '@reduxjs/toolkit'
import { THEME } from '@/lib/constants'
import { getTheme } from '@/lib/theme'

const initialState = {
  theme: getTheme(),
  isSidebarOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false
    },
  },
})

export const { setTheme, toggleSidebar, closeSidebar } = uiSlice.actions
export default uiSlice.reducer