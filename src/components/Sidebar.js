import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChartBar, FaRegClipboard, FaRegFileAlt, FaCogs, FaVoteYea, FaTicketAlt, FaCalendarPlus } from "react-icons/fa";
import "../assets/sidebar.css";

const Sidebar = ({ collapsed, toggleCollapse, open, toggleSidebar }) => {
  const location = useLocation();
  const sidebarRef = useRef(null);

  const menuItems = [
    { title: "Dashboard", icon: <FaChartBar />, section: "Home", path: "/" },
    {
      title: "Create Event",
      icon: <FaCalendarPlus />,
      section: "Registration Management",
      path: "/create-registration-event",
    },
    {
      title: "View Registration",
      icon: <FaRegClipboard />,
      section: "Registration Management",
      path: "/view-registration",
    },
    {
      title: "View Reports",
      icon: <FaRegFileAlt />,
      section: "Registration Management",
      path: "/view-registration-reports",
    },
    {
      title: "Create Voting Event",
      icon: <FaVoteYea />,
      section: "Voting Management",
      path: "/create-voting-event",
    },
    {
      title: "View Dashboard",
      icon: <FaCogs />,
      section: "Voting Management",
      path: "/view-voting-dashboard",
    },
    {
      title: "View Voting Reports",
      icon: <FaRegFileAlt />,
      section: "Voting Management",
      path: "/view-voting-report",
    },
    {
      title: "Create Ticketing Event",
      icon: <FaTicketAlt />,
      section: "Ticket Management",
      path: "/create-ticket-event",
    },
    {
      title: "View Dashboard",
      icon: <FaCogs />,
      section: "Ticket Management",
      path: "/view-ticket-dashboard",
    },
    {
      title: "View Reports",
      icon: <FaRegFileAlt />,
      section: "Ticket Management",
      path: "/view-ticket-report",
    },
    {
      title: "Customize Website",
      icon: <FaRegFileAlt />,
      section: "CMS",
      path: "/customize-website",
    },
  ];

  // Handle click outside the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (open) {
          // Close the sidebar if it's open
          toggleSidebar(); 
        }
      }
    };

    // Add event listener for clicks outside the sidebar
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, toggleSidebar]);

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${collapsed ? "collapsed" : ""} ${open ? "open" : ""}`}
    >
      <div className="sidebar-header">
        <div className="logo-container">
          {collapsed ? (
            <>
              <img
                src="https://i.ibb.co/KxWNMdg/IMG-0654.png"
                alt="ZeenoPay"
                className="sidebar-logo"
              />
            </>
          ) : (
            <>
              <img
                src="https://i.ibb.co/HdffZky/zeenopay-logo-removebg-preview.png"
                alt="ZeenoPay"
                className="sidebar-logo"
              />
              <span className="merchant-name">| &nbsp; Merchant</span>
            </>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;