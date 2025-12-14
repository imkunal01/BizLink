import { useContext } from 'react'
import ShopContext from '../context/ShopContext.jsx'
import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ items }) {
  const { favorites } = useContext(ShopContext)
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '1rem',
      padding: '0.5rem 0'
    }} className="product-grid">
      {items.map(p => (
        <ProductCard key={p._id} product={p} favorite={favorites.includes(p._id)} />
      ))}
      
      <style>{`
        @media (min-width: 640px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
            gap: 1.25rem !important;
          }
        }
        @media (min-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)) !important;
            gap: 1.5rem !important;
            padding: 1rem 0 !important;
          }
        }
      `}</style>
    </div>
  )
}

