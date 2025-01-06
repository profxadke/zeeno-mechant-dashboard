import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/sidebar.css";

const Sidebar = ({ collapsed, toggleCollapse, open, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard", icon: "📊", section: "Home", path: "/" },
    {
      title: "Create Event",
      icon: "🎉",
      section: "Registration Management",
      path: "/create-registration-event",
    },
    {
      title: "View Registration",
      icon: "📋",
      section: "Registration Management",
      path: "/view-registration",
    },
    {
      title: "View Reports",
      icon: "📄",
      section: "Registration Management",
      path: "/view-registration-reports",
    },
    {
      title: "Create Voting Event",
      icon: "🗳️",
      section: "Voting Management",
      path: "/create-voting-event",
    },
    {
      title: "View Dashboard",
      icon: "⚙️",
      section: "Voting Management",
      path: "/view-voting-dashboard",
    },
    {
      title: "View Voting Reports",
      icon: "📄",
      section: "Voting Management",
      path: "/view-voting-report",
    },
    {
      title: "Create Ticketing Event",
      icon: "🎫",
      section: "Ticket Management",
      path: "/create-ticket-event",
    },
    {
      title: "View Dashboard",
      icon: "⚙️",
      section: "Ticket Management",
      path: "/view-ticket-dashboard",
    },
    {
      title: "View Reports",
      icon: "📄",
      section: "Ticket Management",
      path: "/view-ticket-report",
    },
  ];

  return (
    <div
      className={`sidebar ${collapsed ? "collapsed" : ""} ${open ? "open" : ""}`}
    >
      <div className="sidebar-header">
        <div className="logo-container">
          {collapsed ? (
            <img
              src="https://i.ibb.co/kGJwMbM/Screenshot-2024-12-25-143534.png"
              alt="ZeenoPay"
              className="sidebar-logo"
            />
          ) : (
            <img
              src="https://i.ibb.co/h8f3Mkt/Screenshot-2024-12-25-140415-removebg-preview.png"
              alt="ZeenoPay"
              className="sidebar-logo"
            />
          )}
        </div>
        <button className="collapse-button" onClick={toggleCollapse}>
          {collapsed ? "→" : "←"}
        </button>
      </div>
      <div className="menu">
        {menuItems.map((item, index) => (
          <div key={index}>
            {index === 0 || menuItems[index - 1].section !== item.section ? (
              <h4 className={`menu-section ${collapsed ? "hidden" : ""}`}>
                {item.section}
              </h4>
            ) : null}
            {item.path === "/view-voting-dashboard" ? (
              <Link to={item.path}>
                <button
                  className={`menu-item ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                >
                  <span className="menu-icon">{item.icon}</span>
                  {!collapsed && <span className="menu-text">{item.title}</span>}
                </button>
              </Link>
            ) : (
              <button className="menu-item disabled">
                <span className="menu-icon">{item.icon}</span>
                {!collapsed && <span className="menu-text">{item.title}</span>}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
