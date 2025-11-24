import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Default from '../assets/default.jpg'
const TutorCard = ({ tutor }) => {
  const { id, name, institute, gender, profile_pic_url, yearsOfExperience, city } = tutor

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ boxShadow: '0 20px 30px rgba(0,0,0,0.15)' }}
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
    >
      {/* Image */}
      <div className="h-48 bg-gradient-to-br from-amber-200 to-amber-100 flex items-center justify-center">
        <img
          src={profile_pic_url || Default}
          
          className="h-36 w-36 sm:h-40 sm:w-40 md:h-44 md:w-44 object-cover rounded-full border-4 border-white shadow-md"
        />
      </div>

      {/* Content */}
      <div className="p-5 text-center">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-sm sm:text-base text-amber-600 font-semibold">{institute==="null" || !institute ? "N/A" : institute}</p>

        {/* Experience & City */}
        <div className="flex justify-center font-bold gap-4 my-3 text-xs sm:text-sm text-gray-600">
          <span>Exp: {yearsOfExperience==="null" || !yearsOfExperience ? "N/A" : yearsOfExperience} years</span> |
          <span>City: {city==="null" || !city ? "N/A" : city}</span>
        </div>
          <div className="text-gray-600 font-semibold text-sm mb-3">Gender: {gender==="null" || !gender ? "N/A" : gender}</div>
        {/* Button */}
        <Link to={`/tutor/${id}`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200"
          >
            View Profile
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}

export default TutorCard
