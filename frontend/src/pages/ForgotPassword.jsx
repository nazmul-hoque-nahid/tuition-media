import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
    const location = useLocation();
const role = location.state?.role || 'tutor'; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const res = await axios.post(`http://localhost:3000/api/${role}/forgot-password`, { email });
      setMessage(res.data.message || 'Check your email for reset link.');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

      {message && <p className="text-green-500 text-sm mb-2">{message}</p>}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
        />

        <button
          type="submit"
          className="w-full bg-amber-500 text-white p-2 rounded-lg hover:opacity-95 transition"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
