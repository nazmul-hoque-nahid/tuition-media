import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("applications"); // applications or bookings
  const [applications, setApplications] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Fetch applications for student's posts
  const fetchApplications = async () => {
    try {
      const res = await axios.get("https://tuition-media-production.up.railway.app/api/application/student", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch applications");
    }
  };

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get("https://tuition-media-production.up.railway.app/api/booking/student", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch bookings");
    }
  };

  // Accept or reject an application
  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://tuition-media-production.up.railway.app/api/application/update-status/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchApplications();
    } catch (err) {
      console.error(err);
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
        {applications.map((a) => (
          <div key={a.id} className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex flex-col gap-1 w-full md:w-2/3">
            
                <p>
  <span className="font-semibold">Tutor:</span>{" "}
  <Link to={`/tutor/${a.tutor_id}`} className="text-blue-600 font-bold hover:underline">
    {a.tutor_name}
  </Link>
</p>


              <p>
                <span className="font-semibold">Applied to Post:</span> Class {a.class} • {a.version} in {a.city}
              </p>

              <p>
                <span className="font-semibold">Status:</span> {a.status}
              </p>

              {a.status === "pending" && (
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(a.id, "accepted")}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(a.id, "rejected")}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Reject
                  </button>
                </div>
              )}

              {a.status === "accepted" && (
                <div className="mt-2 p-2 border-l-4 border-green-500 bg-green-50 rounded">
                  <p><span className="font-semibold">Email:</span> {a.tutor_email}</p>
                  <p><span className="font-semibold">Phone:</span> {a.tutor_phone}</p>
                </div>
              )}
            </div>

            <span className={`mt-4 md:mt-0 px-4 py-2 rounded-full font-semibold text-white ${
              a.status === "pending" ? "bg-yellow-500" :
              a.status === "accepted" ? "bg-green-500" : "bg-red-500"
            }`}>
              {a.status.toUpperCase()}
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
            <p>
  <span className="font-semibold">Tutor:</span>{" "}
  <Link to={`/tutor/${b.tutor_id}`} className="text-blue-600 font-bold hover:underline">
    {b.tutor_name}
  </Link>
</p>
            <p><span className="font-semibold">Date:</span> {new Date(b.date).toLocaleDateString()}</p>
            <p><span className="font-semibold">Time:</span> {b.time.slice(0, 5)}</p>
            <p><span className="font-semibold">Status:</span> {b.status}</p>

            {/* Show tutor contact info if accepted */}
            {b.status === "accepted" && (
              <div className="mt-2 p-2 border-l-4 border-green-500 bg-green-50 rounded">
                <p className="font-bold text-green-600">Tutor Details:</p>
                <p><span className="font-semibold">Email:</span> {b.tutor_email}</p>
                <p><span className="font-semibold">Phone:</span> {b.tutor_phone}</p>
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
          <p className="font-bold">Your Posts status</p>
        </button>
        <button
          className={`text-left px-4 py-2 rounded ${activeTab === "bookings" ? "bg-amber-200 font-semibold" : "hover:bg-gray-100"}`}
          onClick={() => setActiveTab("bookings")}
        >
         <p className="font-bold">Your Requests</p>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-16 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Student Dashboard</h1>
        {activeTab === "applications" ? renderApplications() : renderBookings()}
      </main>
    </div>
  );
};

export default StudentDashboard;
