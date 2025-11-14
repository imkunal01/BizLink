import { ROLES } from '@/lib/constants'

export const hasRole = (userRole, requiredRole) => {
  if (!userRole) return false
  
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole)
  }
  
  return userRole === requiredRole
}

export const isAdmin = (userRole) => userRole === ROLES.ADMIN
export const isRetailer = (userRole) => userRole === ROLES.RETAILER
export const isCustomer = (userRole) => userRole === ROLES.CUSTOMER

export const getRolePermissions = (role) => {
  const permissions = {
    [ROLES.ADMIN]: ['all'],
    [ROLES.RETAILER]: ['view_products', 'place_orders', 'view_retailer_dashboard'],
    [ROLES.CUSTOMER]: ['view_products', 'place_orders', 'view_cart'],
  }
  
  return permissions[role] || []
}

export const canAccess = (userRole, permission) => {
  const permissions = getRolePermissions(userRole)
  return permissions.includes('all') || permissions.includes(permission)
}

export const getDashboardRoute = (userRole) => {
  switch (userRole) {
    case ROLES.ADMIN:
      return '/admin/dashboard'
    case ROLES.RETAILER:
      return '/retailer/dashboard'
    case ROLES.CUSTOMER:
      return '/'
    default:
      return '/'
  }
}