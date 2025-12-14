import { apiFetch } from './api'

// Analytics & Stats
export async function getOverview(token) {
  const res = await apiFetch('/api/analytics/overview', { token })
  return res.data
}

export async function getRevenueStats(token) {
  const res = await apiFetch('/api/analytics/revenue', { token })
  // Backend returns { success: true, data: [...] }
  // apiFetch returns { ok: true, data: { success: true, data: [...] } }
  return (res.data && res.data.data) || (Array.isArray(res.data) ? res.data : [])
}

export async function getOrderStats(token) {
  const res = await apiFetch('/api/analytics/orders', { token })
  return res.data || []
}

export async function getTopProducts(token) {
  const res = await apiFetch('/api/analytics/top-products', { token })
  return res.data || []
}

export async function getLowStock(token) {
  const res = await apiFetch('/api/analytics/low-stock', { token })
  // Backend returns { success: true, data: [...] }
  // apiFetch returns { ok: true, data: { success: true, data: [...] } }
  return (res.data && res.data.data) || (Array.isArray(res.data) ? res.data : [])
}

// User Management
export async function getAllUsers(token) {
  const res = await apiFetch('/api/admin/users', { token })
  return res.data?.data || []
}

export async function toggleBlockUser(userId, token) {
  const res = await apiFetch(`/api/admin/users/block/${userId}`, { method: 'PUT', token })
  return res.data
}

export async function updateUserRole(userId, role, token) {
  const res = await apiFetch(`/api/admin/users/role/${userId}`, { method: 'PUT', body: { role }, token })
  return res.data
}

export async function deleteUser(userId, token) {
  const res = await apiFetch(`/api/admin/users/${userId}`, { method: 'DELETE', token })
  return res.data
}

// Order Management
export async function getAllOrdersAdmin(token) {
  const res = await apiFetch('/api/admin/orders', { token })
  return res.data?.data || []
}

export async function getOrderByIdAdmin(orderId, token) {
  const res = await apiFetch(`/api/admin/orders/${orderId}`, { token })
  return res.data?.data ? res.data : { data: res.data }
}

export async function updateOrderStatus(orderId, status, token) {
  const res = await apiFetch(`/api/admin/orders/status/${orderId}`, { method: 'PUT', body: { status }, token })
  return res.data
}

export async function deleteOrderAdmin(orderId, token) {
  const res = await apiFetch(`/api/admin/orders/${orderId}`, { method: 'DELETE', token })
  return res.data
}

// Product Management (using existing product routes with admin auth)
export async function createProductAdmin(productData, images, token) {
  const formData = new FormData()
  
  Object.keys(productData).forEach(key => {
    if (productData[key] !== undefined && productData[key] !== null) {
      if (Array.isArray(productData[key])) {
        formData.append(key, JSON.stringify(productData[key]))
      } else {
        formData.append(key, productData[key])
      }
    }
  })
  
  if (images && images.length > 0) {
    images.forEach(file => {
      formData.append('images', file)
    })
  }
  
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
  const res = await fetch(`${BASE_URL}/api/products`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    credentials: 'include',
    body: formData,
  })
  
  if (!res.ok) {
    const data = await res.json().catch(() => ({ message: 'Failed to create product' }))
    const error = new Error(data.message || 'Failed to create product')
    error.status = res.status
    throw error
  }
  
  return { ok: true, data: await res.json() }
}

export async function updateProductAdmin(productId, productData, images, token) {
  const formData = new FormData()
  
  Object.keys(productData).forEach(key => {
    if (productData[key] !== undefined && productData[key] !== null) {
      if (Array.isArray(productData[key])) {
        formData.append(key, JSON.stringify(productData[key]))
      } else {
        formData.append(key, productData[key])
      }
    }
  })
  
  if (images && images.length > 0) {
    images.forEach(file => {
      formData.append('images', file)
    })
  }
  
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
  const res = await fetch(`${BASE_URL}/api/products/${productId}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    credentials: 'include',
    body: formData,
  })
  
  if (!res.ok) {
    const data = await res.json().catch(() => ({ message: 'Failed to update product' }))
    const error = new Error(data.message || 'Failed to update product')
    error.status = res.status
    throw error
  }
  
  return { ok: true, data: await res.json() }
}

export async function deleteProductAdmin(productId, token) {
  const res = await apiFetch(`/api/products/${productId}`, { method: 'DELETE', token })
  return res.data
}

export async function removeProductImage(productId, publicId, token) {
  const res = await apiFetch(`/api/products/${productId}/image/${publicId}`, { method: 'DELETE', token })
  return res.data
}

// Review Management
export async function getAllReviews(token) {
  const res = await apiFetch('/api/reviews/all', { token })
  return res.data?.data || []
}

export async function deleteReview(reviewId, token) {
  const res = await apiFetch(`/api/reviews/${reviewId}`, { method: 'DELETE', token })
  return res.data
}

