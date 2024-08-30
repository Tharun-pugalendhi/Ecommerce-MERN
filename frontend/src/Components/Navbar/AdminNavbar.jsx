/* jshint esversion:6 */
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/logo5.png";
import "./AdminNavbar.css";
import hamburger_icon from "../Assets/ham.png";
import { UserContext } from "../../Pages/UserContext";

const AdminNavbar = () => {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuVisible((prevState) => !prevState);
  };

  return (
    <nav className="admin-navbar">
      <Link to="/admin/dashboard" className="nav-logo">
        <img
          src={logo}
          alt="Indian Kitchen Logo"
          style={{ width: "150px", height: "150px" }}
        />
      </Link>
      <img
        onClick={toggleMenu}
        className={`nav-dropdown ${menuVisible ? "open" : ""}`}
        src={hamburger_icon}
        alt="menu"
      />
      <div
        className={`admin-nav-menu-container ${
          menuVisible ? "admin-nav-menu-visible" : ""
        }`}
      >
        <ul className="admin-nav-menu">
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/order">Orders</Link>
          </li>
          <li>
            <Link to="/admin/dealer">Dealers</Link>
          </li>
          <li>
            <Link to="/admin/adminuser">Users</Link>
          </li>
          <li>
            <Link to="/admin/addproduct">Add Product</Link>
          </li>
        </ul>
      </div>
      <div className="admin-nav-login-cart">
        {user.loggedIn && (
          <>
            <span className="admin-user-button">{user.username}</span>
            <button className="admin-logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
