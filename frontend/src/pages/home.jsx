import React from "react";
import Hero from "../components/Hero.jsx";
import Smallinfo from "../components/Smallinfo.jsx";
import Banner1 from "../components/Banner1.jsx";
import Banner2 from "../components/Banner2.jsx";
import Banner3 from "../components/Banner3.jsx";
import Banner4 from "../components/Banner4.jsx";
import UserReview from "../components/UserReview.jsx";
import Footer from "../components/Footer2.jsx";
import BottomNav from "../components/BottomNav.jsx";

const Home = () => {
  return (
    <div className="bg-blue-50">
      <Hero />
      <Smallinfo />
      <Banner1 />
      <Banner2 />
      <Banner3 />
      <Banner4 />
      <UserReview />
      <BottomNav/>
    </div>
  );
};

export default Home;

