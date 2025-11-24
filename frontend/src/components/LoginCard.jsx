import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext.jsx'

const LoginCard = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Tutor')
  const [error, setError] = useState('')
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `http://localhost:3000/api/${role}/login`,
        { email, password },
        { withCredentials: true }
      )
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setUser(res.data.user)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-10 relative overflow-hidden"
    >
      {/* Gradient Header */}
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-gradient-to-br from-amber-400 to-yellow-300 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-3xl opacity-50"></div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome Back</h2>
      <p className="text-gray-500 text-center mb-6">Login to your account</p>

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      <form className="space-y-4" onSubmit={handleLogin}>
        {/* Role Toggle */}
        <div className="flex justify-center gap-6 mb-4">
          {['Tutor', 'Student'].map((r) => (
            <button
              type="button"
              key={r}
              onClick={() => setRole(r)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                role === r
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl shadow-lg transition"
        >
          Log In
        </button>

        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
          <Link to="/register" className="text-amber-600 hover:underline">
            Create Account
          </Link>
          <Link to="/forgot-password" state={{ role: role.toLowerCase() }} className="text-amber-600 hover:underline">
            Reset Password
          </Link>
        </div>
      </form>
    </motion.div>
  )
}

export default LoginCard
