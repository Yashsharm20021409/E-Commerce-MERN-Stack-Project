import React from "react";
import Announcement from "../Components/Announcement";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import NewsLetter from "../Components/NewsLetter";
import Product from "../Components/Product";
import Slider from "../Components/Slider";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider/>
      <Categories/>
      <Product/>
      <NewsLetter/>
      <Footer/>
    </div>
  );
};

export default Home;
