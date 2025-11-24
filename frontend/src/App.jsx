import React from "react";
import {Routes,Route,useLocation} from 'react-router-dom';
import Home from "./pages/home.jsx";
import TuitionJobs from "./pages/tuitionJobs.jsx";
import TutorHub from "./pages/tutorHub.jsx";
import TutorProfile from "./pages/TutorProfile.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import OTPVerify from "./components/OTPVerify.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Notifications from "./pages/Notifications.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Settings  from "./pages/Settings.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import BottomNav from "./components/BottomNav.jsx";
import Footer from "./components/Footer2.jsx";
import BookTutor from "./pages/BookTutor.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import TutorDashboard from "./pages/TutorDashboard.jsx";
import AdminLogin from "./pages/Admin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ScrollToTop from '.pages/ScrollToTop';
const App = () => {
   const location = useLocation();
   //const hideNavbar = location.pathname === '/profile' || location.pathname === '/settings';
     const hideNavbar = ["/book-tutor","/my-bookings","/tutor-bookings","/profile","/settings"]
  return (
    <div>
    <ScrollToTop/>
      {!hideNavbar.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tuitionJobs" element={<TuitionJobs />} />
        <Route path="/tutorHub" element={<TutorHub />} />
        <Route path="/tutor/:id" element={<TutorProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OTPVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/notifications" element={<Notifications />} />
         <Route path="/reset-password" element={<ResetPassword />} />
         <Route path="/profile" element={<UserProfile />} />
         <Route path="/settings" element={<Settings />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/book-tutor/:id" element={<BookTutor />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/tutor-dashboard" element={<TutorDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<h1 className="text-center mt-20 text-3xl font-bold">404 - Page Not Found</h1>} />
      </Routes>
      <Footer/>
      <BottomNav />
    </div>
  );
};

export default App;
