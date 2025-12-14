import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1f2937',
      color: '#f9fafb',
      marginTop: '4rem',
      padding: '3rem 1.5rem 1.5rem'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        <div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: 'white'
          }}>
            Kripa Connect
          </h3>
          <p style={{
            color: '#9ca3af',
            fontSize: '0.875rem',
            lineHeight: '1.6'
          }}>
            Your trusted destination for premium electronics. Fast delivery, secure payments, and exceptional service.
          </p>
        </div>
        
        <div>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: 'white'
          }}>
            Quick Links
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <Link
              to="/"
              style={{
                color: '#9ca3af',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
            >
              Home
            </Link>
            <Link
              to="/products"
              style={{
                color: '#9ca3af',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
            >
              Products
            </Link>
            <Link
              to="/categories"
              style={{
                color: '#9ca3af',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
            >
              Categories
            </Link>
          </div>
        </div>

        <div>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: 'white'
          }}>
            Support
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <Link
              to="/about"
              style={{
                color: '#9ca3af',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              style={{
                color: '#9ca3af',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
            >
              Contact
            </Link>
            <Link
              to="/policy"
              style={{
                color: '#9ca3af',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
            >
              Privacy & Terms
            </Link>
          </div>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid #374151',
        paddingTop: '1.5rem',
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: '0.875rem'
      }}>
        © {new Date().getFullYear()} Kripa Connect. All rights reserved.
      </div>
    </footer>
  )
}

