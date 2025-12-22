import { apiFetch } from './api'

export async function createOrder(payload, token) {
  return apiFetch('/api/orders', { method: 'POST', body: payload, token })
}

export async function getMyOrders(token) {
  const res = await apiFetch('/api/orders/my', { token })
  return res.data || []
}

export async function getOrderById(orderId, token) {
  const res = await apiFetch(`/api/orders/${orderId}`, { token })
  return res.data
}

export async function cancelOrder(orderId, token) {
  return apiFetch(`/api/orders/${orderId}/cancel`, { method: 'PUT', token })
}

