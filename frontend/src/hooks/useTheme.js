import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '@/store/slices/uiSlice'
import { getTheme, setTheme as applyTheme } from '@/lib/theme'

export const useTheme = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui.theme)

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleThemeChange = () => {
      const currentTheme = getTheme()
      dispatch(setTheme(currentTheme))
      applyTheme(currentTheme)
    }

    systemTheme.addEventListener('change', handleThemeChange)
    handleThemeChange()

    return () => systemTheme.removeEventListener('change', handleThemeChange)
  }, [dispatch])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return { theme }
}