import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('tutor'); // default role
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email.trim()) {
      setError('Email is required.');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `https://tuition-media-production.up.railway.app/api/${role}/forgot-password`,
        { email }
      );

      setMessage(res.data.message || 'Check your email for the reset link.');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

      {message && <p className="text-green-600 text-sm mb-2">{message}</p>}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">

        {/* Role Selection Dropdown */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
        >
          <option value="tutor">Tutor</option>
          <option value="student">Student</option>
        </select>

        {/* Email Input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-amber-500 text-white p-2 rounded-lg hover:opacity-95 transition ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
