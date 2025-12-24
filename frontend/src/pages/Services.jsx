import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './StaticPages.css'

export default function Services() {
  return (
    <div className="static-page">
      <Navbar />
      <main className="page-main">
        <section className="hero">
          <h1 className="hero-title">Products & Services</h1>
          <p className="hero-lead">From retail-ready products to B2B bulk ordering and post-purchase care.</p>
        </section>
        <section className="section grid-two">
          <div className="card">
            <h3 className="section-title">Product Catalog</h3>
            <p className="muted">Explore categories, search, filter, and favorite items tailored to your needs.</p>
            <div className="cta-row">
              <a className="btn primary" href="/products">Browse Products</a>
              <a className="btn" href="/categories">View Categories</a>
            </div>
          </div>
          <div className="card">
            <h3 className="section-title">B2B Services</h3>
            <p className="muted">Bulk pricing, retailer portal, and streamlined order management for partners.</p>
            <div className="cta-row">
              <a className="btn" href="/b2b">Open B2B Portal</a>
            </div>
          </div>
        </section>
        <section className="section grid-two">
          <div className="card">
            <strong>Secure Payments</strong>
            <p className="muted">Integrated payment gateway with server-side verification options.</p>
          </div>
          <div className="card">
            <strong>Post-Purchase Support</strong>
            <p className="muted">Order tracking, returns, and responsive customer service.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

