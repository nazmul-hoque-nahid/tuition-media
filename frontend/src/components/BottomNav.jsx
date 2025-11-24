import React, { useState, useEffect } from "react";
import { FaUser, FaBookOpen, FaHome, FaChalkboardTeacher } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const [active, setActive] = useState("home");

  const items = [
    { id: "home", label: "Home", icon: <FaHome /> },
    { id: "profile", label: "Profile", icon: <FaUser /> },
    { id: "tutors", label: "Tutors", icon: <FaChalkboardTeacher /> },
    { id: "jobs", label: "Jobs", icon: <FaBookOpen /> },
  ];
const user=localStorage.getItem("user");
  // map nav item ids to app routes
const pathMap = {
  profile: user ? "/profile" : "/login",
  jobs: "/tuitionJobs",
  home: "/",
  tutors: "/tutorHub",
};


  const location = useLocation();

  useEffect(() => {
    // set active based on current location pathname
    const pathname = location.pathname;
    const found = Object.entries(pathMap).find(([, path]) => {
      // match exact or when pathname starts with path (for nested routes)
      return path === "/" ? pathname === "/" : pathname.startsWith(path);
    });
    if (found) setActive(found[0]);
  }, [location.pathname]);

  // Hide BottomNav on specific routes (for example: tutorHub)
  // Add other routes to this array to hide the bottom nav there as well.
  // Currently empty so BottomNav is always shown on small devices.
  const hiddenRoutes = [];
  const shouldHide = hiddenRoutes.some((r) => location.pathname.startsWith(r));
  if (shouldHide) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-gradient-to-r from-purple-900 to-pink-600 text-white py-3 px-4 z-50 shadow-lg">
      <div className="flex justify-between items-center">
        {items.map((item) => {
          const to = pathMap[item.id] || "/";
          return (
            <Link
              to={to}
              key={item.id}
              onClick={() => setActive(item.id)}
              className="flex-1"
            >
              <div className="flex flex-col items-center cursor-pointer w-full">
                {/* Active Icon Highlight */}
                <div
                  className={`${
                    active === item.id
                      ? "bg-orange-500 text-white p-4 rounded-full border-4 border-white -mt-10 shadow-lg"
                      : "text-white text-xl"
                  } transition-all duration-300`}
                >
                  {item.icon}
                </div>

                {/* Label */}
                <span
                  className={`text-sm mt-1 ${
                    active === item.id ? "text-white font-semibold" : "opacity-70"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;