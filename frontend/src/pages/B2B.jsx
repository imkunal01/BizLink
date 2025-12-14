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
      border: '1px solid #e5e7eb',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.2s',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      e.currentTarget.style.transform = 'translateY(-4px)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      e.currentTarget.style.transform = 'translateY(0)'
    }}
    >
      <div style={{ 
        height: '220px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: '#f9fafb', 
        borderRadius: '0.5rem',
        marginBottom: '1rem',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        {product.images?.[0]?.url ? (
          <img 
            src={product.images[0].url} 
            alt={product.name} 
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
          />
        ) : (
          <div style={{ color: '#9ca3af', fontSize: '3rem' }}>📦</div>
        )}
      </div>
      
      <h3 style={{
        fontSize: '1.125rem',
        fontWeight: '600',
        marginBottom: '0.75rem',
        color: '#111827',
        lineHeight: '1.4'
      }}>
        {product.name}
      </h3>

      {product.description && (
        <p style={{
          fontSize: '0.875rem',
          color: '#6b7280',
          marginBottom: '1rem',
          lineHeight: '1.5'
        }}>
          {product.description.length > 100 ? product.description.substring(0, 100) + '...' : product.description}
        </p>
      )}

      {/* Pricing Section */}
      <div style={{
        marginBottom: '1rem',
        padding: '1rem',
        backgroundColor: '#f9fafb',
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Retail Price:</span>
            <span style={{
              fontSize: '0.875rem',
              textDecoration: 'line-through',
              color: '#9ca3af'
            }}>
              ₹{product.price?.toLocaleString('en-IN')}
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Retailer Price:</span>
            <span style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#374151'
            }}>
              ₹{product.retailer_price?.toLocaleString('en-IN') || product.price?.toLocaleString('en-IN')}
            </span>
          </div>

          {product.price_bulk && (
            <>
              <div style={{
                height: '1px',
                backgroundColor: '#e5e7eb',
                margin: '0.5rem 0'
              }} />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#10b981',
                  fontWeight: '600'
                }}>
                  Bulk Price:
                </span>
                <span style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '700', 
                  color: isBulkPrice ? '#10b981' : '#6b7280'
                }}>
                  ₹{product.price_bulk?.toLocaleString('en-IN')}
                </span>
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#f59e0b',
                fontWeight: '500',
                textAlign: 'right'
              }}>
                Min Qty: {minQty} units
              </div>
            </>
          )}
        </div>
      </div>

      {/* Stock Status */}
      <div style={{
        marginBottom: '1rem',
        padding: '0.5rem 0.75rem',
        backgroundColor: product.stock > 0 ? '#d1fae5' : '#fee2e2',
        color: product.stock > 0 ? '#065f46' : '#991b1b',
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
        fontWeight: '500',
        textAlign: 'center'
      }}>
        {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
      </div>

      {/* Quantity Selector */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{
          fontSize: '0.875rem',
          fontWeight: '500',
          marginBottom: '0.5rem',
          display: 'block',
          color: '#374151'
        }}>
          Quantity:
        </label>
        <QuantitySelector
          value={qty}
          onChange={handleQtyChange}
          min={minQty}
          max={product.stock || 999}
        />
        {qty >= minQty && product.price_bulk && (
          <div style={{
            fontSize: '0.75rem',
            color: '#10b981',
            marginTop: '0.5rem',
            fontWeight: '500'
          }}>
            ✓ Bulk pricing applied
          </div>
        )}
      </div>

      {/* Subtotal */}
      <div style={{
        marginBottom: '1rem',
        padding: '1rem',
        background: '#f0fdf4',
        borderRadius: '0.5rem',
        border: '1px solid #bbf7d0'
      }}>
        <div style={{
          fontSize: '0.75rem',
          color: '#166534',
          marginBottom: '0.25rem',
          fontWeight: '500'
        }}>
          Subtotal:
        </div>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#166534'
        }}>
          ₹{(effectivePrice * qty).toLocaleString('en-IN')}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={adding || product.stock <= 0 || qty < minQty}
        style={{
          width: '100%',
          padding: '0.875rem',
          backgroundColor: (product.stock > 0 && qty >= minQty) ? '#2563eb' : '#9ca3af',
          color: '#fff',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: (product.stock > 0 && qty >= minQty) ? 'pointer' : 'not-allowed',
          opacity: adding ? 0.7 : 1,
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          if (product.stock > 0 && qty >= minQty && !adding) {
            e.currentTarget.style.backgroundColor = '#1e40af'
            e.currentTarget.style.transform = 'scale(1.02)'
          }
        }}
        onMouseLeave={(e) => {
          if (product.stock > 0 && qty >= minQty) {
            e.currentTarget.style.backgroundColor = '#2563eb'
            e.currentTarget.style.transform = 'scale(1)'
          }
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '1rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {/* Header Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                color: '#111827'
              }}>
                B2B Wholesale Portal
              </h1>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem'
              }}>
                Welcome, {user?.name}! Shop with bulk pricing and special wholesale rates.
              </p>
            </div>
            <button
              onClick={() => navigate('/cart')}
              style={{
                padding: '0.875rem 1.5rem',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1e40af'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              View Cart →
            </button>
          </div>
        </div>

        {error && (
          <div style={{
            padding: '1rem 1.25rem',
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            <p style={{ color: '#6b7280' }}>Loading products...</p>
          </div>
        ) : items.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '4rem 2rem',
            textAlign: 'center',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
            <h2 style={{
              fontSize: '1.5rem',
              marginBottom: '0.5rem',
              color: '#111827',
              fontWeight: '600'
            }}>
              No products available
            </h2>
            <p style={{ color: '#6b7280' }}>Check back later for wholesale products</p>
          </div>
        ) : (
          <>
            <div style={{
              marginBottom: '1.5rem',
              padding: '1rem 1.5rem',
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{
                fontSize: '1rem',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                {items.length} product{items.length !== 1 ? 's' : ''} available
              </div>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem'
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
      
      <style>{`
        @media (min-width: 768px) {
          main {
            padding: 2rem 1.5rem !important;
          }
          h1 {
            font-size: 2rem !important;
          }
          p {
            font-size: 1rem !important;
          }
          .b2b-grid {
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)) !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  )
}
