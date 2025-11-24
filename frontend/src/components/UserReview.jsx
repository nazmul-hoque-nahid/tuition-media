import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Tanvir from "../assets/tanvir-ahamed.jpg";
import Kamruzzaman from "../assets/kamruzzaman.jpg";
import Shorifuzzaman from "../assets/shorifuzzaman.jpg";
import SadiaIslam from "../assets/sadia.webp";
import NazmulHaque from "../assets/nazmul.jpg";
import AhmedBinKarim from "../assets/ahmed.jpg";

const UserReview = () => {
  const reviews = [
    {
      id: 1,
      name: "Tanvir Ahmed",
      university: "DU",
      role: "Tutor",
      image: Tanvir,
      text: "প্রথমেই ধন্যবাদ টিউশন টার্মিনাল কে, যখন আমার সবচেয়ে খারাপ সময় চলছিল, তখন এই প্ল্যাটফর্মের মাধ্যমে আমি আবার টিউশন খুঁজে পাই।",
      rating: 5,
    },
    {
      id: 2,
      name: "Kamruzzaman",
      university: "Teacher",
      role: "Guardian",
      image: Kamruzzaman,
      text: "অসাধারণ সেবা পেয়েছি। সঠিক টিউটর খুঁজে পেয়েছি আমার সন্তানের জন্য। প্ল্যাটফর্মটি খুবই ব্যবহারকারী বান্ধব।",
      rating: 5,
    },
    {
      id: 3,
      name: "Shorifuzzaman",
      university: "SUST",
      role: "Tutor",
      image: Shorifuzzaman,
      text: "এই প্ল্যাটফর্মে অনেক ভালো শিক্ষার্থী পাওয়া যায়। আমার ক্যারিয়ার শুরু হয়েছে এখানে থেকে।",
      rating: 5,
    },
    {
      id: 4,
      name: "Sadia Islam",
      university: "Housewife",
      role: "Guardian",
      image: SadiaIslam,
      text: "আমার মেয়ের পড়া নিয়ে চিন্তা ছিল। এই প্ল্যাটফর্মে সেরা টিউটর পেয়েছি। এখন পড়াশুনা খুব ভালো চলছে।",
      rating: 5,
    },
    {
      id: 5,
      name: "Nazmul Haque",
      university: "SUST",
      role: "Tutor",
      image: NazmulHaque,
      text: "টিউশন টার্মিনাল সত্যিই একটি বিপ্লবী প্ল্যাটফর্ম। আমি প্রতি মাসে ভালো আয় করতে পারছি।",
      rating: 5,
    },
    {
      id: 6,
      name: "Ahmed Bin Karim",
      university: "Banker",
      role: "Guardian",
      image: AhmedBinKarim,
      text: "খুব সন্তুষ্ট এই সার্ভিস নিয়ে। আমার সন্তান এখন টপ স্টুডেন্ট হয়েছে। সবাইকে রেকমেন্ড করছি।",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 2;
  const totalCards = reviews.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + cardsPerView) % totalCards);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - cardsPerView + totalCards) % totalCards);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + cardsPerView) % totalCards);
  };

  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < cardsPerView; i++) {
      visible.push(reviews[(currentIndex + i) % totalCards]);
    }
    return visible;
  };

  return (
    <section className="bg-linear-to-b from-gray-50 to-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            What Our <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Users Say</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Real reviews from tutors and guardians who trust our platform
          </p>
        </div>

        <div className="relative">
          {/* Mobile Horizontal Scroll - 1 card + 10% peek */}
          <div className="block md:hidden overflow-x-auto snap-x snap-mandatory pb-4" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="flex gap-6 px-4" style={{ width: 'max-content' }}>
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col snap-center"
                  style={{ minWidth: 'calc(100vw - 32px - 15px)', maxWidth: 'calc(100vw - 32px - 15px)' }}
                >
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b order-3">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-green-400 shadow-md shrink-0">
                      <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-gray-900">{review.name}</h3>
                      <p className="text-xs text-gray-600">{review.university}</p>
                      <p className="text-xs text-green-600 font-semibold">{review.role}</p>
                    </div>
                  </div>
                  <div className="order-2 flex-1">
                    <div className="text-green-500 text-4xl font-bold mb-2 select-none">&ldquo;</div>
                    <p className="text-gray-700 text-base leading-relaxed mb-6">{review.text}</p>
                  </div>
                  <div className="flex gap-1 order-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid - 2 cards */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
              {getVisibleReviews().map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col"
              >
                {/* Profile Section - Top on Large, Bottom on Small */}
                <div className="flex items-center gap-4 mb-6 lg:mb-8 lg:pb-6 lg:border-b order-3 lg:order-1">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-green-400 shadow-md shrink-0">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base lg:text-lg font-bold text-gray-900">{review.name}</h3>
                    <p className="text-xs lg:text-sm text-gray-600">{review.university}</p>
                    <p className="text-xs text-green-600 font-semibold">{review.role}</p>
                  </div>
                </div>

                {/* Quote Icon and Review Text */}
                <div className="order-2">
                  <div className="text-green-500 text-4xl lg:text-5xl font-bold mb-2 select-none">
                    &ldquo;
                  </div>

                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 flex-1">
                    {review.text}
                  </p>
                </div>

                {/* Rating - Bottom */}
                <div className="flex gap-1 order-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
            </div>

            <div className="flex gap-4 justify-center items-center mt-10">

              <div className="flex gap-2">
              {[...Array(Math.ceil(totalCards / cardsPerView))].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex((i * cardsPerView) % totalCards)}
                  className={`h-3 rounded-full transition-all ${
                    i === Math.floor(currentIndex / cardsPerView)
                      ? "bg-gray-800 w-6 hover:bg-gray-900"
                      : "bg-gray-300 w-3 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserReview;
