import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getOverview, getRevenueStats, getLowStock, getOrderStats } from '../../services/admin'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import { FaUsers, FaShoppingCart, FaBoxOpen, FaExclamationTriangle } from 'react-icons/fa'
import './AdminDashboard.css'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

function StatCard({ title, value, icon, color = '#3b82f6', loading }) {
  return (
    <div className="stat-card">
      <div className="stat-card-content">
        <div>
          <div className="stat-card-title">{title}</div>
          <div className="stat-card-value">
            {loading ? '...' : (typeof value === 'number' ? value.toLocaleString('en-IN') : value)}
          </div>
        </div>
        <div className="stat-card-icon" style={{ color: color, backgroundColor: `${color}20` }}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const { token } = useAuth()
  const [overview, setOverview] = useState(null)
  const [revenueData, setRevenueData] = useState([])
  const [lowStock, setLowStock] = useState([])
  const [orderStats, setOrderStats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [ovData, revData, stockData, ordData] = await Promise.all([
          getOverview(token),
          getRevenueStats(token),
          getLowStock(token),
          getOrderStats(token)
        ])
        setOverview(ovData?.data || {})
        setRevenueData(Array.isArray(revData) ? revData : [])
        setLowStock(Array.isArray(stockData) ? stockData : [])
        setOrderStats(Array.isArray(ordData) ? ordData : [])
      } catch (error) {
        console.error("Failed to load dashboard data", error)
      } finally {
        setLoading(false)
      }
    }
    if (token) fetchData()
  }, [token])

  // Format revenue data for chart
  const formattedRevenue = revenueData.map(item => ({
    date: new Date(item._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    amount: item.total
  }))

  // Format order stats for pie chart
  const pieData = orderStats.map(item => ({
    name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
    value: item.count
  }))

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back, Admin</p>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Revenue"
          value={`₹${overview?.totalRevenue?.toLocaleString('en-IN') || 0}`}
          icon={<div style={{ fontSize: '24px', fontWeight: 'bold' }}>₹</div>}
          color="#10b981"
          loading={loading}
        />
        <StatCard
          title="Total Orders"
          value={overview?.totalOrders || 0}
          icon={<FaShoppingCart />}
          color="#3b82f6"
          loading={loading}
        />
        <StatCard
          title="Total Users"
          value={overview?.totalUsers || 0}
          icon={<FaUsers />}
          color="#8b5cf6"
          loading={loading}
        />
        <StatCard
          title="Low Stock Items"
          value={overview?.lowStock || 0}
          icon={<FaExclamationTriangle />}
          color="#ef4444"
          loading={loading}
        />
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Revenue Analytics</h3>
          <div className="chart-wrapper">
            {loading ? (
              <div className="loading-chart">Loading...</div>
            ) : formattedRevenue.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formattedRevenue}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickFormatter={(value) => `₹${value/1000}k`}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-chart">No revenue data available</div>
            )}
          </div>
        </div>

        <div className="chart-card">
          <h3>Order Status Distribution</h3>
          <div className="chart-wrapper">
            {loading ? (
              <div className="loading-chart">Loading...</div>
            ) : pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-chart">No order data available</div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Low Stock Alert</h3>
        {loading ? (
          <div>Loading...</div>
        ) : lowStock.length > 0 ? (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStock.map(item => (
                  <tr key={item._id}>
                    <td className="product-cell">
                      {item.images?.[0]?.url && (
                        <img src={item.images[0].url} alt={item.name} />
                      )}
                      <span>{item.name}</span>
                    </td>
                    <td>₹{item.price.toLocaleString('en-IN')}</td>
                    <td className="stock-danger">{item.stock}</td>
                    <td><span className="badge badge-danger">Low Stock</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">All products are well stocked!</div>
        )}
      </div>
    </div>
  )
}

