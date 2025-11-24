// BookTutor.jsx
import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";

const BookTutor = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
        const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/api/booking/create", {
        tutor_id: id,
        student_id: user.id,
        date,
        time,
        message,
      },
    
       {
        headers: {
          Authorization: `Bearer ${token}`, // <-- send token here
        },
      }
    );
      navigate("/student-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to book tutor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Book Tutor
        </h1>

        {error && (
          <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Optional message for the tutor"
              className="border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-amber-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-amber-600 transition-transform transform hover:scale-105"
          >
            {loading ? "Booking..." : "Send Booking Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookTutor;
