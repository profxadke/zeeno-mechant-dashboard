import React, { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";

const NotificationDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "You got successfully logged in", timestamp: "1 min ago" },
  ]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const addSuccessNotification = (message) => {
    const newNotification = {
      id: notifications.length + 1,
      text: message,
      timestamp: "Just now",
    };
    setNotifications([newNotification, ...notifications]);
  };

  // Example of triggering success notification
  const handleEventCreationSuccess = () => {
    addSuccessNotification("Your event has been created successfully!");
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="notification-container" ref={dropdownRef}>
      <button className="notification-button" onClick={toggleDropdown}>
        <div className="icon-box">
          <FaBell className="icon" />
        </div>
        {notifications.length > 0 && (
          <span className="notification-count">{notifications.length}</span>
        )}
      </button>
      <div
        className={`notification-dropdown ${
          isDropdownOpen ? "open" : "closed"
        }`}
      >
        <div className="dropdown-header">
          <h4>Notifications</h4>
        </div>
        <div className="dropdown-body">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <p>{notification.text}</p>
              <span className="notification-timestamp">
                {notification.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .notification-container {
          position: relative;
        }
        .notification-button {
          background: none;
          border: none;
          cursor: pointer;
          position: relative;
        }
        .icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .notification-count {
          position: absolute;
          top: 0;
          right: 0;
          background-color: #ff5a5f;
          color: white;
          font-size: 12px;
          border-radius: 50%;
          padding: 2px 6px;
        }
        .notification-dropdown {
          position: absolute;
          top: 50px;
          right: 0;
          background-color: #fff;
          box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          width: 300px;
          z-index: 1000;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        .notification-dropdown.open {
          max-height: 300px;
          opacity: 1;
          visibility: visible;
        }
        .dropdown-header {
          padding: 10px 15px;
          border-bottom: 1px solid #f0f0f0;
          background-color: #f9f9f9;
        }
        .dropdown-header h4 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }
        .dropdown-body {
          max-height: 250px;
          overflow-y: auto;
        }

        /* Custom scrollbar styles */
        .dropdown-body::-webkit-scrollbar {
          width: 8px;
        }
        .dropdown-body::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 8px;
        }
        .dropdown-body::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 8px;
        }
        .dropdown-body::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .dropdown-body {
          scrollbar-width: thin;
          scrollbar-color: #888 #f1f1f1;
        }

        .notification-item {
          padding: 10px 15px;
          border-bottom: 1px solid #f0f0f0;
        }
        .notification-item:last-child {
          border-bottom: none;
        }
        .notification-item p {
          margin: 0;
          font-size: 14px;
        }
        .notification-timestamp {
          font-size: 12px;
          color: #888;
        }
      `}</style>
    </div>
  );
};

export default NotificationDropdown;
