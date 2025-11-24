import React, { useState, useRef, useEffect, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoMdMenu, IoMdClose } from 'react-icons/io'
import { UserContext } from '../context/UserContext.jsx'
import HomeLogo from '../assets/home-logo.png'
import Default from '../assets/default.jpg'
const Navbar = () => {
  const [open, setOpen] = useState(false) // Mobile menu
  const [showMenu, setShowMenu] = useState(false) // Profile dropdown
  const { user, setUser } = useContext(UserContext)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  const navItem = ({ isActive }) =>
    isActive
      ? "text-red-600 font-bold"
      : "text-gray-700 hover:text-amber-500 font-bold"

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Reset menus when user changes (login/logout)
  useEffect(() => {
    setOpen(false)
    setShowMenu(false)
  }, [user])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  // Determine Dashboard link based on role
  const dashboardLink = user
    ? user.role === 'Student'
      ? '/student-dashboard'
      : user.role === 'Tutor'
        ? '/tutor-dashboard'
        : null
    : null

  return (
    <header className="fixed top-0 left-0  right-0 z-20 bg-white shadow">
      
      <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <img src={HomeLogo} alt="Tuition Media Logo" className="w-10 h-10 mr-2" />
        <p to="/" className="text-blue-600 font-semibold text-lg md:text-2xl ">
          Tuition Media
        </p>
        </div>
       

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navItem}>Home</NavLink>
          <NavLink to="/tuitionJobs" className={navItem}>Job Board</NavLink>
          <NavLink to="/tutorHub" className={navItem}>Tutor Hub</NavLink>

          {dashboardLink && <NavLink to={dashboardLink} className={navItem}>Dashboard</NavLink>}

          {!user && (
            <>
              <NavLink to="/register" className={navItem}>Register</NavLink>
              <NavLink to="/login" className={navItem}>Login</NavLink>
            </>
          )}

          {user && (
            <div ref={dropdownRef} className="relative flex items-center gap-2 cursor-pointer">
              <NavLink to="/profile" className="hidden sm:block text-gray-700 font-bold">
                 {user.name}
              </NavLink>

              <img
                src={user.photo || Default}
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMenu(prev => !prev)
                }}
                className="w-10 h-10 rounded-full border-2 border-amber-400"
              />

              {showMenu && (
                <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-md p-3 w-44 z-50">
                  <NavLink to="/profile" className={navItem} onClick={() => setShowMenu(false)}>
                    Profile
                  </NavLink>

                  <NavLink to="/settings" className={`${navItem} block mt-2`} onClick={() => setShowMenu(false)}>
                    Settings
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="mt-2 w-full text-left text-red-500 hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IoMdClose size={22} /> : <IoMdMenu size={22} />}
        </button>
      </div>

      {/* Mobile panel */}
      <div className={`md:hidden bg-white border-t ${open ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-4">
          {user && <p className="text-gray-700 mb-3 font-medium">Hi, {user.name}</p>}

          <ul className="flex flex-col gap-3">
            <li><NavLink to="/" className={navItem} onClick={() => setOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/tuitionJobs" className={navItem} onClick={() => setOpen(false)}>Job Board</NavLink></li>
            <li><NavLink to="/tutorHub" className={navItem} onClick={() => setOpen(false)}>Tutor Hub</NavLink></li>

            {dashboardLink && (
              <li>
                <NavLink to={dashboardLink} className={navItem} onClick={() => setOpen(false)}>Dashboard</NavLink>
              </li>
            )}

            {!user && (
              <>
                <li><NavLink to="/register" className={navItem} onClick={() => setOpen(false)}>Register</NavLink></li>
                <li><NavLink to="/login" className={navItem} onClick={() => setOpen(false)}>Login</NavLink></li>
              </>
            )}

            {user && (
              <>
                <li><NavLink to="/profile" className={navItem} onClick={() => setOpen(false)}>Profile</NavLink></li>
                 <NavLink to="/settings" className={`${navItem} block mt-2`} onClick={() => setShowMenu(false)}>
                    Settings
                  </NavLink>
                <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Navbar
