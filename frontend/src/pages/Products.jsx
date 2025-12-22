import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { listProducts } from '../services/products'
import FiltersSidebar from '../components/FiltersSidebar.jsx'
import SearchBar from '../components/SearchBar.jsx'
import SortBar from '../components/SortBar.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './Products.css'

export default function Products() {
  const [params, setParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)
  
  // Extract params
  const search = params.get('search') || ''
  const category = params.get('category') || ''
  const minPrice = params.get('minPrice') || ''
  const maxPrice = params.get('maxPrice') || ''
  const sort = params.get('sort') || ''
  const brand = params.get('brand') || ''
  const availability = params.get('availability') || ''

  // Data Fetching
  useEffect(() => {
    const t = setTimeout(() => {
      ;(async () => {
        setLoading(true)
        try {
          const data = await listProducts({ 
            search, category, minPrice, maxPrice, sort, brand, availability, limit: 24 
          })
          setItems(data.items || [])
        } finally {
          setLoading(false)
        }
      })()
    }, 400)
    return () => clearTimeout(t)
  }, [search, category, minPrice, maxPrice, sort, brand, availability])

  // Extract Brands
  const brandOptions = useMemo(() => {
    const tags = items.flatMap(p => Array.isArray(p.tags) ? p.tags : [])
    return Array.from(new Set(tags))
  }, [items])

  // Helper to update URL params
  function updateParams(next) {
    const merged = new URLSearchParams(params)
    Object.entries(next).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '') merged.delete(k)
      else merged.set(k, v)
    })
    setParams(merged)
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      
      {/* Header Section */}
      <header className="page-header">
        <div className="header-content">
          <h1 className="page-title">Explore Collection</h1>
          <p className="page-subtitle">Curated premium electronics for your workspace.</p>
        </div>
      </header>

      <div className="container main-layout">
        
        {/* Sidebar - Desktop */}
        <aside className="sidebar-desktop">
          <div className="sticky-wrapper">
            <FiltersSidebar 
              params={{ category, min: minPrice, max: maxPrice, availability, brand }} 
              onChange={updateParams} 
              brandOptions={brandOptions} 
            />
          </div>
        </aside>

        {/* Product Area */}
        <main className="product-feed">
          
          {/* Controls Bar */}
          <div className="controls-bar">
            <button 
              className="btn-filter-mobile"
              onClick={() => setFiltersOpen(true)}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
              <span>Filters</span>
            </button>

            <div className="search-container">
              <SearchBar value={search} onChange={(val) => updateParams({ search: val })} />
            </div>
            
            <div className="sort-container">
              <SortBar value={sort} onChange={(val) => updateParams({ sort: val })} />
            </div>
          </div>

          {/* Grid Content */}
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <span>Loading products...</span>
            </div>
          ) : items.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No matches found</h3>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
              <button className="btn-reset" onClick={() => setParams({})}>Clear All Filters</button>
            </div>
          ) : (
            <ProductGrid items={items} />
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      <div className={`drawer-overlay ${filtersOpen ? 'open' : ''}`} onClick={() => setFiltersOpen(false)}>
        <div className="drawer-panel" onClick={e => e.stopPropagation()}>
          <div className="drawer-header">
            <h3>Filters</h3>
            <button className="btn-close" onClick={() => setFiltersOpen(false)}>✕</button>
          </div>
          <div className="drawer-content">
            <FiltersSidebar 
              params={{ category, min: minPrice, max: maxPrice, availability, brand }} 
              onChange={updateParams} 
              brandOptions={brandOptions} 
            />
          </div>
          <div className="drawer-footer">
            <button className="btn-apply" onClick={() => setFiltersOpen(false)}>Show Results</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}