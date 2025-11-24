import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaLinkedinIn,
  FaPinterestP,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-slate-50 to-blue-200 pt-12 pb-6 mt-4 bt-2 border-t border-gray-300">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10bg-linear-to-b from-slate-50 to-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">

          {/* Background Dots */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dots.png')] opacity-10 pointer-events-none"></div>

          {/* ========== LEFT: ABOUT SECTION ========== */}
          <div className="relative z-10">

            <h2 className="text-xl font-semibold mb-4">Online Tuition Media</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Online Tuition Media is a modern learning platform designed to connect students with expert tutors through flexible, interactive, and personalized online sessions. Our mission is to make high-quality education accessible from anywhere, offering academic guidance, skill development, and exam preparation through a seamless digital experience tailored to every learner’s needs.
            </p>
          </div>

          {/* ========== MIDDLE: USEFUL LINKS SECTION ========== */}
          <div className="relative z-10">
            <h3 className="text-xl font-semibold mb-4">USEFUL LINKS</h3>

            <div className="grid grid-cols-2 gap-3 text-gray-600">
              <a className="hover:text-green-600 cursor-pointer">Our Team</a>

              <a className="hover:text-green-600 cursor-pointer">Become A Tutor</a>
              <a className="hover:text-green-600 cursor-pointer">Careers</a>

              <a className="hover:text-green-600 cursor-pointer">Appoint A Tutor</a>
              <a className="hover:text-green-600 cursor-pointer">Gallery</a>

              <a className="hover:text-green-600 cursor-pointer">Our Blog</a>
              <a className="hover:text-green-600 cursor-pointer">FAQ</a>

              <a className="hover:text-green-600 cursor-pointer">Privacy Policy</a>
            </div>

          </div>

          {/* ========== RIGHT: CONTACT US SECTION ========== */}
          <div className="relative z-10">
            <h3 className="text-xl font-semibold mb-4">CONTACT US</h3>

            <p className="text-gray-600 mb-4">We are here for your help!</p>

            <div className="flex items-center gap-3 mb-3 text-gray-700">
              <FaEnvelope className="text-green-500 text-xl" />
              <span>info@tuition.media.com.bd</span>
            </div>

            <div className="flex items-center gap-3 mb-3 text-gray-700">
              <FaPhone className="text-green-500 text-xl" />
              <span>Call Hotline : 017*******</span>
            </div>

            <div className="flex items-center gap-3 mb-6 text-gray-700">
              <FaMapMarkerAlt className="text-green-500 text-xl" />
              <span>
                SUST Gate, Sylhet-3100, Bangladesh
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 text-xl">
              <FaFacebookF className="text-blue-600 cursor-pointer hover:scale-110 duration-150" />
              <FaInstagram className="text-pink-600 cursor-pointer hover:scale-110 duration-150" />
              <FaWhatsapp className="text-green-600 cursor-pointer hover:scale-110 duration-150" />
              <FaYoutube className="text-red-600 cursor-pointer hover:scale-110 duration-150" />
              <FaLinkedinIn className="text-blue-700 cursor-pointer hover:scale-110 duration-150" />
              <FaPinterestP className="text-red-500 cursor-pointer hover:scale-110 duration-150" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Tuition Media. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
