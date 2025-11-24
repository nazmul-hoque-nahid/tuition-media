import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import axios from 'axios';

const Settings = () => {
  const { user, setUser } = useContext(UserContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);


  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    setLoading(true);
    try {
      await axios.put(
        user.role === 'Tutor'
          ? 'http://localhost:3000/api/tutor/changePassword'
          : 'http://localhost:3000/api/student/changePassword',
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      alert(err.response?.data?.message || 'Password update failed');
         setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  setLocationLoading(true);
   
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      try {
        await axios.put(
          user.role === "Tutor"
            ? "http://localhost:3000/api/tutor/updateLocation"
            : "http://localhost:3000/api/student/updateLocation",
          { latitude, longitude },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        alert("Location updated successfully!");
      } catch (err) {
        alert(err.response?.data?.message || "Failed to update location");
      } finally {
        setLocationLoading(false);
      }
    },
    (error) => {
      alert("Permission denied or failed to get location.");
      setLocationLoading(false);
    }
  );
};


  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;
    try {
      await axios.delete(
        user.role === 'Tutor'
          ? `http://localhost:3000/api/tutor/delete/${user.id}`
          : `http://localhost:3000/api/student/delete/${user.id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      alert('Account deleted successfully!');
      window.location.href = '/';
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 py-12 px-4">

        {/*
  Back arrow at top-left
*/}
<button
  onClick={() => window.history.back()}
  className="absolute top-4 left-4 text-white text-lg font-bold hover:text-yellow-200"
>
  ← Back
</button>

      <h2 className="text-3xl font-bold text-white mb-8">Settings</h2>

      {/* Change Password */}
      <div className="flex flex-col gap-2 w-full max-w-sm mb-8">
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="p-1 rounded-sm text-sm border border-white focus:outline-none focus:ring-1 focus:ring-white bg-white text-black"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-1 rounded-sm text-sm border border-white focus:outline-none focus:ring-1 focus:ring-white bg-white text-black"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-1 rounded-sm text-sm border border-white focus:outline-none focus:ring-1 focus:ring-white bg-white text-black"
        />
        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="bg-amber-500 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition transform text-sm"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </div>

      {/* Update Location */}
     
   
      <p>Update your location to find {user.role==="Tutor"? "tuitioin":"tutor"} near you.</p>
<div className="flex flex-col gap-2 w-full max-w-sm mt-4">
  <button
    onClick={handleUpdateLocation}
    disabled={locationLoading}
    className="bg-blue-500 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition transform text-sm"
  >
    {locationLoading ? "Updating..." : "Update Location"}
  </button>
</div>


      {/* Delete Account */}
      <div className="flex flex-col gap-2 w-full max-w-sm mt-4">
        <button
          onClick={handleDeleteAccount}
          className="bg-red-500 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition transform text-sm"
        >
          Delete Account
        </button>
      </div>

      {/* Minimal extra setting (example: notifications) */}
      <div className="flex items-center gap-2 w-full max-w-sm mt-6">
      
      </div>
    </div>
  );
};

export default Settings;
