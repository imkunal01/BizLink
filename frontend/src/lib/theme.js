import { THEME } from './constants'

export const getTheme = () => {
  if (typeof window === 'undefined') return THEME.LIGHT
  
  const savedTheme = localStorage.getItem('kripa_connect_theme')
  if (savedTheme) return savedTheme
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? THEME.DARK 
    : THEME.LIGHT
}

export const setTheme = (theme) => {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('kripa_connect_theme', theme)
  
  if (theme === THEME.SYSTEM) {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? THEME.DARK 
      : THEME.LIGHT
    document.documentElement.classList.toggle('dark', systemTheme === THEME.DARK)
  } else {
    document.documentElement.classList.toggle('dark', theme === THEME.DARK)
  }
}

export const toggleTheme = () => {
  const currentTheme = getTheme()
  const newTheme = currentTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
  setTheme(newTheme)
  return newTheme
}