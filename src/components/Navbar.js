import React, { useState, useEffect } from "react";
import { FaSignOutAlt, FaBars, FaChevronDown, FaBell } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationDropdown from "./NotificationDropdown";
import { useToken } from "../context/TokenContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    // Show success toast
    toast.success("You have logged out successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Wait before redirecting
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <nav className="navbar">
      {/* Image for Mobile View */}
      <div className="navbar-mobile-image">
        <img
          src="https://i.ibb.co/HdffZky/zeenopay-logo-removebg-preview.png"
          alt="Navbar Logo"
          className="mobile-logo"
        />
        <span className="merchant-text">|  &nbsp; Merchant</span>
      </div>

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
      </div>

      {/* Right Section (For Desktop and Mobile) */}
      <div className={`navbar-right ${isMobileMenuOpen ? "show" : ""}`}>
        <div className="user-info-container">
          <Link to="/profile">
            <img
              src="https://i.postimg.cc/hvJ8ct4D/image.png"
              alt="Profile"
              className="profile-image"
            />
          </Link>
          <Link to="/profile">
            <span className="user-greeting">
              Hello, <span className="user-name">{username}</span>
            </span>
          </Link>
        </div>
        <div className="notification-container">
          <FaBell style={{ fontSize: "20px" }} className="notification-icon" />
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt className="logout-icon" />
          Logout
        </button>
        <button className="hamburger-menu" onClick={toggleMobileMenu}>
          <FaBars style={{ fontSize: "20px" }} />
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .navbar-left {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .page-title {
          position: relative;
          font-size: 18px;
          font-weight: 500;
          color: #000;
          flex: 1;
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
        }

        .page-title:hover .dropdown-menu,
        .page-title.open .dropdown-menu,
        .dropdown-menu:hover {
          display: block;
        }

        .dropdown-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          list-style: none;
          padding: 10px 0;
          min-width: 200px;
          z-index: 10;
        }

        .dropdown-menu li {
          padding: 10px 15px;
          font-size: 14px;
          color: #555;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .dropdown-menu li:hover {
          background-color: #f5f5f5;
          color: #000;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .user-info-container {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-greeting {
          font-size: 14px;
          color: #555;
          white-space: nowrap;
        }

        .user-name {
          font-weight: 600;
          color: #000;
        }

        .profile-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .hamburger-menu {
          display: none; 
          color: #028248;
          background-color: #f0f0f0;
          padding-bottom: 2px;
          padding-top: 4px;
          padding-left: 10px;
          padding-right: 10px;
          border-radius: 50%;
        }

        .notification-container{
          color: #028248;
          background-color: #f0f0f0;
          padding-bottom: 6px;
          padding-top: 8px;
          padding-left: 10px;
          padding-right: 10px;
          border-radius: 50%;
        }

        .navbar-mobile-image {
          display: none; 
        }

        .mobile-logo {
          width: 100px;
          margin: 0 auto;
          display: block;
        }

        .logout-button {
          display: flex;
          align-items: center;
          gap: 5px;
          background-color: #028248;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
      
        .logout-button:hover {
          background-color: #026437;
        }
      
        .logout-icon {
          font-size: 16px;
        }
      

        /* Mobile-Responsive Navbar */
        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            padding: 10px 15px;
          }

          .navbar-left {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
          }

          .page-title {
            display: none; 
          }

          .navbar-right {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            gap: 10px;
          }

          .notification-container {
            margin-left: auto;
          }

          .user-info-container {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .profile-image {
            width: 35px;
            height: 35px;
            border-radius: 50%;
          }

          .hamburger-menu {
            display: block; 
          }

          .navbar-mobile-image {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .mobile-logo {
            width: 120px;
          }
          
          .merchant-text {
            font-size: 14px;
            font-weight: 600;
            color: #000;
          }

          /* Sticky Navbar on Mobile */
          .navbar.sticky {
            position: sticky;
            top: 0;
            z-index: 10;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .navbar.sticky .navbar-right,
          .navbar.sticky .user-info-container,
          .navbar.sticky .hamburger-menu {
            display: none;
          }

          .navbar.sticky .navbar-mobile-image {
            display: flex;
          }

          .logout-button {
            display: none; /* Hide on mobile */
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
