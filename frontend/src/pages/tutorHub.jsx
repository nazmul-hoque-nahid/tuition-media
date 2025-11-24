import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import TutorCard from '../components/TutorCard'
import { institutes } from '../components/Institutes.js';
import { cities } from '../components/Cities.js';

import axios from 'axios'

const TutorHub = () => {
  const [tutors, setTutors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null) // <-- Add user state

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))

    const fetchTutors = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tutor/getAllTutors')
        if (!response.ok) throw new Error('Failed to fetch tutors')
        const data = await response.json()
        setTutors(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTutors()
  }, [])

  const [filters, setFilters] = useState({
    institute: '',
    city: '',
    maxDistance: '', // in km
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSearch = async () => {
    setLoading(true)
    setError('')
    try {
      const params = { ...filters }

      // If logged-in student, send location
      if (user?.role === 'Student') {
        params.studentLat = user.latitude
        params.studentLng = user.longitude
      }

      const res = await axios.get('http://localhost:3000/api/tutor/search', { params })
      setTutors(res.data)
    } catch (err) {
      setError('Failed to search tutors')
    } finally {
      setLoading(false)
    }
  }

return (
  <div className="min-h-screen bg-gray-100">
    <Navbar />

    {/* Hero Section */}
    <div className="pt-24 pb-12 bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          Find Your Perfect Tutor
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Browse experienced tutors near you and take your learning to the next level.
        </p>

        {/* Search Filters */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-5xl mx-auto">
          {/* Institute */}
          <select
            name="institute"
            value={filters.institute}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none w-full md:w-64"
          >
            <option value="">Select Institute</option>
            {institutes.map((inst) => (
              <option key={inst} value={inst}>{inst}</option>
            ))}
          </select>

          {/* City */}
          <select
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none w-full md:w-64"
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
            <select
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none w-full md:w-64"
          >
            <option value="">Select Gender</option>
           <option value="Male">Male</option>
           <option value="Female">Female</option>
           

            </select>
          {/* Max Distance */}
          {user?.role === 'Student' && (
            <input
              type="number"
              name="maxDistance"
              placeholder="Max Distance (km)"
              value={filters.maxDistance}
              onChange={handleFilterChange}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none w-full md:w-64"
            />
          )}

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all duration-300 w-full md:w-auto"
          >
            Search
          </button>
        </div>
      </div>
    </div>

    {/* Tutors Grid */}
    <div className="container mx-auto px-4 py-16">
      {loading ? (
        <p className="text-center text-gray-600">Loading tutors...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : tutors.length === 0 ? (
        <p className="text-center text-gray-500">No tutors found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <TutorCard tutor={tutor} />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

}

export default TutorHub
