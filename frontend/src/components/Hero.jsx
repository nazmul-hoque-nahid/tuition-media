import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import HeroPng from "../assets/hero.svg"

const Hero = () => {
  return (
    <section className="overflow-hidden relative z-0 pt-8 sm:pt-15 md:pt-10 lg:pt-10 lg:-mt-6 pb-2 sm:pb-5 md:pb-5 lg:pb-5">
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 items-center min-h-[420px] md:min-h-[520px] lg:min-h-[480px] gap-6 md:gap-8 lg:gap-12">

        <div className="flex flex-col justify-center py-8 sm:py-10  relative z-20">
          <div className="text-center md:text-left space-y-6 sm:space-y-8 md:max-w-md lg:max-w-lg">

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-fuchsia-700 leading-tight"
            >
              <span className="block">Best <span className="text-secondary text-blue-700">Tutoring Platform</span></span>
              <span className="block">for Home & Online Tuition</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-neutral-500 text-base md:text-lg max-w-xl"
            >
              Find the right tutor in your area. Connect with experienced educators and start learning today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center md:justify-start"
            >
              <Link to="/tutorHub" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-3 cursor-pointer sm:py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition duration-200 flex items-center justify-center gap-3 shadow-lg text-base sm:text-lg"
                >
                  <Search size={24} />
                  Find Tutor
                </motion.button>
              </Link>
            </motion.div>

          </div>
        </div>


        <div className="flex justify-center items-center relative px-4 md:px-0 md:justify-end">

          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            src={HeroPng}
            alt="Hero illustration showing tutoring"
            className="w-full max-w-lg relative z-10 drop-shadow-lg"
          />

        </div>

      </div>
    </section>
  )
}

export default Hero