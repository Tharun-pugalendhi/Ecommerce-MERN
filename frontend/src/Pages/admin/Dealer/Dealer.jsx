import React, { useState, useEffect } from "react";
import axios from "axios";
import all_product from "../../../Components/Assets/all_product"; // Import the product data
import "./Dealer.css"; // Import the CSS file

const Dealer = () => {
  const [dealers, setDealers] = useState({});
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Organize products by dealer
    const organizeByDealer = () => {
      const dealerData = {};

      all_product.forEach((product) => {
        if (!dealerData[product.dealer]) {
          dealerData[product.dealer] = [];
        }
        dealerData[product.dealer].push(product);
      });

      setDealers(dealerData);
    };

    organizeByDealer();
  }, []);

  useEffect(() => {
    // Fetch cart items when a dealer is selected
    const fetchCartItems = async () => {
      if (selectedDealer) {
        try {
          const response = await axios.get(`http://localhost:3001/cartitems/${selectedDealer}`);
          setCartItems(response.data);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      } else {
        setCartItems([]);
      }
    };

    fetchCartItems();
  }, [selectedDealer]);

  // Handle dealer selection
  const handleDealerChange = (event) => {
    setSelectedDealer(event.target.value === "all" ? null : event.target.value);
  };

  // Filter products based on selected dealer
  const filteredProducts = selectedDealer
    ? dealers[selectedDealer] || []
    : Object.values(dealers).flat();

  // Calculate total products and total price
  const totalProducts = filteredProducts.length;
  const totalPrice = filteredProducts.reduce(
    (acc, product) => acc + product.new_price,
    0
  );

  return (
    <div className="dealer-container">
      <div className="dealer-dropdown">
        <select onChange={handleDealerChange}>
          <option value="all">All Dealers</option>
          {Object.keys(dealers).map((dealer) => (
            <option key={dealer} value={dealer}>
              Dealer {dealer.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <div className="products-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <table className="product-box">
                  <tbody>
                    <tr>
                      <td>
                        <p className="product-price">
                          Price Rs: <span className="price">{product.new_price}</span>
                        </p>
                      </td>
                      <td>
                        <p className="product-totalprice">
                          Total Price Rs: <span className="price">{product.new_price}</span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <p>No products available for this dealer.</p>
        )}
      </div>
      <div className="total-summary">
        <h3>Total Products: {totalProducts}</h3>
        <h3>Total Price: Rs {totalPrice.toFixed(2)}</h3>
      </div>
      <div className="cart-items-list">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.productImage} alt={item.productName} className="cart-item-image" />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.productName}</h3>
                <p className="cart-item-username">User: {item.username}</p>
                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                <p className="cart-item-totalprice">Total Price: Rs {item.productPrice * item.quantity}</p>
                <p className="cart-item-date">Date: {new Date(item.dateAdded).toLocaleString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No cart items available for this dealer.</p>
        )}
      </div>
    </div>
  );
};

export default Dealer;
