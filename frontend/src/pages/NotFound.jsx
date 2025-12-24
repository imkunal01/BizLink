import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './StaticPages.css'

export default function NotFound() {
  return (
    <div className="static-page">
      <Navbar />
      <main className="page-main notfound">
        <h1>404</h1>
        <p>Page not found. The link might be broken or moved.</p>
        <div className="cta-row" style={{ justifyContent: 'center' }}>
          <a className="btn primary" href="/">Go Home</a>
          <a className="btn" href="/products">Browse Products</a>
        </div>
      </main>
      <Footer />
    </div>
  )
}

