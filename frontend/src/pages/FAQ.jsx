import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import './StaticPages.css'

export default function FAQ() {
  return (
    <div className="static-page">
      <Navbar />
      <main className="page-main">
        <section className="hero">
          <h1 className="hero-title">Frequently Asked Questions</h1>
          <p className="hero-lead">Quick answers to common questions about shopping and orders.</p>
        </section>
        <section className="section">
          <div className="faq-item">
            <div className="faq-q">How do I track my order?</div>
            <div className="faq-a">Go to Orders from your profile to view live status and details.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What payment methods are supported?</div>
            <div className="faq-a">We support secure online payments through the integrated gateway.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Can retailers place bulk orders?</div>
            <div className="faq-a">Retail partners can access special pricing via the B2B portal.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">How do returns and refunds work?</div>
            <div className="faq-a">View the Refund Policy for timelines, eligibility, and initiation steps.</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

