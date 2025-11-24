// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaChalkboardTeacher, FaClipboard, FaFileAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [students, setStudents] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [posts, setPosts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const adminToken = localStorage.getItem("adminToken") ;

  const headers = { Authorization: `Bearer ${adminToken}` };

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [rStats, rStudents, rTutors, rPosts, rApps] = await Promise.all([
        axios.get("http://localhost:3000/api/admin/stats", { headers }),
        axios.get("http://localhost:3000/api/admin/students", { headers }),
        axios.get("http://localhost:3000/api/admin/tutors", { headers }),
        axios.get("http://localhost:3000/api/admin/posts", { headers }),
        axios.get("http://localhost:3000/api/admin/applications", { headers }),
      ]);
      setStats(rStats.data || {});
      setStudents(rStudents.data || []);
      setTutors(rTutors.data || []);
      setPosts(rPosts.data || []);
      setApplications(rApps.data || []);
    } catch (err) {
      console.error("Admin fetch error:", err);
      alert(err.response?.data?.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Delete this ${type}? This is permanent.`)) return;
    try {
      await axios.delete(`http://localhost:3000/api/admin/delete/${type}/${id}`, { headers });
      alert("Deleted");
      fetchAll();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <p className="text-center mt-24">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-md p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <p className="text-sm text-gray-500">Overview & management</p>
        </div>

        <nav className="flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`text-left p-3 rounded ${activeTab === "overview" ? "bg-amber-50 font-semibold" : "hover:bg-gray-50"}`}>
            Overview
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`text-left p-3 rounded ${activeTab === "posts" ? "bg-amber-50 font-semibold" : "hover:bg-gray-50"}`}>
            Posts ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`text-left p-3 rounded ${activeTab === "applications" ? "bg-amber-50 font-semibold" : "hover:bg-gray-50"}`}>
            Applications ({stats.total_applications || 0})
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`text-left p-3 rounded ${activeTab === "students" ? "bg-amber-50 font-semibold" : "hover:bg-gray-50"}`}>
            Students ({stats.total_students || 0})
          </button>
          <button
            onClick={() => setActiveTab("tutors")}
            className={`text-left p-3 rounded ${activeTab === "tutors" ? "bg-amber-50 font-semibold" : "hover:bg-gray-50"}`}>
            Tutors ({stats.total_tutors || 0})
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {activeTab === "overview" && (
          <section>
            <h1 className="text-3xl font-bold mb-6">Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded shadow flex items-center gap-4">
                <FaUsers className="text-amber-600" size={28} />
                <div>
                  <p className="text-sm text-gray-500">Students</p>
                  <p className="text-2xl font-bold">{stats.total_students || 0}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded shadow flex items-center gap-4">
                <FaChalkboardTeacher className="text-amber-600" size={28} />
                <div>
                  <p className="text-sm text-gray-500">Tutors</p>
                  <p className="text-2xl font-bold">{stats.total_tutors || 0}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded shadow flex items-center gap-4">
                <FaClipboard className="text-amber-600" size={28} />
                <div>
                  <p className="text-sm text-gray-500">Posts</p>
                  <p className="text-2xl font-bold">{stats.total_posts || 0}</p>
                  <div className="text-sm text-gray-500 mt-1">
                    Open: {stats.open_posts || 0} • Filled: {stats.filled_posts || 0}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded shadow">
                <h3 className="font-semibold mb-3">Applications</h3>
                <div className="text-sm text-gray-700">
                  Total: {stats.total_applications || 0} • Pending: {stats.pending_apps || 0} • Accepted: {stats.accepted_apps || 0} • Rejected: {stats.rejected_apps || 0}
                </div>
              </div>

              <div className="bg-white p-6 rounded shadow">
                <h3 className="font-semibold mb-3">Quick actions</h3>
                <p className="text-sm text-gray-600">Use the side menu to manage users, posts and applications.</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "posts" && (
          <section>
            <h1 className="text-3xl font-bold mb-6">All Posts ({posts.length})</h1>
            <div className="flex flex-col gap-4">
              {posts.map((p) => (
                <div key={p.post_id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Class {p.class} • {p.version}</div>
                    <div className="text-sm text-gray-600">{p.city} • {p.time} • {p.duration}</div>
                    <div className="text-sm text-gray-500 mt-1">Posted by: {p.student_name} ({p.student_email})</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{p.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "applications" && (
          <section>
            <h1 className="text-3xl font-bold mb-6">Applications ({applications.length})</h1>
            <div className="flex flex-col gap-4">
              {applications.map((a) => (
                <div key={a.id} className="bg-white p-4 rounded shadow flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="font-semibold">{a.class || ""} • {a.version || ""} — {a.city}</div>
                    <div className="text-sm text-gray-600">Post ID: {a.post_id}</div>
                    <div className="text-sm text-gray-600 mt-1">Tutor: {a.tutor_name} ({a.tutor_email})</div>
                    <div className="text-sm text-gray-600">Applied: {new Date(a.applied_at).toLocaleString()}</div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-white ${a.application_status === 'accepted' ? 'bg-green-500' : a.application_status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                      {String(a.application_status).toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "students" && (
          <section>
            <h1 className="text-3xl font-bold mb-6">Students ({students.length})</h1>
            <div className="bg-white rounded shadow overflow-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">City</th>
                    <th className="p-3">Gender</th>
                    <th className="p-3">Created</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.id} className="border-t">
                      <td className="p-3">{s.name}</td>
                      <td className="p-3">{s.email}</td>
                      <td className="p-3">{s.city}</td>
                      <td className="p-3">{s.gender}</td>
                      <td className="p-3">{new Date(s.created_at).toLocaleString()}</td>
                      <td className="p-3">
                        <button onClick={() => handleDelete('student', s.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "tutors" && (
          <section>
            <h1 className="text-3xl font-bold mb-6">Tutors ({tutors.length})</h1>
            <div className="bg-white rounded shadow overflow-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">City</th>
                    <th className="p-3">Institute</th>
                    <th className="p-3">Gender</th>
                    <th className="p-3">Created</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tutors.map((t) => (
                    <tr key={t.id} className="border-t">
                      <td className="p-3">{t.name}</td>
                      <td className="p-3">{t.email}</td>
                      <td className="p-3">{t.city}</td>
                      <td className="p-3">{t.institute}</td>
                      <td className="p-3">{t.gender}</td>
                      <td className="p-3">{new Date(t.created_at).toLocaleString()}</td>
                      <td className="p-3">
                        <button onClick={() => handleDelete('tutor', t.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
