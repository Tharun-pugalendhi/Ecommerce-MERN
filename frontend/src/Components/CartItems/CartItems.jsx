/* jshint esversion:6 */
import React, { useContext, useEffect, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import { UserContext } from "../../Pages/UserContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import cart from "../Assets/cart.gif";
import axios from "axios";

const CartItems = () => {
  const [animate, setAnimate] = useState(false);
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    removeFromCart,
    updateCartItemQuantity,
  } = useContext(ShopContext);
  const { user } = useContext(UserContext);

  const [cartItemsState, setCartItemsState] = useState([]);

  useEffect(() => {
    const updatedCartItems = Object.entries(cartItems)
      .filter(([_, quantity]) => quantity > 0)
      .map(([productId, quantity]) => {
        const product = all_product.find(
          (product) => product.id === Number(productId)
        );
        return {
          productId,
          productName: product ? product.name : "Unknown",
          quantity,
        };
      });

    setCartItemsState(updatedCartItems);
  }, [cartItems, all_product]);

  const increaseQuantity = (productId) => {
    updateCartItemQuantity(productId, cartItems[productId] + 1);
  };

  const decreaseQuantity = (productId) => {
    if (cartItems[productId] > 1) {
      updateCartItemQuantity(productId, cartItems[productId] - 1);
    } else {
      removeFromCart(productId);
    }
  };

  const handleClick = () => {
    if (!animate) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
        handleSubmit();
      }, 5000); // Reduced animation duration for smoother experience
    }
  };

  const handleSubmit = async () => {
    const updatedCartItems = cartItemsState.map((item) => {
      const product = all_product.find(
        (product) => product.id === Number(item.productId)
      );

      if (product) {
        return {
          productId: product.id,
          productName: product.name,
          productPrice: product.new_price,
          quantity: item.quantity,
          productImage: product.image,
          productDealer: product.dealer,
          username: user.username,
          dateAdded: new Date(),
        };
      } else {
        return {
          productId: item.productId,
          productName: "Unknown",
          productPrice: 0,
          quantity: item.quantity,
          productImage: "",
          productDealer: "Unknown",
          username: user.username,
          dateAdded: new Date(),
        };
      }
    });

    try {
      await axios.post("http://localhost:3001/carted", {
        cartItems: updatedCartItems,
      });
      alert("Cart items have been saved to the database.");
      setCartItemsState([]);
    } catch (error) {
      console.error("Error saving cart items to database", error);
      alert("There was an error saving the cart items.");
    }
  };

  return (
    <div className="cartitems">
      <h1>Cart Page</h1>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cartItemsState.map((item) => {
        const product = all_product.find(
          (product) => product.id === Number(item.productId)
        );
        if (product) {
          return (
            <div key={item.productId}>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={product.image}
                  alt=""
                  className="carticon-product-icon"
                />
                <p>{product.name}</p>
                <p>Rs: {product.new_price}</p>
                <div className="cartitems-quantity">
                  <button
                    onClick={() => decreaseQuantity(item.productId)}
                    className="quantity-button"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.productId)}
                    className="quantity-button"
                  >
                    +
                  </button>
                </div>
                <p>Rs: {product.new_price * item.quantity}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => removeFromCart(item.productId)}
                  alt="Remove"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-gif">
          <img src={cart} alt="Loading..." className="cartitems-gif-image" />
        </div>
        <div className="cartitems-total1">
          <button
            className={`order ${animate ? "animate" : ""}`}
            onClick={handleClick}
          >
            <span className="default">Complete Order</span>
            <span className="success">
              Order Placed
              <svg viewBox="0 0 12 10">
                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
              </svg>
            </span>
            <div className="box"></div>
            <div className="truck">
              <div className="back"></div>
              <div className="front">
                <div className="window"></div>
              </div>
              <div className="light top"></div>
              <div className="light bottom"></div>
            </div>
            <div className="lines"></div>
          </button>
        </div>

        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>Rs: {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>Rs: {getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={handleClick}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
