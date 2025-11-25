import React, { useState } from 'react'
import axios from 'axios'
import { useSearchParams, useNavigate } from 'react-router-dom'

const OTPVerify = () => {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const [params] = useSearchParams()
  const userId = params.get("userId")
  const role = params.get("role") // 'tutor' or 'student'

  const handleVerify = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!/^\d{6}$/.test(otp)) {
      setError("OTP must be 6 digits")
      return
    }

    setLoading(true)
    try {
      const res = await axios.post(
        `https://tuition-media-production.up.railway.app/api/${role}/verify-otp`,
        { userId, otp, role }
      )

      setSuccess("OTP verified! Please log in.")

      // ⏳ Wait 1 second before redirect
      setTimeout(() => {
        navigate("/login")
      }, 1000)

    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
      <p className="text-2xl mb-4 text-center">
        Please check your Mailbox and Spam for the OTP
      </p>

      <h2 className="text-2xl font-bold mb-4 text-center">Enter 6-digit OTP</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      <form onSubmit={handleVerify} className="space-y-3">
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP here"
          className="w-full border p-2 rounded-lg"
          maxLength={6}
        />
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-amber-500 text-white p-2 rounded-lg"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  )
}

export default OTPVerify
