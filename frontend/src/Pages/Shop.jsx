/* jshint esversion:6 */
import React from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import Ani from "../Components/Ani/Ani";
import { ParallaxProvider } from "react-scroll-parallax";
import pic1 from "../Components/Assets/bg101.jpeg";
import pic2 from "../Components/Assets/bg104.jpeg";
import Animationtem from "../Components/Animationtem/Animationtem";
import mainpic from "../Components/Assets/bg101.webp";
import ParallaxBackground from "../Components/ParallaxBackground/ParallaxBackground";
import Running from "../Components/Running/Running";

const Shop = () => {
  return (
    <div>
      <ParallaxProvider>
        <ParallaxBackground
          image={mainpic}
          imageWidth="100%"
          imageHeight="900px"
        >
          <Animationtem />
        </ParallaxBackground>
        <Running />

        <Popular />
        <ParallaxBackground image={pic2} imageWidth="100%" imageHeight="900px">
          <Offers />
        </ParallaxBackground>
        <NewCollections />
        <ParallaxBackground image={pic1} imageWidth="100%" imageHeight="900px">
          <NewsLetter />
        </ParallaxBackground>
      </ParallaxProvider>
    </div>
  );
};

export default Shop;
