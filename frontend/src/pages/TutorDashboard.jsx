import React, { useEffect, useState } from "react";
import axios from "axios";

const TutorDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("applications"); // applications or bookings

  const token = localStorage.getItem("token");

  // Fetch tutor applications
  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/application/tutor",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch applications");
    }
  };

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/booking/tutor", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch bookings");
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await fetchApplications();
      await fetchBookings();
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading) return <p className="text-center mt-24 text-gray-700">Loading...</p>;
  if (error) return <p className="text-center mt-24 text-red-500">{error}</p>;

  const renderApplications = () => (
    applications.length === 0 ? (
      <p className="text-gray-600">No applications found.</p>
    ) : (
      <div className="flex flex-col gap-6">
        {applications.map((app) => (
          <div key={app.id} className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex flex-col gap-1 w-full md:w-2/3">
              <p><span className="font-semibold">Class:</span> {app.class} • {app.version}</p>
              <p><span className="font-semibold">Time:</span> {app.time} | {app.duration}</p>
              <p><span className="font-semibold">City:</span> {app.city}</p>

              {app.status === "accepted" && (
                <div className="mt-2 p-2 border-l-4 border-green-500 bg-green-50 rounded">
                  <p className="font-bold text-green-600">Student Details:</p>
                  <p><span className="font-semibold">Name:</span> {app.student_name}</p>
                  <p><span className="font-semibold">Email:</span> {app.student_email}</p>
                  <p><span className="font-semibold">Phone:</span> {app.student_phone}</p>
                  <p><span className="font-semibold">Gender:</span> {app.student_gender}</p>
                </div>
              )}
            </div>

            <span className={`mt-4 md:mt-0 px-4 py-2 rounded-full font-semibold text-white ${
              app.status === "pending" ? "bg-yellow-500" :
              app.status === "accepted" ? "bg-green-500" : "bg-red-500"
            }`}>
              {app.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    )
  );

  const renderBookings = () => (
    bookings.length === 0 ? (
      <p className="text-gray-600">No bookings found.</p>
    ) : (
      <div className="flex flex-col gap-6">
        {bookings.map((b) => (
          <div key={b.id} className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex flex-col gap-1 w-full md:w-2/3">
              <p><span className="font-semibold">Student:</span> {b.student_name}</p>
              <p><span className="font-semibold">Date:</span> {new Date(b.date).toLocaleDateString()}</p>
              <p><span className="font-semibold">Time:</span> {b.time.slice(0, 5)}</p>
              {b.message && <p><span className="font-semibold">Message:</span> {b.message}</p>}

              {b.status === "accepted" && (
                <div className="mt-2 p-2 border-l-4 border-green-500 bg-green-50 rounded">
                  <p className="font-bold text-green-600">Student Details:</p>
                  <p><span className="font-semibold">Email:</span> {b.student_email}</p>
                  <p><span className="font-semibold">Phone:</span> {b.student_phone}</p>
                  <p><span className="font-semibold">Gender:</span> {b.student_gender}</p>
                  <p><span className="font-semibold">City:</span> {b.student_city}</p>
                </div>
              )}
            </div>

            <span className={`mt-4 md:mt-0 px-4 py-2 rounded-full font-semibold text-white ${
              b.status === "pending" ? "bg-yellow-500" :
              b.status === "accepted" ? "bg-green-500" : "bg-red-500"
            }`}>
              {b.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <button
          className={`text-left px-4 py-2 rounded ${activeTab === "applications" ? "bg-amber-200 font-semibold" : "hover:bg-gray-100"}`}
          onClick={() => setActiveTab("applications")}
        >
         <p className="font-bold">Your Applications</p>
        </button>
        <button
          className={`text-left px-4 py-2 rounded ${activeTab === "bookings" ? "bg-amber-200 font-semibold" : "hover:bg-gray-100"}`}
          onClick={() => setActiveTab("bookings")}
        >
          <p className="font-bold">Requests from Students</p>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-16 overflow-auto ">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tutor Dashboard</h1>
        {activeTab === "applications" ? renderApplications() : renderBookings()}
      </main>
    </div>
  );
};

export default TutorDashboard;
