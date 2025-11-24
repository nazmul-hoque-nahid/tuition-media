import { Phone, Users, Shield, Search } from 'lucide-react'
import React from 'react'
import Office from '../assets/office-image.avif'

const Banner4 = () => {
     const WhyChooseUs = [
            {
                id: 1,
                icon: Phone,
                title: '24/7 Live Support',
                description: 'Get instant help whenever you need it',
                color: 'from-blue-500 to-cyan-500',
                textColor: 'text-blue-600'
            },
            {
                id: 2,
                icon: Users,
                title: 'Fast & Responsive Team',
                description: 'Quick responses to all your queries',
                color: 'from-green-500 to-emerald-500',
                textColor: 'text-green-600'
            },
            {
                id: 3,
                icon: Shield,
                title: 'Trusted & Verified',
                description: 'All tutors are verified and trusted',
                color: 'from-purple-500 to-pink-500',
                textColor: 'text-purple-600'
            },
            {
                id: 4,
                icon: Search,
                title: 'Advanced Search',
                description: 'Find tutors by subject, location & skills',
                color: 'from-orange-500 to-red-500',
                textColor: 'text-orange-600'
            },
        ]
    return (
        <section className="bg-linear-to-b from-white to-gray-50 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                    {/* Left Column: Text and Cards */}
                    <div>
                        {/* Heading */}
                        <div className="mb-10 md:mb-14">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Why <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Choose Us</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-600 max-w-lg">We provide the best tutoring platform with trusted tutors, reliable support, and easy-to-use features.</p>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:gap-6">
                            {WhyChooseUs.map((item) => {
                                const Icon = item.icon
                                return (
                                    <div key={item.id} className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 transform border border-gray-200">
                                        <div className={`bg-linear-to-br ${item.color} p-3 rounded-lg w-fit mb-4 flex items-center justify-center`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-md lg:max-w-lg shadow-2xl rounded-2xl overflow-hidden">
                            <img src={Office} alt="Office" className="w-full h-auto object-cover rounded-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner4