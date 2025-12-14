import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../services/api'
import { useAuth } from '../hooks/useAuth.js'
import { useContext } from 'react'
import ShopContext from '../context/ShopContext.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import QuantitySelector from '../components/QuantitySelector.jsx'

function RetailerProductCard({ product, onAddToCart }) {
  const [qty, setQty] = useState(product.min_bulk_qty || 1)
  const [adding, setAdding] = useState(false)
  const minQty = product.min_bulk_qty || 1

  const effectivePrice = qty >= minQty && product.price_bulk 
    ? product.price_bulk 
    : product.retailer_price || product.price

  const isBulkPrice = qty >= minQty && product.price_bulk

  function handleQtyChange(newQty) {
    const numQty = Math.max(minQty, Number(newQty) || minQty)
    setQty(Math.min(numQty, product.stock || 999))
  }

  async function handleAddToCart() {
    if (qty < minQty) {
      alert(`Minimum quantity of ${minQty} required for bulk pricing`)
      return
    }
    setAdding(true)
    try {
      await onAddToCart(product, qty)
    } finally {
      setAdding(false)
    }
  }

  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '16px',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      transition: 'box-shadow 0.2s',
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ 
        height: '200px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: '#f8fafc', 
        borderRadius: '8px',
        marginBottom: '12px'
      }}>
        {product.images?.[0]?.url ? (
          <img 
            src={product.images[0].url} 
            alt={product.name} 
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
          />
        ) : (
          <div style={{ color: '#94a3b8', fontSize: '14px' }}>No Image</div>
        )}
      </div>
      
      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#111827' }}>
        {product.name}
      </h3>

      {product.description && (
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', lineHeight: '1.5' }}>
          {product.description.length > 80 ? product.description.substring(0, 80) + '...' : product.description}
        </p>
      )}

      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>Retail Price:</span>
          <span style={{ fontSize: '14px', textDecoration: 'line-through', color: '#9ca3af' }}>
            ₹{product.price?.toLocaleString('en-IN')}
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>Retailer Price:</span>
          <span style={{ fontSize: '16px', fontWeight: '600', color: '#374151' }}>
            ₹{product.retailer_price?.toLocaleString('en-IN') || product.price?.toLocaleString('en-IN')}
          </span>
        </div>

        {product.price_bulk && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>Bulk Price:</span>
              <span style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                color: isBulkPrice ? '#10b981' : '#6b7280'
              }}>
                ₹{product.price_bulk?.toLocaleString('en-IN')}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#f59e0b', fontWeight: '500' }}>
              Min Qty: {minQty} units
            </div>
          </>
        )}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '14px', color: product.stock > 0 ? '#10b981' : '#ef4444', fontWeight: '500' }}>
          {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
        </div>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', display: 'block' }}>
          Quantity:
        </label>
        <QuantitySelector
          value={qty}
          onChange={handleQtyChange}
          min={minQty}
          max={product.stock || 999}
        />
        {qty >= minQty && product.price_bulk && (
          <div style={{ fontSize: '12px', color: '#10b981', marginTop: '4px' }}>
            ✓ Bulk pricing applied
          </div>
        )}
      </div>

      <div style={{ marginBottom: '12px', padding: '8px', background: '#f0fdf4', borderRadius: '6px' }}>
        <div style={{ fontSize: '12px', color: '#6b7280' }}>Subtotal:</div>
        <div style={{ fontSize: '20px', fontWeight: '700', color: '#111827' }}>
          ₹{(effectivePrice * qty).toLocaleString('en-IN')}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={adding || product.stock <= 0 || qty < minQty}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: product.stock > 0 && qty >= minQty ? '#3b82f6' : '#9ca3af',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: product.stock > 0 && qty >= minQty ? 'pointer' : 'not-allowed',
          opacity: adding ? 0.7 : 1
        }}
      >
        {adding ? 'Adding...' : qty < minQty ? `Min ${minQty} required` : 'Add to Cart'}
      </button>
    </div>
  )
}

export default function B2B() {
  const { token, user, role } = useAuth()
  const { addToCart } = useContext(ShopContext)
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check access control
    if (!token) {
      navigate('/login')
      return
    }
    if (role !== 'retailer') {
      navigate('/')
      return
    }
    loadProducts()
  }, [token, role, navigate])

  async function loadProducts() {
    setLoading(true)
    setError('')
    try {
      const res = await apiFetch('/api/retailer/products', { token })
      const data = res?.data?.data || []
      setItems(data)
    } catch (err) {
      setError(err.message || 'Failed to load products')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleAddToCart(product, qty) {
    try {
      await addToCart(product, qty)
      // Show success feedback
      alert(`Added ${qty} ${product.name} to cart`)
    } catch (err) {
      alert(err.message || 'Failed to add to cart')
      throw err
    }
  }

  // Access control UI
  if (role !== 'retailer') {
    return (
      <div>
        <Navbar />
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>Access Denied</h2>
          <p>This portal is only accessible to retailer accounts.</p>
          <button onClick={() => navigate('/')} style={{
            marginTop: '20px',
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Go to Home
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '40px 20px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>B2B Wholesale Portal</h1>
          <p style={{ color: '#666' }}>
            Welcome, {user?.name}! Shop with bulk pricing and special wholesale rates.
          </p>
        </div>

        {error && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#fee',
            color: '#c33',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading products...</div>
        ) : items.length === 0 ? (
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '60px 30px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>📦</div>
            <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#374151' }}>No products available</h2>
            <p style={{ color: '#6b7280' }}>Check back later for wholesale products</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '18px', color: '#6b7280' }}>
                {items.length} product{items.length !== 1 ? 's' : ''} available
              </div>
              <button
                onClick={() => navigate('/cart')}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#10b981',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                View Cart →
              </button>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {items.map(product => (
                <RetailerProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
