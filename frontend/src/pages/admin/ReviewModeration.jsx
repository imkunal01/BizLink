import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getAllReviews, deleteReview } from '../../services/admin'

function formatDate(dateString) {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star} style={{ fontSize: '16px', color: star <= rating ? '#fbbf24' : '#e5e7eb' }}>
          ★
        </span>
      ))}
    </div>
  )
}

export default function ReviewModeration() {
  const { token } = useAuth()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadReviews()
  }, [token])

  async function loadReviews() {
    try {
      setLoading(true)
      const data = await getAllReviews(token)
      setReviews(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(reviewId) {
    if (confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      try {
        await deleteReview(reviewId, token)
        await loadReviews()
      } catch (err) {
        alert(err.message || 'Failed to delete review')
      }
    }
  }

  const filteredReviews = reviews.filter(review => {
    if (filter === 'low' && review.rating >= 3) return false
    if (filter === 'high' && review.rating < 4) return false
    return true
  })

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Review Moderation</h1>
        <p style={{ color: '#6b7280' }}>Manage product reviews and maintain content quality</p>
      </div>

      <div style={{ 
        backgroundColor: '#fff', 
        borderRadius: '12px', 
        padding: '20px', 
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #d1d5db' }}
          >
            <option value="all">All Reviews</option>
            <option value="high">High Rating (4-5 stars)</option>
            <option value="low">Low Rating (1-3 stars)</option>
          </select>
          <div style={{ marginLeft: 'auto', color: '#6b7280' }}>
            Total: {filteredReviews.length} reviews
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredReviews.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280', backgroundColor: '#fff', borderRadius: '12px' }}>
            No reviews found
          </div>
        ) : (
          filteredReviews.map(review => (
            <div
              key={review._id}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    {review.user?.profilePhoto ? (
                      <img
                        src={review.user.profilePhoto}
                        alt={review.user.name}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#e5e7eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#6b7280',
                        fontWeight: '600'
                      }}>
                        {review.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                    )}
                    <div>
                      <div style={{ fontWeight: '600' }}>{review.user?.name || 'Anonymous'}</div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>{formatDate(review.createdAt)}</div>
                    </div>
                  </div>
                  {review.product && (
                    <div style={{ marginBottom: '8px', padding: '8px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
                      <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Product:</div>
                      <div style={{ fontWeight: '500' }}>{review.product.name}</div>
                    </div>
                  )}
                  <div style={{ marginBottom: '8px' }}>
                    <StarRating rating={review.rating} />
                  </div>
                  <div style={{ fontSize: '15px', lineHeight: '1.6', color: '#374151' }}>
                    {review.text}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(review._id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

