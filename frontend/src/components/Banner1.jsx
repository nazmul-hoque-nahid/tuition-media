import React from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import TeacherStudent from '../assets/teacher-student-animated.svg'
import { Link } from 'react-router-dom'

const Banner1 = () => {
  return (
    <section className="bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="container mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 leading-tight">
            Search <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Tutoring Jobs</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-indigo-600 font-semibold">
            Find Your Tuition Jobs in Your Area
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12 lg:gap-16 xl:gap-20">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center items-center order-2 lg:order-1"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              src={TeacherStudent}
              alt="Teacher and student interactive learning illustration"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg drop-shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 md:mb-10"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                Looking for Interesting Tuition Jobs?
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                If teaching jobs interest you, you're in the right place! We have 500+ genuine and 100% verified home tuition job opportunities. Whether you're starting your career or are an expert in your field, we can help you find your next big opportunity. Search and apply to tuition jobs that match your skills, preferred location, class, and subjects.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/tuitionJobs" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-3 sm:py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition duration-200 flex items-center justify-center gap-3 shadow-lg text-base sm:text-lg"
                >
                  <Search size={24} />
                  Find Tuition Jobs
                </motion.button>
              </Link>
              
            </motion.div>

          </motion.div>

        </div>
      
      </div>
    </section>
  )
}

export default Banner1