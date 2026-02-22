'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Phone validation
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,}$/
    return phoneRegex.test(phone.replace(/\D/g, ''))
  }

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++
    return strength
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    }

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value))
    }

    setFormData(newFormData)
  }

  // Get password strength label
  const getPasswordStrengthLabel = () => {
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong']
    return labels[passwordStrength] || ''
  }

  // Get password strength color
  const getPasswordStrengthColor = () => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500', 'bg-green-600']
    return colors[passwordStrength] || 'bg-gray-300'
  }

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation checks
    if (!formData.name.trim()) {
      setError('⚠️ Name is required.')
      return
    }

    if (formData.name.trim().length < 3) {
      setError('⚠️ Name must be at least 3 characters long.')
      return
    }

    if (!formData.email.trim()) {
      setError('⚠️ Email is required.')
      return
    }

    if (!validateEmail(formData.email)) {
      setError('⚠️ Please enter a valid email address.')
      return
    }

    if (!formData.phone.trim()) {
      setError('⚠️ Phone number is required.')
      return
    }

    if (!validatePhone(formData.phone)) {
      setError('⚠️ Please enter a valid phone number (10+ digits).')
      return
    }

    if (!formData.password) {
      setError('⚠️ Password is required.')
      return
    }

    if (formData.password.length < 8) {
      setError('⚠️ Password must be at least 8 characters long.')
      return
    }

    if (passwordStrength < 2) {
      setError('⚠️ Password is too weak. Use uppercase, lowercase, numbers, and symbols.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('⚠️ Passwords do not match.')
      return
    }

    if (!formData.terms) {
      setError('⚠️ Please accept the terms and conditions.')
      return
    }

    try {
      setLoading(true)

      // Get existing users
      const storedUsers = JSON.parse(localStorage.getItem('tourismUsers') || '[]')

      // Check if email already exists
      if (storedUsers.some(u => u.email === formData.email)) {
        setError('❌ Email already registered. Please login or use a different email.')
        setLoading(false)
        return
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        email: formData.email.toLowerCase(),
        phone: formData.phone,
        password: formData.password, // In real app, hash with bcrypt
        createdAt: new Date().toISOString(),
        verified: false
      }

      // Save user
      storedUsers.push(newUser)
      localStorage.setItem('tourismUsers', JSON.stringify(storedUsers))

      setSuccess('✅ Registration successful! Redirecting to login...')

      // Clear form
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          terms: false
        })
        setPasswordStrength(0)
        router.push('/login')
      }, 2000)

    } catch (err) {
      setError('❌ Registration failed. Please try again.')
      console.error('Registration error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative py-8"
      style={{
        backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Register Container */}
      <div className="relative z-10 w-full max-w-md px-6 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-10 text-white">
            <h1 className="text-3xl font-bold text-center mb-2"> Create Account</h1>
          </div>

          {/* Form Section */}
          <div className="px-6 py-8">

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-slideIn">
                <p className="text-red-700 text-sm font-semibold">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg animate-slideIn">
                <p className="text-green-700 text-sm font-semibold">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  👤 Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors duration-200 disabled:bg-gray-100"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  📧 Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors duration-200 disabled:bg-gray-100"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  📱 Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="+977*******"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors duration-200 disabled:bg-gray-100"
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    🔒 Password
                  </label>
                  {formData.password && (
                    <span className={`text-xs font-bold ${
                      passwordStrength < 2 ? 'text-red-600' : 
                      passwordStrength < 3 ? 'text-yellow-600' : 
                      'text-green-600'
                    }`}>
                      {getPasswordStrengthLabel()}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-4 py-3 border-2 text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors duration-200 disabled:bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="absolute right-3 top-3 text-gray-600 hover:text-green-600 disabled:opacity-50 transition"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full w-full transition-all duration-300 ${getPasswordStrengthColor()}`} 
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  🔒 Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-4 py-3 border-2 text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors duration-200 disabled:bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                    className="absolute right-3 top-3 text-gray-600 hover:text-green-600 disabled:opacity-50 transition"
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {formData.password && formData.confirmPassword && (
                  <p className={`text-xs mt-2 font-semibold ${
                    formData.password === formData.confirmPassword 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {formData.password === formData.confirmPassword 
                      ? '✓ Passwords match' 
                      : '✗ Passwords do not match'}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500 cursor-pointer disabled:opacity-50 mt-0.5"
                />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-700 cursor-pointer hover:text-gray-900">
                  I agree to the{' '}
                  <Link href="/terms" className="text-green-600 hover:text-green-800 font-semibold">
                    Terms and Conditions
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-green-600 hover:text-green-800 font-semibold">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed opacity-80'
                    : 'bg-gradient-to-r from-green-600 to-blue-600 hover:shadow-lg hover:scale-105 active:scale-95'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="inline-block animate-spin mr-2">⏳</span>
                    Creating Account...
                  </span>
                ) : (
                  '✨ Create Account'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t-2 border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm font-medium">already registered?</span>
              <div className="flex-1 border-t-2 border-gray-300"></div>
            </div>

            {/* Login Link */}
            <p className="text-center text-gray-700 font-medium">
              Have an account?{' '}
              <Link href="/login" className="text-green-600 hover:text-green-800 font-bold transition">
                Sign In
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-center text-gray-600 text-xs">
              © 2024 Nepal Tourism Management. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
