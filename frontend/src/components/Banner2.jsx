import React from 'react'
import OnlineTutoring from '../assets/online-tutoring.svg'
import HomeTutoring from '../assets/home-tutoring.svg'
import GroupTutoring from '../assets/group-tutoring.svg'

const Banner2 = () => {
    const tutoringMethods = [
        {
            id: 1,
            image: HomeTutoring,
            title: 'Home Tutoring',
            description: "It's a unique opportunity to learn in the home with your expected future in different categories everything is in favor of your need",
        },
        {
            id: 2,
            image: OnlineTutoring,
            title: 'Online Tutoring',
            description: 'Learn from the comfort of your home with our online tutoring sessions. Connect with expert tutors through video calls, interactive whiteboards, and digital resources.',

        },
        {
            id: 3,
            image: GroupTutoring,
            title: 'Group Tutoring',
            description: 'A group of students can full fill their hunger for learning within more affordable tuition fees. Get the opportunity of learning with knowledge sharing!',

        },
    ]

    return (
        <section className="bg-linear-to-b from-gray-50 to-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
            <div className="container mx-auto">
                {/* Heading */}
                <div className="text-center mb-12 md:mb-16 lg:mb-20">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Tutoring <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Methods</span></h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">Find The Best Tuition Type Which Suits You Most</p>
                </div>

                {/* Tutoring Methods Grid */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
                    {tutoringMethods.map((method) => {
                        return (
                            <div key={method.id} className={`bg-fuchsia-50 rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl  hover:scale-105 transition-all duration-300 transform flex flex-col`}>

                                <div className="bg-linear-to-br p-4 sm:p-8 flex items-center justify-center rounded-t-2xl">
                                    <img
                                        src={method.image}
                                        alt={method.title}
                                        className="w-55 h-55 sm:w-55 sm:h-55 md:w-56 md:h-56 lg:w-full lg:h-full object-contain drop-shadow-lg"
                                    />
                                </div>


                                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                                    <h2 className="text-2xl sm:text-2xl font-bold text-gray-900">{method.title}</h2>
                                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed flex-1">{method.description}</p>
                                </div>

                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}


export default Banner2