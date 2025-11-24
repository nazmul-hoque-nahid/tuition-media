// CreatePost.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cities } from '../components/Cities.js';
import { subjects } from '../components/Classes.js';

import axios from 'axios';

const CreatePost = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [post, setPost] = useState({
    class: '',
    version: '',
    days_per_week: '',
    time: '',
    duration: '',
    gender: '',
    students: '',
    salary: '',
    city: '',
    tutor_gender: '',
     method: ''
  });
  const [loading, setLoading] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [error, setError] = useState('');

  // Get user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  if (!user || user.role !== 'Student') {
    return (
      <p className="text-center mt-24 text-red-500">
        Only students can create posts.
      </p>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };
const handleSubjectChange = (sub) => {
  setSelectedSubjects(prev =>
    prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
  );
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to create a post.');
        setLoading(false);
        return;
      }

     await axios.post(
  'http://localhost:3000/api/post/create',
  { ...post, student_id: user.id, subjects: selectedSubjects },
  { headers: { Authorization: `Bearer ${token}` } }
);


      alert('Post created successfully!');
      navigate('/tuitionJobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Tuition Post
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Class */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Class</label>
            <input
              type="number"
              name="class"
              value={post.class}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>

          {/* Version */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Version</label>
            <select
              name="version"
              value={post.version}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
            >
              <option value="">Select Version</option>
              <option value="Bangla">Bangla</option>
              <option value="English">English</option>
              <option value="British Curriculum">British Curriculum</option>
            </select>
          </div>

          {/* Days per Week */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Days per Week</label>
            <input
              type="number"
              name="days_per_week"
              value={post.days_per_week}
              onChange={handleChange}
              required
              min="1"
              max="7"
              className="border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>

          {/* Time */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={post.time}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>

          {/* Duration */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Duration</label>
            <select
              name="duration"
              value={post.duration}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
            >
              <option value="">Select Duration</option>
              <option value="1 hour">1 hour</option>
              <option value="1.5 hours">1.5 hours</option>
              <option value="2 hours">2 hours</option>
              <option value="2.5 hours">2.5 hours</option>
            </select>
          </div>

          {/* Student Gender */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Student Gender</label>
            <select
              name="gender"
              value={post.gender}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Number of Students */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Number of Students</label>
            <input
              type="number"
              name="students"
              value={post.students}
              onChange={handleChange}
              required
              min="1"
              className="border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>

          {/* Salary */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Salary (৳)</label>
            <input
              type="number"
              name="salary"
              value={post.salary}
              onChange={handleChange}
              required
              min="0"
              className="border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
            />
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">City</label>
            <select
              name="city"
              value={post.city}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
            >
              <option value="">Select City</option>
              {cities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Preferred Tutor Gender */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Preferred Tutor Gender</label>
            <select
              name="tutor_gender"
              value={post.tutor_gender}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Any">Any</option>
            </select>
          </div>

          {/* Method (Online / House) */}
<div className="flex flex-col">
  <label className="font-semibold mb-1">Method</label>
  <select
    name="method"
    value={post.method}
    onChange={handleChange}
    required
    className="border-2 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
  >
    <option value="">Select Method</option>
    <option value="Online">Online</option>
    <option value="Home">Home</option>
    <option value="Any">Any</option>
  </select>
</div>
{/* Subjects */}
<div className="md:col-span-2 flex flex-col">
  <label className="font-semibold mb-1">Subjects</label>
  <div className="grid grid-cols-2 gap-2">
    {subjects.map(sub => (
      <label key={sub} className="flex items-center gap-2 text-gray-800">
        <input
          type="checkbox"
          checked={selectedSubjects.includes(sub)}
          onChange={() => handleSubjectChange(sub)}
        />
        {sub}
      </label>
    ))}
  </div>
</div>


          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-amber-600 text-white font-bold rounded-full hover:bg-amber-700 transition transform hover:scale-105"
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
