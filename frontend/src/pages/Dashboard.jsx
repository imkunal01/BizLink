import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import './Dashboard.css'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { listCategories } from '../services/categories'
import { listProducts } from '../services/products'

export default function Dashboard() {
  const { user, role } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  // We'll pass the current location to the login page so it knows where to return
  const from = location.pathname || '/'

  useEffect(() => {
    if (user && role === 'admin') {
      navigate('/admin', { replace: true })
    }
  }, [user, role, navigate])

  const [categories, setCategories] = useState([])
  const [trending, setTrending] = useState([])
  useEffect(() => {
    async function loadHome() {
      const cats = await listCategories().catch(() => [])
      setCategories(Array.isArray(cats) ? cats : [])
      const prods = await listProducts({ sort: '-createdAt', limit: 8 }).catch(() => ({ items: [] }))
      setTrending(prods.items || [])
    }
    loadHome()
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem 1rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          alignItems: 'center'
        }} className="hero-container">
          <div>
            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: '700',
              lineHeight: '1.2',
              marginBottom: '1rem',
              color: 'white'
            }}>
              Premium Electronics<br />At Your Doorstep
            </h1>
            <p style={{
              fontSize: '1rem',
              marginBottom: '1.5rem',
              opacity: 0.95,
              lineHeight: '1.6'
            }}>
              Discover the latest gadgets, secure payments, and fast delivery. Shop with confidence.
            </p>
            
            {/* Search Bar - Hero Focus */}
            <form onSubmit={(e) => {
              e.preventDefault()
              const query = e.target.search.value.trim()
              if (query) navigate(`/products?search=${encodeURIComponent(query)}`)
            }} style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }} className="search-container">
                <input
                  name="search"
                  type="text"
                  placeholder="Search for products..."
                  style={{
                    flex: 1,
                    padding: '0.875rem 1rem',
                    border: 'none',
                    outline: 'none',
                    fontSize: '16px',
                    color: '#111827',
                    minHeight: '44px'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '0.875rem 1.5rem',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    minHeight: '44px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e40af'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                >
                  Search
                </button>
              </div>
            </form>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link
                to="/products"
                style={{
                  padding: '0.875rem 1.5rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  fontSize: '1rem',
                  display: 'inline-block',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  minHeight: '44px',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1e40af'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              >
                Shop Products
              </Link>
              <Link
                to="/categories"
                style={{
                  padding: '0.875rem 1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  fontSize: '1rem',
                  display: 'inline-block',
                  transition: 'all 0.2s',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  minHeight: '44px',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
                }}
              >
                View Deals
              </Link>
            </div>
          </div>
          
          {/* Hero Image Placeholder */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            height: '400px'
          }} className="hero-image">
            <div style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <span style={{ fontSize: '4rem', opacity: 0.5 }}>📱</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{
        padding: '2rem 1rem',
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#111827'
        }}>
          Shop by Category
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '1rem'
        }}>
          {categories.map(c => (
            <Link
              key={c._id}
              to={`/products?category=${c._id}`}
              style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                textDecoration: 'none',
                border: '1px solid #e5e7eb',
                transition: 'all 0.2s',
                textAlign: 'center',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.borderColor = '#2563eb'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.borderColor = '#e5e7eb'
              }}
            >
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '0.75rem'
              }}>📦</div>
              <div style={{
                fontWeight: '600',
                color: '#111827',
                fontSize: '1rem'
              }}>
                {c.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products Section */}
      <section style={{
        padding: '2rem 1rem',
        maxWidth: '1280px',
        margin: '0 auto',
        backgroundColor: 'white'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#111827'
        }}>
          Trending Products
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '1rem'
        }}>
          {trending.map(p => (
            <Link
              key={p._id}
              to={`/product/${p._id}`}
              style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                padding: '1rem',
                textDecoration: 'none',
                border: '1px solid #e5e7eb',
                transition: 'all 0.2s',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
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
                color: '#111827',
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}>
                {p.name}
              </div>
              <div style={{
                color: '#2563eb',
                fontWeight: '700',
                fontSize: '1.25rem'
              }}>
                ₹{p.price?.toLocaleString('en-IN')}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
      
      <style>{`
        @media (min-width: 768px) {
          .hero-container {
            grid-template-columns: 1fr 1fr !important;
            gap: 3rem;
          }
          .hero-image {
            display: flex !important;
          }
          .search-container {
            flex-direction: row !important;
          }
          section {
            padding: 3rem 1.5rem !important;
          }
          h1 {
            font-size: 3rem !important;
          }
          h2 {
            font-size: 1.875rem !important;
            margin-bottom: 2rem !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-container {
            padding: 4rem 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}
