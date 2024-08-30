// src/Components/Navbar.jsx
/* jshint esversion:6 */
import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo5.png";
import cart_icon from "../Assets/cart_icon.png";
import hamburger_icon from "../Assets/ham.png";
import usericon from "../Assets/usericon.png"; // Add the path to your user icon
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { UserContext } from "../../Pages/UserContext";

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const { user, logoutUser } = useContext(UserContext);

  const toggleMenu = () => {
    setMenuVisible((prevState) => !prevState);
  };

  return (
    <div className="navbar">
      <Link to="/" onClick={() => setMenuVisible(false)} className="nav-logo">
        <img
          className="logo"
          src={logo}
          alt="logo"
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
        className={`nav-menu-container ${
          menuVisible ? "nav-menu-visible" : ""
        }`}
      >
        <ul className="nav-menu">
          <li onClick={() => setMenuVisible(false)}>
            <Link to="/">Home</Link>
          </li>
          {user.loggedIn && user.role === "admin" && (
            <li onClick={() => setMenuVisible(false)}>
              <Link to="/admin-dashboard">Dashboard</Link>
            </li>
          )}
          <li onClick={() => setMenuVisible(false)}>
            <Link to="/Product">Men</Link>
          </li>
          <li onClick={() => setMenuVisible(false)}>
            <Link to="/Topselling">Women</Link>
          </li>
          <li onClick={() => setMenuVisible(false)}>
            <Link to="/JustArrived">Kids</Link>
          </li>
          <li onClick={() => setMenuVisible(false)}>
            <Link to="/Blog">Blog</Link>
          </li>
          <li onClick={() => setMenuVisible(false)}>
            <Link to="/Contacts">Contacts</Link>
          </li>
          <li onClick={() => setMenuVisible(true)}>
            <span className="cartvisible1">
              {" "}
              <Link to="/cart">
                <img className="cartimg" src={cart_icon} alt="cart" />
              </Link>
              {user.loggedIn && user.role !== "admin" && (
                <div className="nav-cart-count">{getTotalCartItems()}</div>
              )}
            </span>
          </li>
        </ul>
      </div>
      <div className="nav-login-cart">
        {user.loggedIn ? (
          <>
            <span className="username-button">
              <img src={usericon} alt="user" className="user-icon" />{" "}
              {/* User icon */}
              Hi {user.username}
            </span>
            <div className="nav-dropdown-content">
              <button onClick={logoutUser}>Logout</button>
            </div>
          </>
        ) : (
          <Link to="/login">
            <button className="nav-dropdown-content">Login</button>
          </Link>
        )}

        <Link to="/cart" className="cartvisible2">
          <img className="cartimg" src={cart_icon} alt="cart" />
        </Link>
        {user.loggedIn && user.role !== "admin" && (
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
