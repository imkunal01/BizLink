import { useState } from 'react'
import './SortBar.css'

const OPTIONS = [
  { label: 'Recommended', value: '' },
  { label: 'Price: Low → High', value: 'price' },
  { label: 'Price: High → Low', value: '-price' },
  { label: 'Name: A → Z', value: 'name' },
  { label: 'Name: Z → A', value: '-name' },
  { label: 'Newest First', value: '-createdAt' },
]

export default function SortBar({ value, onChange }) {
  const [open, setOpen] = useState(false)

  const active = OPTIONS.find(o => o.value === value)?.label || 'Sort'

  function handleSelect(v) {
    onChange(v)
    setOpen(false)
  }

  return (
    <div className="sort-dd">
      <button
        type="button"
        className="sort-dd-btn"
        onClick={() => setOpen(o => !o)}
      >
        <span>{active}</span>
        <span className={`chev ${open ? 'up' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="sort-dd-menu">
          {OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`sort-dd-item ${value === opt.value ? 'active' : ''}`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
