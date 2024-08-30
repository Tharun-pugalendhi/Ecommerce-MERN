/* jshint esversion:6 */
import React from "react";
import "./Offers.css";
import exclusive_image from "../Assets/exclusive_image (2).png";

const Offers = () => {
  return (
    <section class="about-us">
      {/* <img src={exclusive_image} alt=""  height={100} width={200} /> */}
      <div class="content">
        <h2>Welcome to thread</h2> <hr />
        <p>
          Thread is your go-to destination for stylish and affordable fashion.
          At Thread, we believe that dressing up should be fun, easy, and
          accessible for everyone. Whether you're looking for the latest trends,
          timeless classics, or unique pieces that express your personal style,
          we have something for you. Our collection features a wide range of
          dresses for men, women, and kids, curated to fit every occasion and
          mood. From casual wear to formal attire, each piece is crafted with
          attention to detail, ensuring quality and comfort. We pride ourselves
          on offering a seamless shopping experience, from browsing our
          user-friendly website to the quick and reliable delivery of your
          order. Our dedicated customer service team is always ready to assist
          you, making sure that every purchase you make with us is a satisfying
          one. At Thread, we are committed to sustainability and ethical
          practices, ensuring that our products not only look good but also do
          good for the planet.
        </p>{" "}
      </div>
    </section>
  );
};

export default Offers;
