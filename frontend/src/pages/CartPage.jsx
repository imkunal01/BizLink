import { useContext, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ShopContext from '../context/ShopContext.jsx'
import { useAuth } from '../hooks/useAuth.js'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function CartPage() {
  const { cart, updateQty, removeFromCart } = useContext(ShopContext)
  const { role } = useAuth()
  const navigate = useNavigate()
  const isRetailer = role === 'retailer'
  
  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
    return { subtotal, total: subtotal }
  }, [cart])

  const empty = cart.length === 0

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navbar />
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#111827',
            margin: 0
          }}>
            Shopping Cart
          </h1>
          {isRetailer && (
            <span style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dbeafe',
              color: '#1e40af',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              B2B Wholesale Cart
            </span>
          )}
        </div>

        {empty ? (
          <div style={{
            backgroundColor: 'white',
            padding: '4rem 2rem',
            borderRadius: '0.75rem',
            textAlign: 'center',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#111827'
            }}>
              Your cart is empty
            </h2>
            <p style={{
              color: '#6b7280',
              marginBottom: '2rem'
            }}>
              Start adding products to your cart to continue shopping
            </p>
            <Link
              to="/products"
              style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                backgroundColor: '#2563eb',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.2s'
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
              Shop Products
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1.5rem'
          }} className="cart-layout">
            {/* Cart Items */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {cart.map(item => {
                const isBulkPrice = isRetailer && item.isBulkPrice
                const minQty = item.minBulkQty
                return (
                  <div
                    key={item.productId}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      padding: '1.5rem',
                      backgroundColor: 'white',
                      borderRadius: '0.75rem',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'contain',
                        background: '#f9fafb',
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb',
                        flexShrink: 0
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{
                        fontWeight: '600',
                        fontSize: '1.125rem',
                        marginBottom: '0.5rem',
                        color: '#111827'
                      }}>
                        {item.name}
                      </h3>
                      {isRetailer && (
                        <div style={{
                          fontSize: '0.875rem',
                          color: '#6b7280',
                          marginBottom: '0.5rem'
                        }}>
                          {item.regularPrice && item.regularPrice !== item.price && (
                            <span style={{
                              textDecoration: 'line-through',
                              marginRight: '0.5rem',
                              color: '#9ca3af'
                            }}>
                              ₹{item.regularPrice?.toLocaleString('en-IN')}
                            </span>
                          )}
                          {isBulkPrice ? (
                            <span style={{
                              color: '#10b981',
                              fontWeight: '600'
                            }}>
                              Bulk Price: ₹{item.price?.toLocaleString('en-IN')} ✓
                            </span>
                          ) : (
                            <span>Retailer Price: ₹{item.price?.toLocaleString('en-IN')}</span>
                          )}
                          {minQty && item.qty < minQty && (
                            <div style={{
                              color: '#f59e0b',
                              fontSize: '0.75rem',
                              marginTop: '0.25rem',
                              fontWeight: '500'
                            }}>
                              Min {minQty} for bulk pricing
                            </div>
                          )}
                        </div>
                      )}
                      {!isRetailer && (
                        <div style={{
                          color: '#2563eb',
                          fontWeight: '600',
                          fontSize: '1.125rem',
                          marginBottom: '0.5rem'
                        }}>
                          ₹{item.price?.toLocaleString('en-IN')}
                        </div>
                      )}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginTop: '1rem'
                      }}>
                        <label style={{
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: '#374151'
                        }}>
                          Qty:
                        </label>
                        <input
                          type="number"
                          min={isRetailer && minQty ? minQty : 1}
                          value={item.qty}
                          onChange={e => updateQty(item.productId, Math.max(isRetailer && minQty ? minQty : 1, Number(e.target.value) || 1))}
                          style={{
                            width: '80px',
                            padding: '0.5rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            textAlign: 'center'
                          }}
                        />
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: 'transparent',
                            color: '#ef4444',
                            border: '1px solid #ef4444',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            marginLeft: 'auto'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#fee2e2'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div style={{
                      textAlign: 'right',
                      minWidth: '120px'
                    }}>
                      <div style={{
                        fontWeight: '700',
                        fontSize: '1.25rem',
                        color: '#111827',
                        marginBottom: '0.25rem'
                      }}>
                        ₹{(item.price * item.qty).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </div>
                      {isBulkPrice && (
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#10b981',
                          fontWeight: '500'
                        }}>
                          Bulk pricing
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Order Summary */}
            <div style={{
              position: 'relative',
              height: 'fit-content'
            }} className="order-summary-sticky">
              <div style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
              }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  color: '#111827'
                }}>
                  Order Summary
                </h2>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  <span>Subtotal</span>
                  <span>₹{totals.subtotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                <div style={{
                  height: '1px',
                  backgroundColor: '#e5e7eb',
                  margin: '1rem 0'
                }} />
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#111827'
                }}>
                  <span>Total</span>
                  <span>₹{totals.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  disabled={empty}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1.5rem',
                    backgroundColor: empty ? '#9ca3af' : '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: empty ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!empty) {
                      e.currentTarget.style.backgroundColor = '#1e40af'
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!empty) {
                      e.currentTarget.style.backgroundColor = '#2563eb'
                      e.currentTarget.style.transform = 'scale(1)'
                    }
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
      
      <style>{`
        @media (min-width: 768px) {
          .cart-layout {
            grid-template-columns: 2fr 1fr !important;
            gap: 2rem !important;
          }
          .order-summary-sticky {
            position: sticky !important;
            top: 80px !important;
          }
        }
      `}</style>
    </div>
  )
}

