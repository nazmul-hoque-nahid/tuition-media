import React, { useEffect, useState } from "react";
import axios from "axios";

const TutorDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("applications");

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [appsRes, bookingsRes] = await Promise.all([
        axios.get("https://tuition-media-production.up.railway.app/api/application/tutor", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("https://tuition-media-production.up.railway.app/api/booking/tutor", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setApplications(appsRes.data);
      setBookings(bookingsRes.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBookingStatus = async (id, status) => {
    try {
      await axios.put(`https://tuition-media-production.up.railway.app/api/booking/update-status/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } });

      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) return <p className="text-center mt-24 text-gray-700">Loading...</p>;
  if (error) return <p className="text-center mt-24 text-red-500">{error}</p>;

  return (
    <div className="pt-20 pt-20 min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md p-4 md:p-6 flex md:flex-col flex-row gap-3 md:gap-4 justify-around md:justify-start sticky top-0 z-10">
        <h2 className="text-lg md:text-xl font-bold hidden md:block">Dashboard</h2>

        <button
          className={`text-left px-4 py-2 rounded w-full md:w-auto ${activeTab === "applications" ? "bg-amber-200 font-semibold" : "hover:bg-gray-100"}`}
          onClick={() => setActiveTab("applications")}
        >
          <p className="font-bold text-sm md:text-base">Your Applications</p>
        </button>

        <button
          className={`text-left px-4 py-2 rounded w-full md:w-auto ${activeTab === "bookings" ? "bg-amber-200 font-semibold" : "hover:bg-gray-100"}`}
          onClick={() => setActiveTab("bookings")}
        >
          <p className="font-bold text-sm md:text-base">Student Bookings</p>
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-16 overflow-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Tutor Dashboard</h1>

        {activeTab === "applications" && (
          <div className="flex flex-col gap-4 md:gap-6">
            {applications.length === 0 ? (
              <p className="text-gray-600">No applications found.</p>
            ) : (
              applications.map((a) => (
                <div key={a.id} className="bg-white shadow-lg rounded-xl p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex flex-col gap-1 w-full md:w-2/3 text-sm md:text-base">
                    <p><span className="font-semibold">Class:</span> {a.class} • {a.version}</p>
                    <p><span className="font-semibold">Time:</span> {a.time} | {a.duration}</p>
                    <p><span className="font-semibold">City:</span> {a.city}</p>

                    {a.status === "accepted" && (
                      <div className="mt-2 p-2 border-l-4 border-green-500 bg-green-50 rounded text-sm">
                        <p className="font-bold text-green-600">Student Details:</p>
                        <p><span className="font-semibold">Name:</span> {a.student_name}</p>
                        <p><span className="font-semibold">Email:</span> {a.student_email}</p>
                        <p><span className="font-semibold">Phone:</span> {a.student_phone}</p>
                        <p><span className="font-semibold">Gender:</span> {a.student_gender}</p>
                        <p><span className="font-semibold">City:</span> {a.student_city}</p>
                      </div>
                    )}
                  </div>

                  <span className={`mt-4 md:mt-0 px-4 py-1 md:py-2 rounded-full font-semibold text-white text-sm md:text-base ${
                    a.status === "pending" ? "bg-yellow-500" :
                    a.status === "accepted" ? "bg-green-500" : "bg-red-500"
                  }`}>
                    {a.status.toUpperCase()}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="flex flex-col gap-4 md:gap-6">
            {bookings.length === 0 ? (
              <p className="text-gray-600">No bookings found.</p>
            ) : (
              bookings.map((b) => (
                <div key={b.id} className="bg-white shadow-lg rounded-xl p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex flex-col gap-1 w-full md:w-2/3 text-sm md:text-base">
                    <p><span className="font-semibold">Student:</span> {b.student_name}</p>
                    <p><span className="font-semibold">Date:</span> {new Date(b.date).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Time:</span> {b.time.slice(0, 5)}</p>

                    {b.status === "accepted" && (
                      <div className="mt-2 p-2 border-l-4 border-green-500 bg-green-50 rounded text-sm">
                        <p className="font-bold text-green-600">Student Details:</p>
                        <p><span className="font-semibold">Email:</span> {b.student_email}</p>
                        <p><span className="font-semibold">Phone:</span> {b.student_phone}</p>
                        <p><span className="font-semibold">Gender:</span> {b.student_gender}</p>
                        <p><span className="font-semibold">City:</span> {b.student_city}</p>
                      </div>
                    )}

                    {b.status === "pending" && (
                      <div className="mt-2 flex gap-2 flex-wrap">
                        <button
                          onClick={() => handleBookingStatus(b.id, "accepted")}
                          className="px-3 py-2 bg-green-500 text-white rounded text-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleBookingStatus(b.id, "rejected")}
                          className="px-3 py-2 bg-red-500 text-white rounded text-sm"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>

                  <span className={`mt-4 md:mt-0 px-4 py-1 md:py-2 rounded-full font-semibold text-white text-sm md:text-base ${
                    b.status === "pending" ? "bg-yellow-500" :
                    b.status === "accepted" ? "bg-green-500" : "bg-red-500"
                  }`}>
                    {b.status.toUpperCase()}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default TutorDashboard;
