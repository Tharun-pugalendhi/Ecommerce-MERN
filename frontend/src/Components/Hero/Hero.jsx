/* jshint esversion:6 */
import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";
import laksmi from "../Assets/Laxmi Bomb chocolate (2).jpeg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-left">
          <div>
            <div className="hero-hand-icon">
              {/* <img src={hand_icon} alt="Hand Icon" /> */}
              <p>Make Space For new</p>
            </div>
            <h4>Brighten up your food heaven</h4>
            <h6>Dinnerware and Cookware</h6>
          </div>
          <div className="hero-latest-btn">
            <Link to="/Product">Let's shop</Link>
            <img src={arrow_icon} alt="Arrow Icon" />
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-images">
            <img src={hero_image} alt="Hero Image" className="left-image" />
            <img
              src={laksmi}
              alt="Laxmi Bomb chocolate"
              className="right-image"
            />
          </div>
        </div>
        <div className="hero-marquee">
          <marquee behavior="scroll" direction="left">
            Home appliances make a house more comfortable by making life more
            convenient. Cooking is like love. It should be entered into with
            abandon or not at all.
          </marquee>
        </div>
      </div>
    </div>
  );
};

export default Hero;
