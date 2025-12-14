import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getAllUsers, toggleBlockUser, updateUserRole, deleteUser } from '../../services/admin'

function formatDate(dateString) {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export default function UserManagement() {
  const { token } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    loadUsers()
  }, [token])

  async function loadUsers() {
    try {
      setLoading(true)
      const data = await getAllUsers(token)
      setUsers(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleBlock(userId) {
    try {
      await toggleBlockUser(userId, token)
      await loadUsers()
    } catch (err) {
      alert(err.message || 'Failed to update user')
    }
  }

  async function handleRoleChange(userId, newRole) {
    try {
      await updateUserRole(userId, newRole, token)
      await loadUsers()
    } catch (err) {
      alert(err.message || 'Failed to update role')
    }
  }

  async function handleDelete(userId) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteUser(userId, token)
        await loadUsers()
      } catch (err) {
        alert(err.message || 'Failed to delete user')
      }
    }
  }

  const filteredUsers = users.filter(user => {
    if (filter === 'customer' && user.role !== 'customer') return false
    if (filter === 'retailer' && user.role !== 'retailer') return false
    if (filter === 'admin' && user.role !== 'admin') return false
    if (filter === 'blocked' && !user.isBlocked) return false
    if (search) {
      const s = search.toLowerCase()
      const matchesName = user.name?.toLowerCase().includes(s)
      const matchesEmail = user.email?.toLowerCase().includes(s)
      if (!matchesName && !matchesEmail) return false
    }
    return true
  })

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>User Management</h1>
        <p style={{ color: '#6b7280' }}>Manage users, roles, and access control</p>
      </div>

      <div style={{ 
        backgroundColor: '#fff', 
        borderRadius: '12px', 
        padding: '20px', 
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
            />
          </div>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #d1d5db' }}
          >
            <option value="all">All Users</option>
            <option value="customer">Customers</option>
            <option value="retailer">Retailers</option>
            <option value="admin">Admins</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>User</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Role</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Joined</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {user.profilePhoto ? (
                        <img
                          src={user.profilePhoto}
                          alt={user.name}
                          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: '#e5e7eb',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#6b7280',
                          fontWeight: '600'
                        }}>
                          {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                      )}
                      <div>
                        <div style={{ fontWeight: '500' }}>{user.name}</div>
                        {user.phone && (
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{user.phone}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px', color: '#6b7280' }}>{user.email}</td>
                  <td style={{ padding: '12px' }}>
                    <select
                      value={user.role}
                      onChange={e => handleRoleChange(user._id, e.target.value)}
                      disabled={user.role === 'admin'} // Prevent changing admin role
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid #d1d5db',
                        backgroundColor: user.role === 'admin' ? '#f3f4f6' : '#fff',
                        cursor: user.role === 'admin' ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <option value="customer">Customer</option>
                      <option value="retailer">Retailer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 12px',
                      backgroundColor: user.isBlocked ? '#fee2e2' : '#d1fae5',
                      color: user.isBlocked ? '#991b1b' : '#166534',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {user.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: '#6b7280', fontSize: '14px' }}>
                    {formatDate(user.createdAt)}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleToggleBlock(user._id)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: user.isBlocked ? '#10b981' : '#f59e0b',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        {user.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        disabled={user.role === 'admin'}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: user.role === 'admin' ? '#9ca3af' : '#ef4444',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: user.role === 'admin' ? 'not-allowed' : 'pointer',
                          fontSize: '14px',
                          opacity: user.role === 'admin' ? 0.5 : 1
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
            No users found
          </div>
        )}
      </div>
    </div>
  )
}

