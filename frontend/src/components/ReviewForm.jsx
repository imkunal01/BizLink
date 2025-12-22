import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext.jsx'
import './ReviewForm.css'



export default function ReviewForm({ onSubmit }) {
  const { token } = useContext(AuthContext)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!token || rating < 1 || text.trim().length < 3) return
    setLoading(true)
    try {
      await onSubmit({ rating, text: text.trim() })
      setText('')
      setRating(0)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="review-modern" onSubmit={submit}>
      <div className="review-stars-wrap">
        <div className="review-stars">
          {[1,2,3,4,5].map(n => (
            <span
              key={n}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(n)}
              className={`review-star ${(hover || rating) >= n ? "filled" : ""}`}
            >
              ★
            </span>
          ))}
        </div>
        <span className="review-rating-number">
          {rating ? `${rating}/5` : "Tap a star"}
        </span>
      </div>

      <textarea
        placeholder="Share something helpful for others..."
        value={text}
        onChange={e => setText(e.target.value)}
        className="review-input"
        rows={4}
      />

      <button
        className="review-submit"
        disabled={!token || loading}
      >
        {loading ? "Posting..." : "Submit Review"}
      </button>
    </form>
  )
}
