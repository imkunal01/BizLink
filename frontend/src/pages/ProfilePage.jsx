import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { profile, updateProfile, uploadProfilePhoto } from '../services/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './FormStyles.css'

export default function ProfilePage() {
  const { token, user: authUser, signOut } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({ name: '', phone: '' })
  const [photoPreview, setPhotoPreview] = useState(null)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    loadProfile()
  }, [token, navigate])

  async function loadProfile() {
    try {
      setLoading(true)
      const res = await profile(token)
      const userData = res.data
      setUser(userData)
      setFormData({ name: userData.name || '', phone: userData.phone || '' })
      setPhotoPreview(userData.profilePhoto || null)
    } catch (err) {
      setError('Failed to load profile')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => setPhotoPreview(e.target.result)
    reader.readAsDataURL(file)
  }

  async function handlePhotoUpload() {
    const fileInput = document.getElementById('photo-upload')
    const file = fileInput?.files?.[0]
    if (!file) {
      setError('Please select a photo')
      return
    }

    try {
      setUploadingPhoto(true)
      setError('')
      const res = await uploadProfilePhoto(file, token)
      setUser(res.data)
      setPhotoPreview(res.data.profilePhoto)
      setSuccess('Profile photo updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
      fileInput.value = ''
    } catch (err) {
      setError(err.message || 'Failed to upload photo')
    } finally {
      setUploadingPhoto(false)
    }
  }

  async function handleSave() {
    try {
      setSaving(true)
      setError('')
      const res = await updateProfile(formData, token)
      setUser(res.data)
      setEditing(false)
      setSuccess('Profile updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  async function handleLogout() {
    try {
      await signOut()
      navigate('/login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: '40px', textAlign: 'center' }}>Loading profile...</div>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: '40px', textAlign: 'center' }}>Failed to load profile</div>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '1rem', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: '#111827'
          }}>
            My Profile
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '0.875rem'
          }}>
            Manage your account settings and information
          </p>
        </div>

        {error && (
          <div style={{ 
            padding: '1rem 1.25rem', 
            backgroundColor: '#fee2e2', 
            color: '#991b1b', 
            borderRadius: '0.5rem', 
            marginBottom: '1.5rem',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ 
            padding: '1rem 1.25rem', 
            backgroundColor: '#d1fae5', 
            color: '#065f46', 
            borderRadius: '0.5rem', 
            marginBottom: '1.5rem',
            border: '1px solid #bbf7d0'
          }}>
            {success}
          </div>
        )}

        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '0.75rem', 
          padding: '1.5rem', 
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '2rem',
            gap: '1.5rem',
            flexWrap: 'wrap',
            paddingBottom: '2rem',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <div style={{ position: 'relative' }}>
              <img
                src={photoPreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&size=120&background=random`}
                alt="Profile"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              {editing && (
                <div style={{ marginTop: '10px' }}>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ fontSize: '14px' }}
                  />
                  <button
                    onClick={handlePhotoUpload}
                    disabled={uploadingPhoto || !photoPreview || photoPreview === user.profilePhoto}
                    style={{
                      marginTop: '8px',
                      padding: '8px 16px',
                      backgroundColor: '#3b82f6',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: uploadingPhoto ? 'not-allowed' : 'pointer',
                      opacity: (uploadingPhoto || !photoPreview || photoPreview === user.profilePhoto) ? 0.5 : 1
                    }}
                  >
                    {uploadingPhoto ? 'Uploading...' : 'Upload Photo'}
                  </button>
                </div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                color: '#111827'
              }}>
                {user.name}
              </h2>
              <p style={{
                color: '#6b7280',
                marginBottom: '0.75rem',
                fontSize: '1rem'
              }}>
                {user.email}
              </p>
              <span style={{
                display: 'inline-block',
                padding: '0.375rem 0.75rem',
                backgroundColor: user.role === 'retailer' ? '#dbeafe' : '#d1fae5',
                color: user.role === 'retailer' ? '#1e40af' : '#065f46',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {user.role === 'retailer' ? 'Retailer' : 'Customer'}
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Name
              </label>
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                />
              ) : (
                <div style={{ padding: '10px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                  {user.name || 'Not set'}
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Email
              </label>
              <div style={{ padding: '10px', backgroundColor: '#f9fafb', borderRadius: '6px', color: '#6b7280' }}>
                {user.email} <span style={{ fontSize: '12px' }}>(read-only)</span>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                Phone Number
              </label>
              {editing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                />
              ) : (
                <div style={{ padding: '10px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                  {user.phone || 'Not set'}
                </div>
              )}
            </div>
          </div>

          <div style={{
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap'
          }}>
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    padding: '0.875rem 1.5rem',
                    backgroundColor: saving ? '#9ca3af' : '#2563eb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!saving) {
                      e.currentTarget.style.backgroundColor = '#1e40af'
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!saving) {
                      e.currentTarget.style.backgroundColor = '#2563eb'
                      e.currentTarget.style.transform = 'scale(1)'
                    }
                  }}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => {
                    setEditing(false)
                    setFormData({ name: user.name || '', phone: user.phone || '' })
                    setPhotoPreview(user.profilePhoto || null)
                    setError('')
                  }}
                  disabled={saving}
                  style={{
                    padding: '0.875rem 1.5rem',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e5e7eb'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6'
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditing(true)}
                  style={{
                    padding: '0.875rem 1.5rem',
                    backgroundColor: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1e40af'
                    e.currentTarget.style.transform = 'scale(1.02)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563eb'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => navigate('/orders')}
                  style={{
                    padding: '0.875rem 1.5rem',
                    backgroundColor: '#10b981',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#059669'
                    e.currentTarget.style.transform = 'scale(1.02)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#10b981'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  View Orders
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '0.875rem 1.5rem',
                    backgroundColor: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#dc2626'
                    e.currentTarget.style.transform = 'scale(1.02)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ef4444'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

