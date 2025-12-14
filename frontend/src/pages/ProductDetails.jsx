import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProduct } from '../services/products'
import { listProductReviews, createProductReview } from '../services/reviews'
import ShopContext from '../context/ShopContext.jsx'
import AuthContext from '../context/AuthContext.jsx'
import QuantitySelector from '../components/QuantitySelector.jsx'
import FavoritesButton from '../components/FavoritesButton.jsx'
import ReviewList from '../components/ReviewList.jsx'
import ReviewForm from '../components/ReviewForm.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, favorites } = useContext(ShopContext)
  const { token } = useContext(AuthContext)
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const p = await getProduct(id)
        const r = await listProductReviews(id)
        if (active) {
          setProduct(p)
          setReviews(r)
        }
      } catch (e) {
        setError(String(e.message || 'Failed'))
      } finally {
        if (active) setLoading(false)
      }
    })()
    return () => { active = false }
  }, [id])

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>
  if (error) return <div style={{ padding: 24 }}>Error: {error}</div>
  if (!product) return <div style={{ padding: 24 }}>Not found</div>

  const inStock = (product.stock || 0) > 0
  const images = Array.isArray(product.images) ? product.images : []

  async function submitReview(payload) {
    await createProductReview(id, payload, token)
    const r = await listProductReviews(id)
    setReviews(r)
  }

  const [selectedImage, setSelectedImage] = useState(images[0]?.url || null)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navbar />
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          padding: '1rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          marginBottom: '1.5rem'
        }} className="product-details-grid">
          {/* Image Gallery */}
          <div>
            <div style={{
              height: '300px',
              background: '#f9fafb',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              overflow: 'hidden',
              border: '1px solid #e5e7eb'
            }} className="product-image-main">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                <span style={{ fontSize: '4rem', opacity: 0.3 }}>📦</span>
              )}
            </div>
            {images.length > 1 && (
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                overflowX: 'auto',
                paddingBottom: '0.5rem'
              }}>
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url}
                    alt={`${product.name} ${idx + 1}`}
                    onClick={() => setSelectedImage(img.url)}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '0.5rem',
                      border: selectedImage === img.url ? '2px solid #2563eb' : '1px solid #e5e7eb',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => {
                      if (selectedImage !== img.url) {
                        e.currentTarget.style.borderColor = '#2563eb'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedImage !== img.url) {
                        e.currentTarget.style.borderColor = '#e5e7eb'
                      }
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#111827',
              lineHeight: '1.3'
            }} className="product-title">
              {product.name}
            </h1>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#2563eb'
              }}>
                ₹{product.price?.toLocaleString('en-IN')}
              </div>
              <div style={{
                padding: '0.375rem 0.75rem',
                backgroundColor: inStock ? '#d1fae5' : '#fee2e2',
                color: inStock ? '#065f46' : '#991b1b',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {inStock ? `In Stock (${product.stock})` : 'Out of Stock'}
              </div>
            </div>

            {product.description && (
              <div style={{
                marginBottom: '2rem',
                color: '#4b5563',
                lineHeight: '1.6',
                fontSize: '1rem'
              }}>
                {product.description}
              </div>
            )}

            {/* Quantity and Actions */}
            <div style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <label style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Quantity:
                </label>
                <QuantitySelector value={qty} max={product.stock || 1} onChange={setQty} />
              </div>

              <div style={{
                display: 'flex',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <button
                  onClick={() => addToCart(product, qty)}
                  disabled={!inStock}
                  style={{
                    flex: 1,
                    padding: '0.875rem 1.5rem',
                    backgroundColor: inStock ? '#2563eb' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    fontSize: '1rem',
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
                  Add to Cart
                </button>
                <button
                  onClick={async () => {
                    await addToCart(product, qty)
                    navigate('/checkout')
                  }}
                  disabled={!inStock}
                  style={{
                    flex: 1,
                    padding: '0.875rem 1.5rem',
                    backgroundColor: inStock ? '#10b981' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: inStock ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (inStock) {
                      e.currentTarget.style.backgroundColor = '#059669'
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (inStock) {
                      e.currentTarget.style.backgroundColor = '#10b981'
                      e.currentTarget.style.transform = 'scale(1)'
                    }
                  }}
                >
                  Buy Now
                </button>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FavoritesButton productId={product._id} active={favorites.includes(product._id)} />
              </div>
            </div>

            {/* Key Features */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f0fdf4',
              borderRadius: '0.75rem',
              border: '1px solid #bbf7d0'
            }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                color: '#166534'
              }}>
                Key Features
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <li style={{ color: '#166534', fontSize: '0.875rem' }}>✓ Fast & Secure Delivery</li>
                <li style={{ color: '#166534', fontSize: '0.875rem' }}>✓ Genuine Products Guaranteed</li>
                <li style={{ color: '#166534', fontSize: '0.875rem' }}>✓ Easy Returns & Exchanges</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          padding: '2rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#111827'
          }}>
            Customer Reviews
          </h2>
          <ReviewList items={reviews} />
          {token && (
            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <ReviewForm onSubmit={submitReview} />
            </div>
          )}
        </div>
      </div>
      <Footer />
      
      <style>{`
        @media (min-width: 768px) {
          .product-details-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 3rem !important;
            padding: 2rem !important;
          }
          .product-image-main {
            height: 500px !important;
          }
          .product-title {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </div>
  )
}
