import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminDashboard from './admin/AdminDashboard'
import ProductManagement from './admin/ProductManagement'
import OrderManagement from './admin/OrderManagement'
import UserManagement from './admin/UserManagement'
import ReviewModeration from './admin/ReviewModeration'
import './Admin.css'

export default function Admin() {
  const { user, role, token } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    // Check if user is admin
    if (!token) {
      navigate('/login')
      return
    }
    if (role !== 'admin') {
      navigate('/')
      return
    }

    // Set active tab from URL hash or default
    const hash = location.hash.replace('#', '') || 'dashboard'
    setActiveTab(hash)
  }, [token, role, navigate, location])

  function handleTabChange(tab) {
    setActiveTab(tab)
    navigate(`/admin#${tab}`, { replace: true })
  }

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard', component: AdminDashboard },
    { id: 'products', label: '🛍️ Products', component: ProductManagement },
    { id: 'orders', label: '📦 Orders', component: OrderManagement },
    { id: 'users', label: '👥 Users', component: UserManagement },
    { id: 'reviews', label: '⭐ Reviews', component: ReviewModeration },
  ]

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || AdminDashboard

  if (role !== 'admin') {
    return (
      <div>
        <Navbar />
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>Access Denied</h2>
          <p>Admin access required</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside style={{
          width: '240px',
          backgroundColor: '#1f2937',
          color: '#fff',
          padding: '24px 0',
          minHeight: 'calc(100vh - 80px)'
        }}>
          <div style={{ padding: '0 20px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Admin Panel</h2>
            <p style={{ fontSize: '14px', color: '#9ca3af' }}>Welcome, {user?.name}</p>
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                style={{
                  padding: '12px 20px',
                  textAlign: 'left',
                  backgroundColor: activeTab === tab.id ? '#3b82f6' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: activeTab === tab.id ? '600' : '400',
                  transition: 'all 0.2s',
                  borderLeft: activeTab === tab.id ? '4px solid #60a5fa' : '4px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.backgroundColor = '#374151'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '40px', backgroundColor: '#f3f4f6', overflowY: 'auto' }}>
          <ActiveComponent />
        </main>
      </div>

      <Footer />
    </div>
  )
}
