import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './StaticPages.css'

export default function Refund() {
  return (
    <div className="static-page">
      <Navbar />
      <main className="page-main">
        <section className="hero">
          <h1 className="hero-title">Refund Policy</h1>
          <p className="hero-lead">Understand eligibility, timelines, and how to start a return.</p>
        </section>
        <section className="section">
          <h3 className="section-title">Eligibility</h3>
          <div className="list">
            <span>Items must be unused and in original condition</span>
            <span>Include packaging and proof of purchase</span>
            <span>Report issues within the stated window</span>
          </div>
        </section>
        <section className="section">
          <h3 className="section-title">Process</h3>
          <div className="list">
            <span>Submit a request via Orders or Support</span>
            <span>Receive instructions and shipping label if applicable</span>
            <span>Refunds issued after inspection and approval</span>
          </div>
        </section>
        <section className="section">
          <h3 className="section-title">Timelines</h3>
          <div className="list">
            <span>Processing usually completes within 7–10 business days</span>
            <span>Payment reversals depend on your bank or provider</span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

