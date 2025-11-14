import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useGetProfileQuery } from '@/store/api/authApi'
import { Loader2 } from 'lucide-react'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token } = useAuth()
  
  // Verify token validity by fetching user profile
  const { isLoading, error } = useGetProfileQuery(undefined, {
    skip: !token, // Skip if no token
  })

  // Show loading state while verifying token
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  // If not authenticated or token verification failed
  if (!isAuthenticated || error) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute