import { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home");

    // Below functionality is for showing dot sign if user is adding item in the cart. If the totalCartItems is set to zero it should not be showing.
    const {getTotalCartAmount, token, setToken} = useContext(StoreContext);

    const navigate = useNavigate()

    const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
    }

    return (
      <div className="navbar">
        <Link to="/">
          <img src={assets.logo} alt="logo of the website" className="logo" />
        </Link>
        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            Mobile-App
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            Contact Us
          </a>
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} alt="search icon" />
          <div className="navbar-search-icon">
            <Link to="/Cart">
              <img src={assets.basket_icon} alt="" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? 
            <button onClick={() => setShowLogin(true)}>Sign In</button>
          :
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="Profile Icon" />
              <ul className="nav-profile-dropdown">
                <li onClick={() =>navigate('/myorders')}><img src={assets.bag_icon} alt="Bag Icon" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="Logout Icon" /><p>Logout</p></li>
              </ul>
            </div>
          }
        </div>
      </div>
    );
};

export default Navbar;
