import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { UserContext } from '../context/UserContext.jsx';
import Default from "../assets/default.jpg";
// Haversine Distance
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in KM
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (R * c).toFixed(2);
};

const TutorProfile = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/tutor/public/${id}`
        );

        setTutor(res.data);

        // 🔒 Safe distance calculation only if logged in and role is student
        if (
          user?.role === "Student" &&
          user?.latitude &&
          user?.longitude &&
          res.data.latitude &&
          res.data.longitude
        ) {
          const km = calculateDistance(
            user.latitude,
            user.longitude,
            res.data.latitude,
            res.data.longitude
          );
          setDistance(km);
        }

      } catch (err) {
        setError(err.response?.data?.message || "Failed to load tutor profile");
      } finally {
        setLoading(false);
      }
    };

    fetchTutor();
  }, [id]); // 👍 user removed

  if (loading)
    return <p className="text-center mt-24 text-white">Loading...</p>;

  if (error)
    return <p className="text-center mt-24 text-red-500">{error}</p>;

  if (!tutor)
    return <p className="text-center mt-24 text-white">Tutor not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="pt-24 pb-8 bg-blue-500 text-white">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 w-fit hover:opacity-80"
          >
            ← Back to Tutors
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <img
              src={tutor.profile_pic_url || Default}
              alt={tutor.name}
              className="w-48 h-48 rounded-full border-4 border-white shadow-lg object-cover"
            />

            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{tutor.name}</h1>
                 {tutor.gender && <p className="text-lg mb-2">Gender: {tutor.gender}</p>}
              {/* Quick Info */}
              <div className="flex flex-col md:flex-row gap-4 text-sm mt-4">
                <span>📍 {tutor.city || "N/A"}</span>
                <span>💼 {tutor.yearsOfExperience || "0"} years experience</span>
                <span>🏫 {tutor.institute || "N/A"}</span>

                {/* Distance only if student & distance calculated */}
                {user?.role === "Student" && distance !== null && (
                  <span>🚗 {distance} km away</span>
                )}
              </div>

              {/* Subjects */}
              {tutor.subjects?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="font-semibold text-white">Subjects:</span>
                  {tutor.subjects.map((sub) => (
                    <span
                      key={sub}
                      className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              )}

              {/* Classes */}
              {tutor.classes?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="font-semibold text-white">Classes:</span>
                  {tutor.classes.map((cls) => (
                    <span
                      key={cls}
                      className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs"
                    >
                      {cls}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About Me */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
          <p className="text-gray-700">{tutor.bio || "No bio provided."}</p>
        </div>
      </div>

      {/* Book Tutor button for students only */}
      {user?.role === "Student" && (
        <div className="container mx-auto px-4 py-6 text-center">
          <button
            onClick={() => navigate(`/book-tutor/${tutor.id}`)}
            className="bg-blue-600 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            Book Tutor
          </button>
        </div>
      )}
    </div>
  );
};

export default TutorProfile;
