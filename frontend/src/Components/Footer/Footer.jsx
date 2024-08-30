import React from "react";
import "./Footer.css"; // Ensure you import the CSS file
import logo1 from "../Assets/logo5.png";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-cta pt-5 pb-5">
          <div className="cta-row">
            <div className="single-cta">
              <i className="fas fa-map-marker-alt"></i>
              <div className="cta-text">
                <h4>Find us</h4>
                <strong style={{ fontSize: "10px" }}>
                  123 Thread Lane, Flavor Town, FT 45678<br></br>{" "}
                </strong>
              </div>
            </div>
            <div className="single-cta">
              <i className="fas fa-phone"></i>
              <div className="cta-text">
                <h4>Call us</h4>
                <span>9876543210</span>
              </div>
            </div>
            <div className="single-cta">
              <i className="far fa-envelope-open"></i>
              <div className="cta-text">
                <h4>Mail us</h4>
                <span>mail@info.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-content pt-5 pb-5">
          <div className="footer-row">
            <div className="footer-widget">
              <div className="footer-logo">
                <a href="index.html">
                  <img src={logo1} className="img-fluid" alt="logo" />
                </a>
              </div>
              <span>
                <div className="footer-text">
                  <p>Elevate style with every stitch at Thread.</p>
                </div>
              </span>
              <div className="footer-social-icon">
                <span>Follow us</span>
                <a href="#">
                  <i className="fab fa-facebook-f facebook-bg"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter twitter-bg"></i>
                </a>
                <a href="#">
                  <i className="fab fa-google-plus-g google-bg"></i>
                </a>
              </div>
            </div>
            <div className="footer-widget">
              <div className="footer-widget-heading">
                <h3>Useful Links</h3>
              </div>
              <div className="links-container">
                <ul className="useful-links">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/Topselling">Women</a>
                  </li>
                  <li>
                    <a href="/Blog">Blog</a>
                  </li>
                </ul>
                <ul className="useful-links">
                  <li>
                    <a href="/Product">Men</a>
                  </li>
                  <li>
                    <a href="/JustArrived">Kid</a>
                  </li>
                  <li>
                    <a href="/Contacts">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-widget">
              <div className="footer-widget-heading">
                <h3>Subscribe</h3>
              </div>
              <div className="footer-text mb-25">
                <p>
                  Don’t miss to subscribe to our new feeds, kindly fill the form
                  below.
                </p>
              </div>
              <div className="subscribe-form">
                <form action="#">
                  <input type="text" placeholder="Email Address" />
                  <button>
                    <i className="fab fa-telegram-plane"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="copyright-row">
            <div className="copyright-text">
              <p style={{ justifyContent: "center" }}>
                Copyright &copy; 2024, All Right Reserved{" "}
              </p>
            </div>
            {/* <div className="footer-menu">
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">Policy</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
