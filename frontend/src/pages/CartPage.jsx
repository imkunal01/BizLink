import { useContext, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ShopContext from '../context/ShopContext.jsx'
import { useAuth } from '../hooks/useAuth.js'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function CartPage() {
  const { cart, updateQty, removeFromCart } = useContext(ShopContext)
  const { role } = useAuth()
  const navigate = useNavigate()
  const isRetailer = role === 'retailer'
  
  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
    return { subtotal, total: subtotal }
  }, [cart])

  const empty = cart.length === 0

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 960, margin: '24px auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>Shopping Cart</h2>
          {isRetailer && (
            <span style={{ 
              padding: '6px 12px', 
              backgroundColor: '#dbeafe', 
              color: '#1e40af', 
              borderRadius: '12px', 
              fontSize: '14px',
              fontWeight: '500'
            }}>
              B2B Wholesale Cart
            </span>
          )}
        </div>
        {empty ? (
          <div style={{ background: '#f8fafc', padding: 24, borderRadius: 12, textAlign: 'center' }}>
            <div style={{ fontSize: 18, marginBottom: 8 }}>Your cart is empty</div>
            <Link className="nav-btn" to="/products">Shop Products</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
            <div>
              {cart.map(item => {
                const isBulkPrice = isRetailer && item.isBulkPrice
                const minQty = item.minBulkQty
                return (
                  <div key={item.productId} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, border: '1px solid #e2e8f0', borderRadius: 12, marginBottom: 12 }}>
                    <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'contain', background: '#f8fafc', borderRadius: 8 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, marginBottom: '4px' }}>{item.name}</div>
                      {isRetailer && (
                        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                          {item.regularPrice && item.regularPrice !== item.price && (
                            <span style={{ textDecoration: 'line-through', marginRight: '8px' }}>
                              ₹{item.regularPrice?.toLocaleString('en-IN')}
                            </span>
                          )}
                          {isBulkPrice ? (
                            <span style={{ color: '#10b981', fontWeight: '600' }}>
                              Bulk Price: ₹{item.price?.toLocaleString('en-IN')} ✓
                            </span>
                          ) : (
                            <span>Retailer Price: ₹{item.price?.toLocaleString('en-IN')}</span>
                          )}
                          {minQty && item.qty < minQty && (
                            <div style={{ color: '#f59e0b', fontSize: '11px', marginTop: '2px' }}>
                              Min {minQty} for bulk pricing
                            </div>
                          )}
                        </div>
                      )}
                      {!isRetailer && (
                        <div style={{ color: '#334155' }}>₹{item.price?.toLocaleString('en-IN')}</div>
                      )}
                    </div>
                    <div>
                      <input 
                        type="number" 
                        min={isRetailer && minQty ? minQty : 1} 
                        value={item.qty} 
                        onChange={e => updateQty(item.productId, Math.max(isRetailer && minQty ? minQty : 1, Number(e.target.value) || 1))} 
                        style={{ width: 64, padding: 6 }} 
                      />
                      {isRetailer && minQty && item.qty < minQty && (
                        <div style={{ fontSize: '10px', color: '#f59e0b', marginTop: '2px', textAlign: 'center' }}>
                          Min {minQty}
                        </div>
                      )}
                    </div>
                    <div style={{ width: 96, textAlign: 'right' }}>
                      <div style={{ fontWeight: 600, fontSize: '16px' }}>
                        ₹{(item.price * item.qty).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </div>
                      {isBulkPrice && (
                        <div style={{ fontSize: '11px', color: '#10b981' }}>Bulk pricing</div>
                      )}
                    </div>
                    <button className="nav-btn" onClick={() => removeFromCart(item.productId)}>Remove</button>
                  </div>
                )
              })}
            </div>
            <div>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>Subtotal</span>
                  <span>₹{totals.subtotal.toFixed(2)}</span>
                </div>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontWeight: 700 }}>
                  <span>Total</span>
                  <span>₹{totals.total.toFixed(2)}</span>
                </div>
                <button className="nav-btn signup-btn" disabled={empty} onClick={() => navigate('/checkout')} style={{ width: '100%', marginTop: 12 }}>Proceed to Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

