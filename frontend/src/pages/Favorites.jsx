import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ShopContext from '../context/ShopContext.jsx'
import AuthContext from '../context/AuthContext.jsx'
import { listFavorites } from '../services/favorites'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function Favorites() {
  const { token } = useContext(AuthContext)
  const { addToCart, toggleFavorite, favorites } = useContext(ShopContext)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    ;(async () => {
      setLoading(true)
      try {
        if (token) {
          const data = await listFavorites(token)
          if (active) setItems(data)
        } else {
          setItems([])
        }
      } finally {
        if (active) setLoading(false)
      }
    })()
    return () => { active = false }
  }, [token, favorites])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navbar />
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '2rem 1.5rem'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '0.5rem',
          color: '#111827'
        }}>
          My Favorites
        </h1>
        <p style={{
          color: '#6b7280',
          marginBottom: '2rem',
          fontSize: '1rem'
        }}>
          Your saved products for later purchase
        </p>

        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            <p style={{ color: '#6b7280' }}>Loading favorites...</p>
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
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❤️</div>
            <h2 style={{
              fontSize: '1.5rem',
              marginBottom: '0.5rem',
              color: '#111827',
              fontWeight: '600'
            }}>
              No favorites yet
            </h2>
            <p style={{
              color: '#6b7280',
              marginBottom: '2rem'
            }}>
              Start adding products to your favorites to see them here
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
              Browse Products
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1rem'
          }} className="favorites-grid">
            {items.map(p => (
              <div
                key={p._id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                }}
              >
                <Link
                  to={`/product/${p._id}`}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <div style={{
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f9fafb',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem',
                    overflow: 'hidden'
                  }}>
                    {p.images?.[0]?.url ? (
                      <img
                        src={p.images[0].url}
                        alt={p.name}
                        style={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: '3rem', opacity: 0.3 }}>📦</span>
                    )}
                  </div>
                  <div style={{
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#111827',
                    fontSize: '1rem'
                  }}>
                    {p.name}
                  </div>
                  <div style={{
                    color: '#2563eb',
                    fontWeight: '700',
                    fontSize: '1.25rem',
                    marginBottom: '1rem'
                  }}>
                    ₹{p.price?.toLocaleString('en-IN')}
                  </div>
                </Link>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  <button
                    onClick={() => addToCart(p, 1)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1e40af'
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#2563eb'
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => toggleFavorite(p._id)}
                    style={{
                      padding: '0.75rem',
                      backgroundColor: '#fee2e2',
                      color: '#991b1b',
                      border: '1px solid #fecaca',
                      borderRadius: '0.5rem',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#fecaca'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#fee2e2'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      
      <style>{`
        @media (min-width: 640px) {
          .favorites-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
            gap: 1.25rem !important;
          }
        }
        @media (min-width: 1024px) {
          .favorites-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)) !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  )
}
