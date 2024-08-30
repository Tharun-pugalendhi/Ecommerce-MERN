import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminUser.css"; // Ensure this file contains the responsive CSS

const AdminUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user details
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin-user">
      <h1>User Details</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone no</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td data-label="Name">{user.username}</td>
              <td data-label="Email">{user.email}</td>
              <td data-label="Phone no">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUser;