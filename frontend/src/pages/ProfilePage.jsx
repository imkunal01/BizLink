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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '40px 20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>My Profile</h1>
          <p style={{ color: '#666' }}>Manage your account settings and information</p>
        </div>

        {error && (
          <div style={{ 
            padding: '12px 16px', 
            backgroundColor: '#fee', 
            color: '#c33', 
            borderRadius: '8px', 
            marginBottom: '20px' 
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ 
            padding: '12px 16px', 
            backgroundColor: '#efe', 
            color: '#3c3', 
            borderRadius: '8px', 
            marginBottom: '20px' 
          }}>
            {success}
          </div>
        )}

        <div style={{ 
          backgroundColor: '#fff', 
          borderRadius: '12px', 
          padding: '30px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={photoPreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&size=120&background=random`}
                alt="Profile"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #e2e8f0'
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
              <h2 style={{ fontSize: '24px', marginBottom: '5px' }}>{user.name}</h2>
              <p style={{ color: '#666', marginBottom: '5px' }}>{user.email}</p>
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                backgroundColor: user.role === 'retailer' ? '#dbeafe' : '#f0fdf4',
                color: user.role === 'retailer' ? '#1e40af' : '#166534',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '500'
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

          <div style={{ marginTop: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    opacity: saving ? 0.5 : 1
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
                    padding: '12px 24px',
                    backgroundColor: '#e5e7eb',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Edit Profile
              </button>
            )}
            <button
              onClick={() => navigate('/orders')}
              style={{
                padding: '12px 24px',
                backgroundColor: '#10b981',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              View Orders
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: '12px 24px',
                backgroundColor: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

