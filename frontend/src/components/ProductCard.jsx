import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import ShopContext from '../context/ShopContext.jsx'

export default function ProductCard({ product, favorite }) {
  const { addToCart, toggleFavorite } = useContext(ShopContext)
  const [isHovered, setIsHovered] = useState(false)
  const inStock = (product.stock || 0) > 0
  
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        padding: '1rem',
        border: '1px solid #e5e7eb',
        transition: 'all 0.2s ease',
        boxShadow: isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist Icon - Top Right */}
      <button
        onClick={() => toggleFavorite(product._id)}
        style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.2s',
          fontSize: '1.25rem',
          color: favorite ? '#ef4444' : '#6b7280'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#fef2f2'
          e.currentTarget.style.borderColor = '#ef4444'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'white'
          e.currentTarget.style.borderColor = '#e5e7eb'
        }}
      >
        {favorite ? '❤️' : '🤍'}
      </button>

      <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div style={{
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f9fafb',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {product.images?.[0]?.url ? (
            <img
              src={product.images[0].url}
              alt={product.name}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
                transition: 'transform 0.3s ease'
              }}
            />
          ) : (
            <span style={{ fontSize: '3rem', opacity: 0.3 }}>📦</span>
          )}
        </div>
      </Link>

      <div style={{ marginBottom: '0.5rem' }}>
        <Link
          to={`/product/${product._id}`}
          style={{
            textDecoration: 'none',
            color: '#111827',
            fontWeight: '600',
            fontSize: '1rem',
            display: 'block',
            marginBottom: '0.5rem',
            lineHeight: '1.4',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#111827'}
        >
          {product.name}
        </Link>
        
        {product.tags && product.tags.length > 0 && (
          <div style={{
            color: '#6b7280',
            fontSize: '0.75rem',
            marginBottom: '0.5rem'
          }}>
            {product.tags[0]}
          </div>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.75rem'
        }}>
          <div style={{
            color: '#2563eb',
            fontWeight: '700',
            fontSize: '1.25rem'
          }}>
            ₹{product.price?.toLocaleString('en-IN')}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: inStock ? '#10b981' : '#ef4444',
            fontWeight: '500',
            padding: '0.25rem 0.5rem',
            backgroundColor: inStock ? '#d1fae5' : '#fee2e2',
            borderRadius: '0.25rem'
          }}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>
      </div>

      <button
        onClick={() => addToCart(product, 1)}
        disabled={!inStock}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: inStock ? '#2563eb' : '#9ca3af',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontWeight: '600',
          fontSize: '0.875rem',
          cursor: inStock ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          if (inStock) {
            e.currentTarget.style.backgroundColor = '#1e40af'
            e.currentTarget.style.transform = 'scale(1.02)'
          }
        }}
        onMouseLeave={(e) => {
          if (inStock) {
            e.currentTarget.style.backgroundColor = '#2563eb'
            e.currentTarget.style.transform = 'scale(1)'
          }
        }}
      >
        {inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  )
}
