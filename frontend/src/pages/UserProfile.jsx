import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { institutes } from "../components/Institutes.js";
import { cities } from "../components/Cities.js";
import { classes, subjects } from "../components/Classes.js";
import Default from "../assets/default.jpg";
import axios from "axios";

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const navigate = useNavigate();

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const url =
          user.role === "Tutor"
            ? `https://tuition-media-production.up.railway.app/api/tutor/${user.id}`
            : `https://tuition-media-production.up.railway.app/api/student/${user.id}`;

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const data = res.data;
  

        // Ensure all fields exist
        setProfile({
          id: data.id || "",
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          city: data.city || "",
          gender: data.gender || "",
          institute: data.institute || "",
          yearsOfExperience: data.yearsOfExperience || "",
          bio: data.bio || "",
          photo: data.profile_pic_url || Default,
        });

        setSelectedClasses(data.classes || []);
        setSelectedSubjects(data.subjects || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (!user)
    return (
      <p className="text-center mt-24 text-white text-lg">
        Please login to view your profile.
      </p>
    );

  if (error) return <p className="text-red-500 text-center mt-24">{error}</p>;
  if (loading || !profile)
    return <p className="text-center mt-24 text-white">Loading...</p>;

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfile((prev) => ({ ...prev, profilePicFile: e.target.files[0] }));
  };

  const handleClassChange = (cls) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
    );
  };

  const handleSubjectChange = (sub) => {
    setSelectedSubjects((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const formData = new FormData();
      for (const key in profile) {
        if (key !== "profilePicFile") {
          formData.append(key, profile[key]);
        }
      }

      if (profile.profilePicFile) {
        formData.append("profilePic", profile.profilePicFile);
      }

      if (user.role === "Tutor") {
        formData.append("classes", JSON.stringify(selectedClasses));
        formData.append("subjects", JSON.stringify(selectedSubjects));
      }

      const url =
        user.role === "Tutor"
          ? "https://tuition-media-production.up.railway.app/api/tutor/updateTutor"
          : "https://tuition-media-production.up.railway.app/api/student/updateStudent";

      const res = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedProfile = {
        ...profile,
        ...res.data,
        gender: res.data.gender || profile.gender,
        photo: res.data.profile_pic_url || profile.photo,
      };
      setProfile(updatedProfile);

      const updatedUser = {
        ...user,
        ...res.data,
        gender: res.data.gender || user.gender,
        photo: res.data.profile_pic_url || user.photo,
      };
      setUser(updatedUser);
      //localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-amber-200 to-orange-100 flex flex-col items-center py-12 px-4">
      {!editMode && (
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 text-amber-700 hover:text-amber-900 font-bold text-xl"
        >
          ← Back
        </button>
      )}

      <h2 className="text-4xl font-extrabold text-amber-800 mb-10">
        My Profile
      </h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={profile.photo || Default}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-amber-500 shadow-lg object-cover transition-transform transform hover:scale-105"
        />
        {editMode && (
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-3 text-amber-700 font-medium hover:text-amber-900"
          />
        )}
      </div>

      {/* Info Fields */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {["name", "email", "phone"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-amber-800 font-semibold mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            {!editMode ? (
              <p className="text-gray-800">{profile[field] || "N/A"}</p>
            ) : (
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={profile[field] || ""}
                onChange={handleChange}
                className="border-2 border-amber-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
              />
            )}
          </div>
        ))}

        {/* City */}
        <div className="flex flex-col">
          <label className="text-amber-800 font-semibold mb-1">City</label>
          {!editMode ? (
            <p className="text-gray-800">{profile.city || "N/A"}</p>
          ) : (
            <select
              name="city"
              value={profile.city || ""}
              onChange={handleChange}
              className="border-2 border-amber-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className="text-amber-800 font-semibold mb-1">Gender</label>
          {!editMode ? (
            <p className="text-gray-800">{profile.gender || "N/A"}</p>
          ) : (
            <select
              name="gender"
              value={profile.gender || ""}
              onChange={handleChange}
              className="border-2 border-amber-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          )}
        </div>

        {/* Tutor fields */}
        {user.role === "Tutor" && (
          <>
            {/* Institute */}
            <div className="flex flex-col">
              <label className="text-amber-800 font-semibold mb-1">Institute</label>
              {!editMode ? (
                <p className="text-gray-800">{profile.institute || "N/A"}</p>
              ) : (
                <select
                  name="institute"
                  value={profile.institute || ""}
                  onChange={handleChange}
                  className="border-2 border-amber-300 rounded-lg p-2"
                >
                  <option value="">Select institute</option>
                  {institutes.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Experience */}
            <div className="flex flex-col">
              <label className="text-amber-800 font-semibold mb-1">Years of Experience</label>
              {!editMode ? (
                <p className="text-gray-800">{profile.yearsOfExperience || "N/A"}</p>
              ) : (
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={profile.yearsOfExperience || ""}
                  onChange={handleChange}
                  className="border-2 border-amber-300 rounded-lg p-2"
                />
              )}
            </div>

            {/* Bio */}
            <div className="flex flex-col w-full">
              <label className="text-amber-800 font-semibold mb-1">Bio</label>
              {!editMode ? (
                <p className="text-gray-800">{profile.bio || "N/A"}</p>
              ) : (
                <textarea
                  name="bio"
                  value={profile.bio || ""}
                  onChange={handleChange}
                  rows={4}
                  className="border-2 border-amber-300 rounded-lg p-2 resize-none"
                />
              )}
            </div>

            {/* Classes */}
            <div className="flex flex-col w-full">
              <label className="text-amber-800 font-semibold mb-1">Classes you teach</label>
              {!editMode ? (
                <p className="text-gray-800">
                  {selectedClasses.length > 0 ? selectedClasses.join(", ") : "N/A"}
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {classes.map((cls) => (
                    <label key={cls} className="flex items-center gap-2 text-gray-800">
                      <input
                        type="checkbox"
                        checked={selectedClasses.includes(cls)}
                        onChange={() => handleClassChange(cls)}
                      />
                      {cls}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Subjects */}
            <div className="flex flex-col w-full">
              <label className="text-amber-800 font-semibold mb-1">Subjects you teach</label>
              {!editMode ? (
                <p className="text-gray-800">
                  {selectedSubjects.length > 0 ? selectedSubjects.join(", ") : "N/A"}
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {subjects.map((sub) => (
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
              )}
            </div>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="bg-amber-500 text-white font-bold px-8 py-3 rounded-full shadow-lg"
          >
            Edit Profile
          </button>
        )}
        {editMode && (
          <button
            onClick={handleUpdate}
            disabled={updating}
            className="bg-amber-600 text-white font-bold px-8 py-3 rounded-full shadow-lg disabled:opacity-60"
          >
            {updating ? "Updating..." : "Save Changes"}
          </button>
        )}
        {editMode && (
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-500 text-white font-bold px-6 py-2 rounded-full shadow-lg"
          >
            Cancel Editing
          </button>
        )}
        {!editMode && user.role === "Student" && (
          <button
            onClick={() => navigate("/create-post")}
            className="bg-green-500 text-white font-bold px-8 py-3 rounded-full shadow-lg"
          >
            Create Post
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
