import React from 'react'
import { UserCheck, Users, Briefcase, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const Smallinfo = () => {
  const stats = [
    {
      id: 1,
      icon: UserCheck,
      title: 'Registered Tutors',
      count: '5000+',
      color: 'from-blue-400 to-blue-600',
    },
    {
      id: 2,
      icon: Briefcase,
      title: 'Total Applications',
      count: '5000+',
      color: 'from-purple-400 to-purple-600',
    },
    {
      id: 3,
      icon: TrendingUp,
      title: 'Live Tuition Jobs',
      count: '5000+',
      color: 'from-green-400 to-green-600',
    },
    {
      id: 4,
      icon: Users,
      title: 'Total Users',
      count: '5000+',
      color: 'from-orange-400 to-orange-600',
    },
  ]

  return (
    <section className="bg-linear-to-b from-slate-50 to-blue-50 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Our Platform Statistics
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Join thousands of tutors and students already using our platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 h-full flex flex-col items-center text-center">
                  <div className={`bg-linear-to-br ${stat.color} p-4 sm:p-5 rounded-full mb-4 group-hover:scale-110 transition duration-300`}>
                    <IconComponent className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 text-white" />
                  </div>


                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2"
                  >
                    {stat.count}
                  </motion.p>

                  <p className="text-gray-700 font-semibold text-sm sm:text-base md:text-lg">
                    {stat.title}
                  </p>
                </div>
              
              </motion.div>
            )
            
          })}

        </div>
      
      </div>
    </section>
  )
}

export default Smallinfo