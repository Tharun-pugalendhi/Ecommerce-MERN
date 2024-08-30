import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css"; // Add custom styles

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const [orderCount, setOrderCount] = useState(null);

  useEffect(() => {
    // Fetch user count
    const fetchUserCount = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        console.log(response.data.length);
        setUserCount(response.data.length);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    // Fetch product count
    const fetchProductCount = async () => {
      try {
        const response = await axios.get("http://localhost:3001/carted");
        setProductCount(response.data.count);
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    };

    // Fetch order count
    const fetchOrderCount = async () => {
      try {
        const response = await axios.get("http://localhost:3001/carted");
        setOrderCount(response.data.length);
      } catch (error) {
        console.error("Error fetching order count:", error);
      }
    };

    fetchUserCount();
    fetchProductCount();
    fetchOrderCount();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h2>Total Users</h2>
          <p>{userCount !== null ? userCount : "Loading..."}</p>
        </div>
        {/* <div className="stat-card">
          <h2>Total Products</h2>
          <p>{productCount !== null ? productCount : "Loading..."}</p>
        </div> */}
        <div className="stat-card">
          <h2>Total Orders</h2>
          <p>{orderCount !== null ? orderCount : "Loading..."}</p>
        </div>
        <div className="stat-card">
          <h2>Total Dealers</h2>
          <p>15</p>
        </div>
        <div className="stat-card">
          <h2>Total Products</h2>
          <p>36</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;