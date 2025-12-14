import { useState, useContext, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import ShopContext from '../context/ShopContext.jsx'

export default function Navbar() {
  const { user, role, signOut } = useAuth()
  const { cart, favorites } = useContext(ShopContext)
  const [q, setQ] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const profileRef = useRef(null)
  const cartCount = Array.isArray(cart) ? cart.reduce((n, i) => n + Number(i.qty || 0), 0) : 0
  const favoritesCount = Array.isArray(favorites) ? favorites.length : 0

  function onSearch(e) {
    e.preventDefault()
    const query = q.trim()
    if (query.length > 0) navigate(`/products?search=${encodeURIComponent(query)}`)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false)
      }
    }
    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [profileDropdownOpen])

  async function handleLogout() {
    await signOut()
    navigate('/login')
    setProfileDropdownOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        gap: '0.75rem'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontSize: '1.125rem',
          fontWeight: '700',
          color: '#2563eb',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          flexShrink: 0
        }}>
          <span className="desktop-only">Kripa Connect</span>
          <span className="mobile-only">KC</span>
        </Link>

        {/* Center Navigation - Desktop */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '2rem',
          flex: 1,
          justifyContent: 'center'
        }} className="desktop-nav">
          <Link
            to="/"
            style={{
              color: isActive('/') ? '#2563eb' : '#374151',
              fontWeight: isActive('/') ? '600' : '500',
              fontSize: '0.9375rem',
              textDecoration: 'none',
              padding: '0.5rem 0',
              borderBottom: isActive('/') ? '2px solid #2563eb' : '2px solid transparent',
              transition: 'all 0.2s'
            }}
          >
            Home
          </Link>
          <Link
            to="/products"
            style={{
              color: isActive('/products') ? '#2563eb' : '#374151',
              fontWeight: isActive('/products') ? '600' : '500',
              fontSize: '0.9375rem',
              textDecoration: 'none',
              padding: '0.5rem 0',
              borderBottom: isActive('/products') ? '2px solid #2563eb' : '2px solid transparent',
              transition: 'all 0.2s'
            }}
          >
            Products
          </Link>
          <Link
            to="/categories"
            style={{
              color: isActive('/categories') ? '#2563eb' : '#374151',
              fontWeight: isActive('/categories') ? '600' : '500',
              fontSize: '0.9375rem',
              textDecoration: 'none',
              padding: '0.5rem 0',
              borderBottom: isActive('/categories') ? '2px solid #2563eb' : '2px solid transparent',
              transition: 'all 0.2s'
            }}
          >
            Categories
          </Link>
          {role === 'retailer' && (
            <Link
              to="/b2b"
              style={{
                color: isActive('/b2b') ? '#2563eb' : '#374151',
                fontWeight: isActive('/b2b') ? '600' : '500',
                fontSize: '0.9375rem',
                textDecoration: 'none',
                padding: '0.5rem 0',
                borderBottom: isActive('/b2b') ? '2px solid #2563eb' : '2px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              B2B
            </Link>
          )}
        </div>

        {/* Search Bar - Desktop */}
        <form onSubmit={onSearch} style={{
          display: 'none',
          flex: 1,
          maxWidth: '400px',
          position: 'relative'
        }} className="desktop-search">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            style={{
              width: '100%',
              padding: '0.625rem 1rem 0.625rem 2.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#2563eb'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
          <span style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af',
            fontSize: '1rem'
          }}>🔍</span>
        </form>

        {/* Right Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {/* Wishlist Icon */}
          <Link
            to="/favorites"
            style={{
              position: 'relative',
              padding: '0.5rem',
              color: '#374151',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              transition: 'background-color 0.2s',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span style={{ fontSize: '1.25rem' }}>♡</span>
            {favoritesCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '0',
                right: '0',
                backgroundColor: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600'
              }}>
                {favoritesCount > 9 ? '9+' : favoritesCount}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            to="/cart"
            style={{
              position: 'relative',
              padding: '0.5rem',
              color: '#374151',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              transition: 'background-color 0.2s',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span style={{ fontSize: '1.25rem' }}>🛒</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '0',
                right: '0',
                backgroundColor: '#2563eb',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600'
              }}>
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>

          {/* Profile Avatar / Login */}
          {user ? (
            <div ref={profileRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.375rem 0.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #e5e7eb',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  minHeight: '44px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  flexShrink: 0
                }}>
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span style={{
                  fontSize: '0.875rem',
                  color: '#374151',
                  fontWeight: '500',
                  display: 'none'
                }} className="desktop-only">
                  {user.name?.split(' ')[0] || 'User'}
                </span>
                <span style={{
                  color: '#9ca3af',
                  fontSize: '0.75rem',
                  display: 'none'
                }} className="desktop-only">▼</span>
              </button>

              {profileDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  right: 0,
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e5e7eb',
                  minWidth: '200px',
                  overflow: 'hidden'
                }}>
                  <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #e5e7eb' }}>
                    <div style={{ fontWeight: '600', fontSize: '0.875rem', color: '#111827' }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                      {user.email}
                    </div>
                  </div>
                  <Link
                    to="/orders"
                    onClick={() => setProfileDropdownOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.75rem 1rem',
                      color: '#374151',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.75rem 1rem',
                      color: '#374151',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.75rem 1rem',
                      color: '#ef4444',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderTop: '1px solid #e5e7eb',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link
                to="/login"
                style={{
                  padding: '0.5rem 1rem',
                  color: '#374151',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1e40af'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb'
                }}
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem',
              color: '#374151',
              minWidth: '44px',
              minHeight: '44px',
              borderRadius: '0.5rem',
              transition: 'background-color 0.2s'
            }}
            className="mobile-menu-btn"
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          backgroundColor: 'white',
          borderTop: '1px solid #e5e7eb',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          maxHeight: 'calc(100vh - 64px)',
          overflowY: 'auto'
        }} className="mobile-menu">
          <form onSubmit={onSearch} style={{ marginBottom: '0.5rem' }}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid #d1d5db',
                fontSize: '16px',
                minHeight: '44px'
              }}
            />
          </form>
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: '0.875rem 1rem',
              color: '#374151',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              fontWeight: '500',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: '0.875rem 1rem',
              color: '#374151',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              fontWeight: '500',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Products
          </Link>
          <Link
            to="/categories"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: '0.875rem 1rem',
              color: '#374151',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              fontWeight: '500',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Categories
          </Link>
          {role === 'retailer' && (
            <Link
              to="/b2b"
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '0.875rem 1rem',
                color: '#374151',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                fontWeight: '500',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              B2B Portal
            </Link>
          )}
          {role === 'admin' && (
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '0.875rem 1rem',
                color: '#374151',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                fontWeight: '500',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Admin Panel
            </Link>
          )}
          {!user && (
            <>
              <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '0.5rem 0' }} />
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '0.875rem 1rem',
                  color: '#2563eb',
                  textDecoration: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '0.875rem 1rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e40af'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav, .desktop-search {
            display: flex !important;
          }
          .mobile-menu-btn, .mobile-menu {
            display: none !important;
          }
          .desktop-only {
            display: inline !important;
          }
          .mobile-only {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-nav, .desktop-search {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: inline !important;
          }
        }
      `}</style>
    </nav>
  )
}
