import { useEffect, useMemo, useState } from 'react'
import { listCategories } from '../services/categories'

export default function FiltersSidebar({ params, onChange, brandOptions }) {
  const [cats, setCats] = useState([])
  useEffect(() => { listCategories().then(setCats).catch(() => setCats([])) }, [])

  const [min, setMin] = useState(params.min || '')
  const [max, setMax] = useState(params.max || '')
  const [availability, setAvailability] = useState(params.availability || '')
  const [category, setCategory] = useState(params.category || '')
  const [brands, setBrands] = useState(params.brand ? params.brand.split(',') : [])


  const brandList = useMemo(() => Array.from(new Set(brandOptions || [])).slice(0, 12), [brandOptions])

  function apply() {
    onChange({ category, min, max, availability, brand: brands.join(',') })
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: '280px',
      borderRight: '1px solid #e2e8f0',
      paddingRight: '1rem',
      paddingBottom: '1rem'
    }} className="filters-sidebar">
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#374151' }}>Category</div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0',
            fontSize: '16px',
            minHeight: '44px'
          }}
        >
          <option value="">All</option>
          {cats.map(c => (<option key={c._id} value={c._id}>{c.name}</option>))}
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#374151' }}>Price Range</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            value={min}
            onChange={(e) => setMin(e.target.value)}
            placeholder="Min"
            type="number"
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #e2e8f0',
              fontSize: '16px',
              minHeight: '44px'
            }}
          />
          <input
            value={max}
            onChange={(e) => setMax(e.target.value)}
            placeholder="Max"
            type="number"
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #e2e8f0',
              fontSize: '16px',
              minHeight: '44px'
            }}
          />
        </div>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#374151' }}>Brand</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
          {brandList.map(b => (
            <label
              key={b}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                minHeight: '44px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <input
                type="checkbox"
                checked={brands.includes(b)}
                onChange={(e) => {
                  const checked = e.target.checked
                  setBrands(prev => checked ? [...prev, b] : prev.filter(x => x !== b))
                }}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.875rem', color: '#374151' }}>{b}</span>
            </label>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#374151' }}>Availability</div>
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0',
            fontSize: '16px',
            minHeight: '44px'
          }}
        >
          <option value="">All</option>
          <option value="in">In Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>
      <button
        onClick={apply}
        style={{
          width: '100%',
          padding: '0.875rem',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontWeight: '600',
          fontSize: '1rem',
          cursor: 'pointer',
          minHeight: '44px',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e40af'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
      >
        Apply Filters
      </button>
      
      <style>{`
        @media (max-width: 767px) {
          .filters-sidebar {
            border-right: none !important;
            padding-right: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  )
}
