// App.js
/* jshint esversion:6 */
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import AdminNavbar from "./Components/Navbar/AdminNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import Blog from "./Pages/Blog";
import Contacts from "./Pages/Contacts";
import { UserProvider, UserContext } from "../src/Pages/UserContext";
import { useContext } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminOrder from "./Pages/admin/Order/AdminPage";
import AddProduct from "./Pages/admin/AdminAddProduct/AddProduct";
import AdminUser from "./Pages/admin/AdminUser/AdminUser";
import Dealer from "./Pages/admin/Dealer/Dealer";
import AdminDashboard from "./Pages/admin/dashboard/AdminDashboard";

const AppContent = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user.loggedIn && user.role === "admin" ? <AdminNavbar /> : <Navbar />}
      <Routes>
        {user.loggedIn && user.role === "admin" ? (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/" element={<Shop />} />

            <Route path="/admin/order" element={<AdminOrder />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            <Route path="/admin/adminuser" element={<AdminUser />} />
            <Route path="/admin/dealer" element={<Dealer />} />
            <Route path="/admin/addproduct" element={<AddProduct />} />

            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Shop />} />
            <Route
              path="/Product"
              element={<ShopCategory banner={men_banner} category="men" />}
            />
            <Route
              path="/Topselling"
              element={
                <ShopCategory
                  banner={women_banner}
                  category="women"
                  name="women"
                />
              }
            />
            <Route
              path="/JustArrived"
              element={
                <ShopCategory banner={kid_banner} category="kid" name="kid" />
              }
            />
            <Route path="/Blog" element={<Blog />} />
            <Route path="/Contacts" element={<Contacts />} />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
          </>
        )}
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
