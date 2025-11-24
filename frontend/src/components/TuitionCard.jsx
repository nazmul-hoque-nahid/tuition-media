import React from "react";
import axios from "axios";

const TuitionCard = ({ job }) => {
  const {
    post_id,
    class: cls,
    version,
    days_per_week,
    time,
    duration,
    gender: studentGender,
    students: totalStudents,
    salary,
    city,
    tutor_gender: postTutorGender,
    status,
    created_at_formatted,
    method,
    subjects,
    already_applied, // new field from backend
  } = job;

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if tutor can apply
  const canApply =
    user?.role === "Tutor" &&
    (postTutorGender === "Any" || postTutorGender === user.gender) &&
    !already_applied;

  const handleApply = async () => {
    if (!user) return alert("Please login first");
    if (!canApply) return alert("You cannot apply for this post");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/api/application/apply",
        { post_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      // Optionally, you can disable button immediately after applying
      job.already_applied = true; 
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Application failed");
    }
  };

  // Normalize status
  const normalizedStatus = status?.toLowerCase();

  const convertTo12Hour = (time24) => {
    const [hour, minute] = time24.split(":");
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Class {cls} • {version}
            </h3>
            <p className="text-sm bg-gray-100 text-gray-500 mt-2 px-2 py-1 rounded-full inline-block">
              {city} | {convertTo12Hour(time)} | {duration}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-amber-600">{salary} Tk</p>
            <p className="text-sm text-gray-500 mt-2">{days_per_week} days/week</p>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 text-sm bg-amber-50 text-amber-700 rounded-full">
            Student: {studentGender}
          </span>
          <span className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full">
            Students: {totalStudents}
          </span>
          <span className="px-3 py-1 text-sm bg-gray-50 text-gray-700 rounded-full">
            Tutor: {postTutorGender}
          </span>
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              normalizedStatus === "open" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {normalizedStatus === "open" ? "Open" : "Closed"}
          </span>
          <span className="px-3 py-1 text-sm bg-purple-50 text-purple-700 rounded-full">
            Method: {method || "N/A"}
          </span>
          <div className="px-3 py-1 text-sm bg-amber-50 text-amber-700 rounded-full">
            <strong>Subjects:</strong> {subjects || "All"}
          </div>
          <div>
            <p className="px-3 py-1 text-sm bg-gray-50 text-gray-700 rounded-full">
              Posted on: {created_at_formatted}
            </p>
          </div>
        </div>

        {/* Apply Button */}
        <div className="mt-5 flex justify-center">
          <button
            onClick={handleApply}
            disabled={!canApply || normalizedStatus !== "open"}
            className={`px-3 py-1.5 pl-8 pr-8 rounded-md text-xl font-medium transition ${
              canApply && normalizedStatus === "open"
                ? "bg-amber-600 text-white hover:bg-amber-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {already_applied ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default TuitionCard;
