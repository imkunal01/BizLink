import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './StaticPages.css'

export default function Privacy() {
  return (
    <div className="static-page">
      <Navbar />
      <main className="page-main">
        <section className="hero">
          <h1 className="hero-title">Privacy Policy</h1>
          <p className="hero-lead">Your data is handled with care, transparency, and security.</p>
        </section>
        <section className="section">
          <h3 className="section-title">Information We Collect</h3>
          <div className="list">
            <span>Account details and contact information</span>
            <span>Order history and payment confirmation</span>
            <span>Browsing and usage analytics to improve experience</span>
          </div>
        </section>
        <section className="section">
          <h3 className="section-title">How We Use Data</h3>
          <div className="list">
            <span>Process orders and provide customer support</span>
            <span>Detect fraud and keep accounts secure</span>
            <span>Improve products, features, and performance</span>
          </div>
        </section>
        <section className="section">
          <h3 className="section-title">Your Controls</h3>
          <div className="list">
            <span>Access and update your profile data</span>
            <span>Request account deletion and data export</span>
            <span>Manage communication preferences</span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

