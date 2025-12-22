import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import './Dashboard.css'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { listCategories } from '../services/categories'
import { listProducts } from '../services/products'

export default function Dashboard() {
  const { user, role } = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (user && role === 'admin') navigate('/admin', { replace: true })
  }, [user, role, navigate])

  const [categories, setCategories] = useState([])
  const [trending, setTrending] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods] = await Promise.all([
          listCategories().catch(() => []),
          listProducts({ sort: '-createdAt', limit: 8 }).catch(() => ({ items: [] }))
        ])
        setCategories(Array.isArray(cats) ? cats : [])
        setTrending(prods.items || [])
      } catch (err) {
        console.error("Dashboard load failed", err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const query = e.target.search.value.trim()
    if (query) navigate(`/products?search=${encodeURIComponent(query)}`)
  }

  // Helper to assign a specific pastel class based on index
  const getCardColor = (index) => {
    const colors = ['card-blue', 'card-mint', 'card-peach', 'card-lavender'];
    return colors[index % colors.length];
  }

  return (
    <div className="pop-dashboard">
      <Navbar />

      <main className="pop-container">
        {/* --- Hero: Asymmetric Bento Grid --- */}
        <section className="hero-bento">
          <div className="hero-main card-lavender">
            <div className="hero-content">
              <span className="pill-tag">🚀 New Arrivals</span>
              <h1>Tech that <br/> <span>Pops.</span></h1>
              <p>Curated electronics for the modern creator. Find your flow with our latest collection.</p>
              
              <form onSubmit={handleSearch} className="bento-search">
                <input 
                  type="text" 
                  name="search" 
                  placeholder="Search headphones, keyboards..." 
                  autoComplete="off"
                />
                <button type="submit">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                </button>
              </form>
            </div>
            <div className="hero-decoration">✨</div>
          </div>

          <div className="hero-side card-mint">
            <h3>Fast Shipping</h3>
            <p>Free delivery on orders over ₹999</p>
            <div className="emoji-icon">🚚</div>
          </div>

          <div className="hero-side card-peach">
            <h3>Warranty</h3>
            <p>100% Authentic Guarantee</p>
            <div className="emoji-icon">🛡️</div>
          </div>
        </section>

        {/* --- Categories: Colorful Pills --- */}
        <section className="section-block">
          <div className="section-header">
            <h2>Categories</h2>
            <Link to="/categories" className="btn-link">See All →</Link>
          </div>
          
          <div className="category-scroll">
            {loading ? <div className="skeleton-box"></div> : categories.map((c, i) => (
              <Link key={c._id} to={`/products?category=${c._id}`} className={`cat-card ${getCardColor(i)}`}>
                <span className="cat-name">{c.name}</span>
                <div className="cat-arrow">↘</div>
              </Link>
            ))}
          </div>
        </section>

        {/* --- Trending: Grid with Soft Colored Backgrounds --- */}
        <section className="section-block">
          <div className="section-header">
            <h2>Fresh Drops</h2>
            <Link to="/products" className="btn-black">Shop All</Link>
          </div>

          <div className="product-masonry">
            {loading ? <p>Loading...</p> : trending.map((p, i) => (
              <Link key={p._id} to={`/product/${p._id}`} className="product-pop-card">
                <div className={`img-container ${getCardColor(i + 2)}`}> {/* Offset index for variety */}
                  {p.images?.[0]?.url ? (
                    <img src={p.images[0].url} alt={p.name} />
                  ) : (
                    <div className="placeholder">📷</div>
                  )}
                  <span className="price-tag">₹{p.price?.toLocaleString('en-IN')}</span>
                </div>
                
                <div className="pop-details">
                  <h4>{p.name}</h4>
                  <div className="pop-meta">
                    <span className="category-label">{p.category?.name || 'Gear'}</span>
                    <button className="btn-add">+</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}