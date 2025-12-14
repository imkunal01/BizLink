import { useEffect, useState } from 'react'
import { listCategories } from '../services/categories'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function Categories() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function run() {
      setLoading(true)
      try {
        const data = await listCategories()
        setItems(Array.isArray(data) ? data : [])
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

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
          Categories
        </h1>
        <p style={{
          color: '#6b7280',
          marginBottom: '2rem',
          fontSize: '1rem'
        }}>
          Browse products by category
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
            <p style={{ color: '#6b7280' }}>Loading categories...</p>
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
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📂</div>
            <h2 style={{
              fontSize: '1.5rem',
              marginBottom: '0.5rem',
              color: '#111827',
              fontWeight: '600'
            }}>
              No categories found
            </h2>
            <p style={{ color: '#6b7280' }}>
              Categories will appear here when available
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '1rem'
          }} className="categories-grid">
            {items.map(c => (
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
                  fontSize: '3rem',
                  marginBottom: '0.75rem'
                }}>📦</div>
                <div style={{
                  fontWeight: '600',
                  color: '#111827',
                  fontSize: '1.125rem'
                }}>
                  {c.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
      
      <style>{`
        @media (min-width: 768px) {
          .categories-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  )
}
