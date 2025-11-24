import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterCard = () => {
  const [role, setRole] = useState('tutor')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      const res = await axios.post(
        role === 'tutor'
          ? 'http://localhost:3000/api/tutor/register'
          : 'http://localhost:3000/api/student/register',
        { fullName, phone, email, password },
        { withCredentials: true }
      )

      setSuccess(res.data.message || "OTP sent to your email")
      navigate(`/verify-otp?userId=${res.data.userId}&role=${role}`)
    } catch (err) {
      const errors = err.response?.data?.errors
      if (errors) {
        const allMessages = errors.map(e => e.msg).join(", ")
        setError(allMessages)
      } else {
        setError(err.response?.data?.message || "Registration failed")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-10 relative overflow-hidden"
    >
      {/* Gradient Background Circles */}
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-gradient-to-br from-amber-400 to-yellow-300 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-3xl opacity-50"></div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Create Account</h2>
      <p className="text-gray-500 text-center mb-6">Sign up as a Tutor or Student</p>

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4 text-center">{success}</p>}

      {/* Role Toggle */}
      <div className="flex justify-center gap-6 mb-6">
        {['tutor', 'student'].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              role === r
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleRegister}>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="01XXXXXXXXX"
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Confirm</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl shadow-lg transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
          <a href="/login" className="text-amber-600 hover:underline">Already have an account?</a>
          <a href="/forgot-password" className="text-amber-600 hover:underline">Reset Password</a>
        </div>
      </form>
    </motion.div>
  )
}

export default RegisterCard
