import './ReviewList.css'
export default function ReviewList({ items }) {
  if (!items || items.length === 0) {
    return <div className="review-empty">No reviews yet</div>
  }

  return (
    <div className="review-list sleek">
      {items.map(r => (
        <div key={r._id} className="review-row">
          
          <div className="review-avatar">
            {(r.user?.name?.[0] ?? "U").toUpperCase()}
          </div>

          <div className="review-content">

            <div className="review-head">
              <span className="review-user">{r.user?.name || "User"}</span>

              <span className="review-badge">Verified</span>
            </div>

            <div className="review-stars">
              {[1,2,3,4,5].map(n => (
                <span
                  key={n}
                  className={`star ${n <= r.rating ? "filled" : ""}`}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="review-text">{r.text}</p>

            <div className="review-date">
              {new Date(r.createdAt).toLocaleDateString()}
            </div>

            <div className="review-divider"></div>

          </div>
        </div>
      ))}
    </div>
  )
}
