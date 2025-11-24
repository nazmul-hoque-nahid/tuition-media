import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../assets/banner.png'
import registerImage from '../assets/register-image.svg'
import { motion } from 'framer-motion'
import RegisterCard from '../components/RegisterCard.jsx'

const register = () => {
    return (
        <div className='flex flex-col md:flex-row justify-center items-center gap-10 pt-20 pb-10'>
            <div>

                    <motion.img
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
                    src={registerImage}
                    alt=""
                        className="hidden md:block w-[400px] xl:w-[600px] relative z-10 drop-shadow"
                />

            </div>

            <div>
                <RegisterCard />
            </div>
            
        </div>
    )
}

export default register