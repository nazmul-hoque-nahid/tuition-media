import { User, Search, Briefcase, CheckCircle, Star } from 'lucide-react'
import React from 'react'

const Banner3 = () => {

    const TutorWorkFlow = [
            {
                id: 1,
                icon: User,
                title: 'Create Tutor Profile',
                description:"Create your tutor profile by providing your sign up information."
            },
            {
                id: 2,
                icon: Search,
                title: 'Find Tutoring Jobs',
                description: 'Search and apply for tutoring jobs that match your skills, preferred location, class, and subjects.',    
            },
            {
                id: 3,
                icon: Briefcase,
                title: 'Apply for Jobs',
                description: 'Submit your applications to the tutoring jobs you are interested in and wait for responses from potential clients.',    
            },
        ]

        const GuardianWorkFlow = [
            {
                id: 1,
                icon: Search,
                title: 'Search for Tutors or Post your tuition requirements',
                description:"You need an account to make post for tutor."
            },
            {
                id: 2,
                icon: Star,
                title: 'Select tutor and take one demo session for free',
                description: 'Get free one day demo session with the tutor at your preferred location.',    
            },
            {
                id: 3,
                icon: CheckCircle,
                title: 'Hire your tutor',
                description: 'If you like the demo session, confirm the teacher.',    
            },
        ]

        return(
            <section>
                
                <div>

                    <div className="container mx-auto py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
                        <div className="text-center mb-12 md:mb-16 lg:mb-20">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">How <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Tutors</span> Work With Us</h1>
                            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">A Simple 3-Step Process to Get Started as a Tutor</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
                            {TutorWorkFlow.map((step) => (
                                <div key={step.id} className="bg-green-50 rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col items-center text-center hover:shadow-xl hover:scale-105 transition-all duration-300 transform">
                                    <div className="bg-linear-to-br p-4 rounded-full mb-6">
                                        <step.icon className="w-12 h-12 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl sm:text-2xl font-bold text-gray-900 mb-4">{step.title}</h2>
                                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{step.description}</p>
                                </div>
                            ))}
                        </div>

                    </div>

                    <div>
                        <div className="container mx-auto py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
                            <div className="text-center mb-12 md:mb-16 lg:mb-20">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">How <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Guardians</span> Work With Us</h1>
                                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">A Simple 3-Step Process to Hire a Tutor</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
                                {GuardianWorkFlow.map((step) => (
                                    <div key={step.id} className="bg-fuchsia-50 rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col items-center text-center hover:shadow-xl hover:scale-105 transition-all duration-300 transform">
                                        <div className="bg-linear-to-br p-4 rounded-full mb-6">
                                            <step.icon className="w-12 h-12 text-purple-600" />
                                        </div>
                                        <h2 className="text-2xl sm:text-2xl font-bold text-gray-900 mb-4">{step.title}</h2>
                                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{step.description}</p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>


                </div>

            </section>
        )
}

export default Banner3