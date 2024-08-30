/* jshint esversion:6 */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPage.css"; // Ensure to style your dashboard
import { Route } from "react-router-dom";

const AdminDashboard = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:3001/carted");
        const items = response.data;

        // Log the cart items with dateAdded field
        items.forEach((item) => {
          console.log(
            `Product: ${item.productName}, Date Added: ${item.dateAdded}`
          );
        });

        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // Function to format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const datePart = date.toLocaleDateString(undefined, options);
    const timePart = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return { datePart, timePart };
  };

  // Helper function to group items by day, 6-hour interval, and username
  const groupItemsByDayAndInterval = (items) => {
    return items.reduce((acc, item) => {
      const date = new Date(item.dateAdded);
      const day = date.toISOString().split("T")[0];
      const hour = date.getUTCHours();
      const interval = Math.floor(hour / 6);

      if (!acc[day]) {
        acc[day] = { intervals: {}, totalOrders: 0, totalPrice: 0 };
      }

      if (!acc[day].intervals[interval]) {
        acc[day].intervals[interval] = {};
      }

      if (!acc[day].intervals[interval][item.username]) {
        acc[day].intervals[interval][item.username] = [];
      }

      acc[day].intervals[interval][item.username].push(item);
      acc[day].totalOrders += 1;
      acc[day].totalPrice += item.productPrice * item.quantity;
      return acc;
    }, {});
  };

  const groupedItems = groupItemsByDayAndInterval(cartItems);

  // Calculate overall totals
  const overallTotals = Object.keys(groupedItems).reduce(
    (acc, day) => {
      acc.totalOrders += groupedItems[day].totalOrders;
      acc.totalPrice += groupedItems[day].totalPrice;
      return acc;
    },
    { totalOrders: 0, totalPrice: 0 }
  );

  return (
    <div className="admin-dashboard" style={{ backgroundColor: "#F7EFE5" }}>
      <table>
        <td>
          <h1>Orders</h1>
        </td>
        <td>
          <div className="overall-totals">
            <h2>Overall Totals</h2>
            <p>
              Total Orders:<strong> {overallTotals.totalOrders}</strong>
            </p>
            <p>
              Total Price: Rs <strong>{overallTotals.totalPrice}</strong>
            </p>
          </div>
        </td>
      </table>
      <div className="dashboard-section">
        {Object.keys(groupedItems).map((day) => (
          <div key={day} className="day-section">
            <div className="day-header">
              <h2 style={{ textAlign: "center", margin: "20px 0" }}>
                Orders for {day}
              </h2>
              <div className="day-totals">
                <p>
                  Total Orders:
                  <strong>{groupedItems[day].totalOrders}</strong>
                </p>
                <p>
                  Total Price: Rs{" "}
                  <strong>{groupedItems[day].totalPrice}</strong>
                </p>
              </div>
            </div>

            {Object.keys(groupedItems[day].intervals).map((interval) => (
              <div key={interval} className="interval-section">
                <h3>
                  Interval: {interval * 6 + 6}:00 - {interval * 6 + 12}:00
                </h3>

                {Object.keys(groupedItems[day].intervals[interval]).map(
                  (username) => (
                    <div key={username} className="user-section">
                      <h4>User: {username}</h4>
                      <table>
                        <thead>
                          <tr>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Price (Rs)</th>
                            <th>Quantity</th>
                            <th>Total (Rs)</th>
                            <th>Date Added</th>
                            <th>Time Added</th>
                          </tr>
                        </thead>
                        <tbody>
                          {groupedItems[day].intervals[interval][username].map(
                            (item, index) => {
                              const { datePart, timePart } = formatDateTime(
                                item.dateAdded
                              );
                              return (
                                <tr key={index}>
                                  <td>
                                    {item.productImage ? (
                                      <img
                                        src={item.productImage}
                                        alt={item.productName}
                                        style={{
                                          width: "100px",
                                          height: "auto",
                                        }}
                                      />
                                    ) : (
                                      <span className="no-image">No Image</span>
                                    )}
                                  </td>
                                  <td>{item.productName}</td>
                                  <td>{item.productPrice}</td>
                                  <td>{item.quantity}</td>
                                  <td>{item.productPrice * item.quantity}</td>
                                  <td>{datePart}</td>
                                  <td>{timePart}</td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
