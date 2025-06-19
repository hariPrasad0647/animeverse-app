import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const name = localStorage.getItem("userName");
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("Jwt_Token");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const token = Cookies.get("Jwt_Token");
    setIsLoggedIn(!!token);
  }, []); // Only run once on mount

  // Optional: if you want to react to token changes after login without page reload
  useEffect(() => {
    const interval = setInterval(() => {
      const token = Cookies.get("Jwt_Token");
      setIsLoggedIn(!!token);
    }, 500); // check every 500ms (or you can use a better event-based pattern)

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="nav-container">
      <div>
        <img src="./logo.png" alt="logo" className="logo" />
      </div>
      <div className="nav-container">
        <Link className="link" to="/animeHome">
          <button className="home">Home 🏠</button>
        </Link>
        <Link className="link" to="/liked">
          <button className="home liked">Liked ❤️‍🔥</button>
        </Link>
        <button className="home username-button">
          <p className="userName">{name} 👨🏻‍💻</p>
        </button>

        {isLoggedIn ? (
          <button className="home logout" onClick={handleLogout}>
            <p className="userName">Logout ⏻</p>
          </button>
        ) : (
          <Link className="link" to="/login">
            <button className="home login">
              <p className="userName">Login 🔑</p>
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
