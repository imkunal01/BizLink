import { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ShopContext from '../context/ShopContext.jsx'
import AuthContext from '../context/AuthContext.jsx'
import AddressForm from '../components/AddressForm.jsx'
import PaymentSelector from '../components/PaymentSelector.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import { createOrder } from '../services/orders'
import { createRazorpayOrder, verifyPayment } from '../services/payments'

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function CheckoutPage() {
  const { cart, removeFromCart } = useContext(ShopContext)
  const { token, user, role } = useContext(AuthContext)
  const [address, setAddress] = useState({})
  const [method, setMethod] = useState('COD')
  const [placing, setPlacing] = useState(false)
  const navigate = useNavigate()
  const isRetailer = role === 'retailer'

  const itemsPayload = useMemo(() => cart.map(i => ({ product: i.productId, qty: i.qty })), [cart])
  const empty = cart.length === 0

  useEffect(() => {
    if (empty) navigate('/cart')
  }, [empty, navigate])

  async function onPlaceOrder() {
    if (!address.name || !address.phone || !address.addressLine || !address.city || !address.state || !address.pincode) {
      alert('Please fill delivery address')
      return
    }
    if (!method) {
      alert('Please select a payment method')
      return
    }
    setPlacing(true)
    try {
      const orderRes = await createOrder({ items: itemsPayload, shippingAddress: address, paymentMethod: method }, token)
      const order = orderRes?.data
      if (method === 'COD') {
        // Clear local cart UI
        cart.forEach(i => removeFromCart(i.productId))
        navigate(`/success/${order._id}`)
        return
      }

      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) throw new Error('Failed to load Razorpay')
      const paymentInit = await createRazorpayOrder(order._id, token)
      const { keyId, razorpayOrder } = paymentInit?.data || {}
      const options = {
        key: keyId,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Kripa Connect',
        description: 'Order Payment',
        order_id: razorpayOrder.id,
        prefill: { name: user?.name, email: user?.email },
        notes: { orderId: order._id },
        handler: async function (response) {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }, token)
          } catch (e) {
            console.warn('verifyPayment error', e?.message)
          }
          // Clear local cart UI
          cart.forEach(i => removeFromCart(i.productId))
          navigate(`/success/${order._id}`)
        },
        theme: { color: '#0ea5e9' }
      }
      const rp = new window.Razorpay(options)
      rp.open()
    } catch (err) {
      alert(err.message || 'Order failed')
    } finally {
      setPlacing(false)
    }
  }

  const [currentStep, setCurrentStep] = useState(1)
  const steps = [
    { number: 1, label: 'Shipping Address' },
    { number: 2, label: 'Payment Method' },
    { number: 3, label: 'Review & Confirm' }
  ]

  const isAddressComplete = address.name && address.phone && address.addressLine && address.city && address.state && address.pincode

  function handleNext() {
    if (currentStep === 1 && isAddressComplete) {
      setCurrentStep(2)
    } else if (currentStep === 2 && method) {
      setCurrentStep(3)
    }
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navbar />
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#111827',
            margin: 0
          }}>
            Checkout
          </h1>
          {isRetailer && (
            <span style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dbeafe',
              color: '#1e40af',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              B2B Bulk Order
            </span>
          )}
        </div>

        {/* Progress Indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          position: 'relative',
          overflowX: 'auto',
          paddingBottom: '0.5rem'
        }} className="checkout-progress">
          {steps.map((step, idx) => (
            <div key={step.number} style={{ flex: 1, position: 'relative' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: currentStep >= step.number ? '#2563eb' : '#e5e7eb',
                  color: currentStep >= step.number ? 'white' : '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  transition: 'all 0.2s'
                }}>
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: currentStep >= step.number ? '600' : '400',
                  color: currentStep >= step.number ? '#2563eb' : '#9ca3af',
                  textAlign: 'center'
                }}>
                  {step.label}
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '50%',
                  width: '100%',
                  height: '2px',
                  backgroundColor: currentStep > step.number ? '#2563eb' : '#e5e7eb',
                  zIndex: 1
                }} />
              )}
            </div>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem'
        }} className="checkout-layout">
          {/* Main Content */}
          <div>
            {/* Step 1: Shipping Address */}
            {currentStep === 1 && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                padding: '2rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  color: '#111827'
                }}>
                  Delivery Address
                </h2>
                <AddressForm value={address} onChange={setAddress} disabled={placing} />
              </div>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                padding: '2rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  color: '#111827'
                }}>
                  Payment Method
                </h2>
                <PaymentSelector method={method} onChange={setMethod} />
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                padding: '2rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  color: '#111827'
                }}>
                  Review Your Order
                </h2>
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#374151'
                  }}>
                    Delivery Address
                  </h3>
                  <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                    {address.name}<br />
                    {address.addressLine}<br />
                    {address.city}, {address.state} {address.pincode}<br />
                    Phone: {address.phone}
                  </p>
                </div>
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#374151'
                  }}>
                    Payment Method
                  </h3>
                  <p style={{ color: '#6b7280' }}>
                    {method === 'COD' ? 'Cash on Delivery' : 'UPI / Online Payment'}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1.5rem',
              justifyContent: 'space-between'
            }}>
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  style={{
                    padding: '0.875rem 2rem',
                    backgroundColor: 'white',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white'
                  }}
                >
                  ← Back
                </button>
              )}
              <div style={{ flex: 1 }} />
              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={(currentStep === 1 && !isAddressComplete) || (currentStep === 2 && !method)}
                  style={{
                    padding: '0.875rem 2rem',
                    backgroundColor: ((currentStep === 1 && !isAddressComplete) || (currentStep === 2 && !method)) ? '#9ca3af' : '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: ((currentStep === 1 && !isAddressComplete) || (currentStep === 2 && !method)) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!((currentStep === 1 && !isAddressComplete) || (currentStep === 2 && !method))) {
                      e.currentTarget.style.backgroundColor = '#1e40af'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!((currentStep === 1 && !isAddressComplete) || (currentStep === 2 && !method))) {
                      e.currentTarget.style.backgroundColor = '#2563eb'
                    }
                  }}
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={onPlaceOrder}
                  disabled={placing || empty}
                  style={{
                    padding: '0.875rem 2rem',
                    backgroundColor: (placing || empty) ? '#9ca3af' : '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: (placing || empty) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!(placing || empty)) {
                      e.currentTarget.style.backgroundColor = '#059669'
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!(placing || empty)) {
                      e.currentTarget.style.backgroundColor = '#10b981'
                      e.currentTarget.style.transform = 'scale(1)'
                    }
                  }}
                >
                  {placing ? 'Placing Order...' : 'Place Order'}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div style={{
            position: 'relative',
            height: 'fit-content'
          }} className="checkout-summary-sticky">
            <OrderSummary items={cart} />
          </div>
        </div>
      </div>
      <Footer />
      
      <style>{`
        @media (min-width: 768px) {
          .checkout-layout {
            grid-template-columns: 2fr 1fr !important;
            gap: 2rem !important;
          }
          .checkout-summary-sticky {
            position: sticky !important;
            top: 80px !important;
          }
          .checkout-progress {
            margin-bottom: 3rem !important;
          }
        }
        @media (max-width: 767px) {
          .checkout-progress {
            font-size: 0.75rem;
          }
          .checkout-progress > div {
            min-width: 80px;
          }
        }
      `}</style>
    </div>
  )
}
