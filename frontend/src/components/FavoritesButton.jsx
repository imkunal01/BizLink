import { useContext, useState } from 'react'
import ShopContext from '../context/ShopContext.jsx'
import './FavoritesButton.css'

export default function FavoritesButton({ productId, active }) {
  const { toggleFavorite } = useContext(ShopContext)
  const [anim, setAnim] = useState(false)

  function handleClick() {
    setAnim(true)
    toggleFavorite(productId)
    setTimeout(() => setAnim(false), 300)
  }

  return (
    <button
      className={`wish-btn ${active ? "wish-active" : ""} ${anim ? "wish-pop" : ""}`}
      onClick={handleClick}
    >
      <span className="wish-icon">
        {active ? '❤️' : '🤍'}
      </span>

      <span className="wish-text">
        {active ? "Added to Wishlist" : "Add to Wishlist"}
      </span>
    </button>
  )
}
