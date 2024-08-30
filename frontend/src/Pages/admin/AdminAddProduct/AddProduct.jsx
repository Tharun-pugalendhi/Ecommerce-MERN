import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css"; // Ensure to style your form

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [dealer, setDealer] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productImage", productImage);
    formData.append("oldPrice", oldPrice);
    formData.append("newPrice", newPrice);
    formData.append("dealer", dealer);
    formData.append("category", category);

    try {
      const response = await axios.post("http://localhost:3001/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message || "Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="add-product">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Image:</label>
          <input
            type="file"
            onChange={(e) => setProductImage(e.target.files[0])}
            required
          />
        </div>
        <div className="form-group">
          <label>Old Price (Rs):</label>
          <input
            type="number"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Price (Rs):</label>
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Dealer:</label>
          <input
            type="text"
            value={dealer}
            onChange={(e) => setDealer(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default AddProduct;
