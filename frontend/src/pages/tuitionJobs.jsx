import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TuitionCard from '../components/TuitionCard';
import axios from 'axios';

const TuitionJobs = () => {
  const [tuitionJobs, setTuitionJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [filters, setFilters] = useState({
    city: '',
    class: '',
    version: '',
    duration: '',
    gender: '',
    tutor_gender: '',
    minSalary: '',
    maxSalary: '',
    days_per_week: '',
    method:''
  });

  // Handle input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch all jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('https://tuition-media-production.up.railway.app/api/post', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setTuitionJobs(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load tuition jobs.');
    } finally {
      setLoading(false);
    }
  };

  // Search/filter jobs
  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      Object.keys(filters).forEach((key) => {
        if (filters[key]) params[key] = filters[key];
      });

      const res = await axios.get('https://tuition-media-production.up.railway.app/api/post/search', {
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setTuitionJobs(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to search tuition jobs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4" style={{textAlign: "center"}}>Search Tuition Jobs</h1>
    

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={filters.city}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="class"
            placeholder="Class"
            value={filters.class}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          />
          <select
            name="version"
            value={filters.version}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="">Version</option>
            <option value="Bangla">Bangla</option>
            <option value="English">English</option>
            <option value="British Curriculum">British Curriculum</option>
          </select>
          <select
            name="duration"
            value={filters.duration}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="">Duration</option>
            <option value="1 hour">1 hour</option>
            <option value="1.5 hours">1.5 hours</option>
            <option value="2 hours">2 hours</option>
            <option value="2.5 hours">2.5 hours</option>
          </select>

          <select
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="">Student Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select
            name="tutor_gender"
            value={filters.tutor_gender}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="">Preferred Tutor Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Any">Any</option>
          </select>

          <input
            type="number"
            name="minSalary"
            placeholder="Min Salary"
            value={filters.minSalary}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="maxSalary"
            placeholder="Max Salary"
            value={filters.maxSalary}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="days_per_week"
            placeholder="Days per Week"
            value={filters.days_per_week}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          />
  
             <select
            name="method"
            value={filters.method}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="">Tuition Method</option>
            <option value="Online">Online</option>
            <option value="Home">Home</option>
            <option value="Any">Any</option>
          
          </select>


          <button
            onClick={handleSearch}
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
          >
            Search
          </button>
        </div>
                  
         <h2 className="text-2xl font-semibold mb-4 bg-amber-100" style={{textAlign: "center"}}> Tuition Jobs For You</h2>
          <div className=' mt-2'>
             {/* Loading */}
        {loading && <p className="text-center text-gray-600 text-lg">Loading jobs...</p>}

        {/* Error */}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}

        {/* Jobs */}
        {!loading && !error && tuitionJobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tuitionJobs.map((job) => (
              <TuitionCard key={job.post_id} job={job} />
            ))}
          </div>
        )}

        {/* No Jobs */}
        {!loading && tuitionJobs.length === 0 && (
          <p className="text-center text-gray-600">No tuition posts available right now.</p>
        )}
          
        </div>

      
      </div>

  
    </div>
  );
};

export default TuitionJobs;
