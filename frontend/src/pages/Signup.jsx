import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserAlt, FaStore } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth.js'
import './FormStyles.css'

export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  
  const [role, setRole] = useState('customer')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signUp({ name, email, password, role })
      navigate('/')
    } catch (err) {
      alert("Signup failed: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrapper">
      {/* LEFT: Form Section */}
      <div className="auth-left">
        <header className="auth-header">
          <div className="brand">KARC</div>
          <div className="auth-toggle">
            <Link to="/login" className="toggle-btn">Log In</Link>
            <Link to="/signup" className="toggle-btn active">Sign Up</Link>
          </div>
        </header>

        <div className="welcome-text">
          <h1>Create Account</h1>
          <p>Start your journey with us today.</p>
        </div>

        <form onSubmit={handleSignup} className="form-stack">
          
          {/* Role Selection */}
          <div>
            <label className="role-label">I am a:</label>
            <div className="role-grid">
              <div 
                className={`role-card ${role === 'customer' ? 'active' : ''}`}
                onClick={() => setRole('customer')}
              >
                <FaUserAlt style={{fontSize: '1.2rem'}} />
                <span style={{fontSize: '0.9rem', fontWeight: '600'}}>Customer</span>
              </div>
              <div 
                className={`role-card ${role === 'retailer' ? 'active' : ''}`}
                onClick={() => setRole('retailer')}
              >
                <FaStore style={{fontSize: '1.2rem'}} />
                <span style={{fontSize: '0.9rem', fontWeight: '600'}}>Retailer</span>
              </div>
            </div>
          </div>

          <input 
            className="input-field" 
            type="text" 
            placeholder="Full Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input 
            className="input-field" 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            className="input-field" 
            type="password" 
            placeholder="Create Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="divider">or continue with</div>

        <button className="btn-google" onClick={() => alert("Trigger Google Auth")}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="20" alt="Google" />
          Google
        </button>
      </div>

      {/* RIGHT: Visual Section (Hidden on Mobile) */}
      <div className="auth-right">
        <div className="visual-content">
          <h2>Start your journey.</h2>
          <p>Create an account to unlock exclusive features, track your orders, and join our global community.</p>
        </div>
      </div>
    </div>
  )
}
