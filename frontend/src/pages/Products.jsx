import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { listProducts } from '../services/products'
import FiltersSidebar from '../components/FiltersSidebar.jsx'
import SearchBar from '../components/SearchBar.jsx'
import SortBar from '../components/SortBar.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function Products() {
  const [params, setParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const search = params.get('search') || ''
  const category = params.get('category') || ''
  const minPrice = params.get('minPrice') || ''
  const maxPrice = params.get('maxPrice') || ''
  const sort = params.get('sort') || ''
  const brand = params.get('brand') || ''
  const availability = params.get('availability') || ''

  useEffect(() => {
    const t = setTimeout(() => {
      ;(async () => {
        setLoading(true)
        try {
          const data = await listProducts({ search, category, minPrice, maxPrice, sort, brand, availability, limit: 24 })
          setItems(data.items || [])
        } finally {
          setLoading(false)
        }
      })()
    }, 400)
    return () => clearTimeout(t)
  }, [search, category, minPrice, maxPrice, sort, brand, availability])

  const brandOptions = useMemo(() => {
    const tags = items.flatMap(p => Array.isArray(p.tags) ? p.tags : [])
    return Array.from(new Set(tags))
  }, [items])

  const filteredItems = items

  function updateParams(next) {
    const merged = new URLSearchParams(params)
    Object.entries(next).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '') merged.delete(k)
      else merged.set(k, v)
    })
    setParams(merged)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navbar />
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1rem'
      }} className="products-container">
        {/* Mobile Filters Button */}
        <button
          onClick={() => setFiltersOpen(true)}
          style={{
            width: '100%',
            padding: '0.875rem',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#374151',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            minHeight: '44px'
          }}
          className="mobile-filters-btn"
        >
          <span>🔍</span> Filters
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem'
        }} className="products-layout">
          {/* Desktop Sidebar */}
          <div className="desktop-filters">
            <FiltersSidebar params={{ category, min: minPrice, max: maxPrice, availability, brand }} onChange={updateParams} brandOptions={brandOptions} />
          </div>

          {/* Mobile Filters Overlay */}
          {filtersOpen && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                padding: '1rem'
              }}
              onClick={() => setFiltersOpen(false)}
              className="mobile-filters-overlay"
            >
              <div
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  maxWidth: '320px',
                  maxHeight: '90vh',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  overflowY: 'auto',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#111827'
                  }}>
                    Filters
                  </h3>
                  <button
                    onClick={() => setFiltersOpen(false)}
                    style={{
                      padding: '0.5rem',
                      backgroundColor: 'transparent',
                      border: 'none',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      color: '#6b7280',
                      minWidth: '44px',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ✕
                  </button>
                </div>
                <FiltersSidebar params={{ category, min: minPrice, max: maxPrice, availability, brand }} onChange={updateParams} brandOptions={brandOptions} />
              </div>
            </div>
          )}

          <div>
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center',
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <SearchBar value={search} onChange={(val) => updateParams({ search: val })} />
              </div>
              <SortBar value={sort} onChange={(val) => updateParams({ sort: val })} />
            </div>
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
            ) : filteredItems.length === 0 ? (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                padding: '4rem 2rem',
                textAlign: 'center',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                <h2 style={{
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem',
                  color: '#111827',
                  fontWeight: '600'
                }}>
                  No products found
                </h2>
                <p style={{ color: '#6b7280' }}>
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <ProductGrid items={filteredItems} />
            )}
          </div>
        </div>
      </div>
      <Footer />
      
      <style>{`
        @media (min-width: 768px) {
          .products-container {
            padding: 2rem 1.5rem !important;
          }
          .products-layout {
            grid-template-columns: 280px 1fr !important;
          }
          .desktop-filters {
            display: block !important;
          }
          .mobile-filters-btn, .mobile-filters-overlay {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-filters {
            display: none !important;
          }
          .mobile-filters-btn {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  )
}
