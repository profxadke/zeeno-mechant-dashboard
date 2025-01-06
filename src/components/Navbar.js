import React, { useState, useEffect } from "react";
import { FaSignOutAlt, FaBars, FaChevronDown } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationDropdown from "./NotificationDropdown";
import { useToken } from "../context/TokenContext";
import "../assets/navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [username, setUsername] = useState(""); 
  const location = useLocation();
  const { updateToken } = useToken();
  const navigate = useNavigate();

  const pageTitleMap = {
    "/": "Dashboard Analytics",
    "/kyc-verification": "KYC Verification",
    "/profile": "Your Merchant Profile",
    "/create-registration-event": "Create Registration Event",
    "/view-registration": "View Registration",
    "/view-registration-reports": "View Registration Reports",
    "/create-voting-event": "Create Voting Event",
    "/view-voting-dashboard": "View Voting Dashboard", 
    "/view-voting-report": "View Voting Report",
    "/create-ticket-event": "Create Ticket Event",
    "/view-ticket-dashboard": "View Ticket Dashboard",
    "/view-ticket-report": "View Ticket Report",
    "/event-description": "Voice of Nepal - Season 6",
  };

  const pageTitle = pageTitleMap[location.pathname] || "Dashboard";

  useEffect(() => {
    const fetchUsername = () => {
      const storedUsername = sessionStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        setUsername("Guest");
      }
    };

    fetchUsername();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    toggleSidebar();
  };

  const handleLogout = () => {
    updateToken(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <div
          className={`page-title ${isDropdownOpen ? "open" : ""}`}
          onClick={toggleDropdown}
        >
          {location.pathname === "/view-registration" && events.length === 0
            ? "View Registration"
            : pageTitle}
          
          {location.pathname === "/view-voting-dashboard" && events.length > 0 && (
            <>
              <FaChevronDown />
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  {events.map((event, index) => (
                    <li key={index}>{event.title}</li>

                  ))}
                </ul>
              )}
            </>
          )}
        </div>
        <button className="hamburger-menu" onClick={toggleMobileMenu}>
          <FaBars />
        </button>
      </div>

      {/* Right Section */}
      <div className={`navbar-right ${isMobileMenuOpen ? "show" : ""}`}>
        <Link to="/profile">
          <span className="user-greeting">
            Hello, <span className="user-name">{username}</span>
          </span>
        </Link>

        <Link to="/profile">
          <img
            src="https://i.postimg.cc/hvJ8ct4D/image.png"
            alt="Profile"
            className="profile-image"
          />
        </Link>

        {/* Notification Dropdown */}
        <NotificationDropdown />

        <button className="logout-button" onClick={handleLogout}>
          <div className="icon-box">
            <FaSignOutAlt className="icon" />
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
