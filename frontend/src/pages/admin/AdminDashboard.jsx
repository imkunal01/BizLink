import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getOverview, getRevenueStats, getLowStock } from '../../services/admin'
import './AdminDashboard.css'

function StatCard({ title, value, icon, color = '#3b82f6' }) {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      borderLeft: `4px solid ${color}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', fontWeight: '500' }}>
            {title}
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827' }}>
            {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
          </div>
        </div>
        <div style={{ fontSize: '32px', opacity: 0.2 }}>
          {icon}
        </div>
      </div>
    </div>
  )
}

function RevenueChart({ data }) {
  // Ensure data is an array
  const chartData = Array.isArray(data) ? data : []
  
  if (!chartData || chartData.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
        No revenue data available
      </div>
    )
  }

  const maxRevenue = Math.max(...chartData.map(d => d.total || 0))
  const chartHeight = 200

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: chartHeight, gap: '8px' }}>
        {chartData.slice(-7).map((item, idx) => {
          const height = (item.total / maxRevenue) * (chartHeight - 40)
          const date = new Date(item._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          return (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '100%',
                height: `${height}px`,
                backgroundColor: '#3b82f6',
                borderRadius: '4px 4px 0 0',
                minHeight: '4px',
                transition: 'all 0.3s'
              }} />
              <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '8px', textAlign: 'center' }}>
                {date}
              </div>
              <div style={{ fontSize: '12px', fontWeight: '600', marginTop: '4px' }}>
                ₹{(item.total / 1000).toFixed(1)}k
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StockChart({ lowStock, totalProducts }) {
  const totalProductsCount = totalProducts || 0
  const lowStockCount = lowStock?.length || 0
  const inStockCount = Math.max(0, totalProductsCount - lowStockCount)
  
  if (totalProductsCount === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
        No products available
      </div>
    )
  }

  const lowStockPercent = totalProductsCount > 0 ? (lowStockCount / totalProductsCount) * 100 : 0
  const inStockPercent = totalProductsCount > 0 ? (inStockCount / totalProductsCount) * 100 : 0

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ position: 'relative', width: '120px', height: '120px' }}>
          <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="20"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#10b981"
              strokeWidth="20"
              strokeDasharray={`${2 * Math.PI * 50 * (inStockPercent / 100)} ${2 * Math.PI * 50}`}
              strokeDashoffset="0"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="20"
              strokeDasharray={`${2 * Math.PI * 50 * (lowStockPercent / 100)} ${2 * Math.PI * 50}`}
              strokeDashoffset={`-${2 * Math.PI * 50 * (inStockPercent / 100)}`}
            />
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '20px',
            fontWeight: '700'
          }}>
            {totalProductsCount}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#10b981', borderRadius: '4px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600' }}>In Stock</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>{inStockCount} products</div>
            </div>
            <div style={{ fontWeight: '700' }}>{inStockPercent.toFixed(1)}%</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#f59e0b', borderRadius: '4px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600' }}>Low Stock</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>{lowStockCount} products</div>
            </div>
            <div style={{ fontWeight: '700' }}>{lowStockPercent.toFixed(1)}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const { token } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [revenueData, setRevenueData] = useState([])
  const [lowStock, setLowStock] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    loadDashboard()
  }, [token])

  async function loadDashboard() {
    try {
      setLoading(true)
      setError('')
      const [overview, revenue, lowStockData] = await Promise.all([
        getOverview(token),
        getRevenueStats(token),
        getLowStock(token)
      ])
      setStats(overview?.data)
      // Ensure revenue is an array
      setRevenueData(Array.isArray(revenue) ? revenue : (revenue?.data || []))
      // Ensure lowStock is an array
      setLowStock(Array.isArray(lowStockData) ? lowStockData : (lowStockData?.data || []))
    } catch (err) {
      setError(err.message || 'Failed to load dashboard')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        Loading dashboard...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>
        {error}
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Dashboard Overview</h1>
        <p style={{ color: '#6b7280' }}>Business performance and key metrics</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <StatCard
          title="Total Revenue"
          value={`₹${(stats?.totalRevenue || 0).toLocaleString('en-IN')}`}
          icon="💰"
          color="#10b981"
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          icon="📦"
          color="#3b82f6"
        />
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon="👥"
          color="#8b5cf6"
        />
        <StatCard
          title="Total Products"
          value={stats?.totalProducts || 0}
          icon="🛍️"
          color="#f59e0b"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Revenue Trend (Last 7 Days)</h3>
          </div>
          <RevenueChart data={revenueData} />
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Stock Distribution</h3>
          </div>
          <StockChart lowStock={lowStock} totalProducts={stats?.totalProducts} />
        </div>
      </div>

      {lowStock && lowStock.length > 0 && (
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b' }}>⚠️ Low Stock Alert</h3>
          </div>
          <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {lowStock.slice(0, 10).map(product => (
              <div key={product._id} style={{
                padding: '12px',
                backgroundColor: '#fef3c7',
                borderRadius: '8px',
                border: '1px solid #fcd34d'
              }}>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{product.name}</div>
                <div style={{ fontSize: '14px', color: '#92400e' }}>Stock: {product.stock}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

