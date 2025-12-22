import { useState, useEffect } from 'react'
import './QuantitySelector.css'   // ⭐ CSS import

export default function QuantitySelector({ value = 1, max = 99, onChange }) {
  const [qty, setQty] = useState(value)

  useEffect(() => { setQty(value) }, [value])

  function inc() {
    const next = Math.min(qty + 1, max)
    setQty(next)
    onChange?.(next)
  }

  function dec() {
    const next = Math.max(qty - 1, 1)
    setQty(next)
    onChange?.(next)
  }

  function setNumber(v) {
    const n = Math.max(1, Math.min(Number(v) || 1, max))
    setQty(n)
    onChange?.(n)
  }

  return (
    <div className="qty-box">
      <button
        className="qty-btn"
        onClick={dec}
        disabled={qty <= 1}
      >
        –
      </button>

      <input
        value={qty}
        onChange={e => setNumber(e.target.value)}
        className="qty-input"
      />

      <button
        className="qty-btn"
        onClick={inc}
        disabled={qty >= max}
      >
        +
      </button>
    </div>
  )
}
