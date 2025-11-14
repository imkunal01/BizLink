import { useSelector } from 'react-redux'

export const useAuth = () => {
  const { user, token, role, isAuthenticated } = useSelector((state) => state.auth)
  
  return {
    user,
    token,
    role,
    isAuthenticated,
    isAdmin: role === 'admin',
    isRetailer: role === 'retailer',
    isCustomer: role === 'customer',
  }
}