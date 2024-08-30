/* jshint esversion:6 */
import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import mini from "../Assets/mini.mp4";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  return (
    <div
      className="productdisplay"
      // style={{ backgroundColor: "#F7EFE5" }}
    >
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            Rs:{product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            Rs:{product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Save Time and Effort: No more long queues and crowded stores. With
          Thread, shopping for your favorite fashion pieces is a breeze, keeping
          your experience hassle-free and enjoyable. Our streamlined online
          platform allows you to easily browse and purchase the latest styles
          from the comfort of your home, ensuring a smooth and efficient
          shopping experience.
        </div>

        <button
          onClick={(handleClick) => {
            addToCart(product.id);
          }}
        >
          ADD TO CART
        </button>

        {/* <video autoPlay loop muted className="productdisplay-video">
          <source src={mini} type="video/mp4" />
        </video> */}
      </div>
    </div>
  );
};

export default ProductDisplay;
