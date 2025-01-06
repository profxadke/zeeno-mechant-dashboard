import React from "react";
import { FaEdit } from "react-icons/fa";
import "../assets/eventdescription.css";

const DescriptionComponent = () => {
  return (
    <div className="event-container">
      {/* Event Image */}
      <img
        src="https://i.ibb.co/vV2dV7h/the-voice.webp"
        alt="Event Banner"
        className="event-image"
      />
      <div className="event-content">
        {/* Header Section */}
        <div className="event-header">
          <h1 className="event-title">
            Voice Of Nepal - Season 6 ( Finalist )
          </h1>
          <div className="action-buttons">
            <button className="social-button">
              <FaEdit className="icon-desp" />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* Event Details */}
        <div className="event-details">
          <div className="detail-box">
            <p className="detail-title">Event Type</p>
            <h3 className="detail-value">Reality Shows</h3>
          </div>
          <div className="detail-box">
            <p className="detail-title">Event Round</p>
            <h3 className="detail-value">Finalist</h3>
          </div>
          <div className="detail-box">
            <p className="detail-title">Start Date</p>
            <h3 className="detail-value">Jan 12, 2024 10:00 AM</h3>
          </div>
          <div className="detail-box">
            <p className="detail-title">End Date</p>
            <h3 className="detail-value">Jan 20, 2024 12:00 PM</h3>
          </div>
          <div className="detail-box">
            <p className="detail-title">Event Location</p>
            <h3 className="detail-value">Durbarmarga, Nepal</h3>
          </div>
          <div className="detail-box">
            <p className="detail-title">Total Candidate Left</p>
            <h3 className="detail-value">6</h3>
          </div>
          <div className="detail-box">
            <p className="detail-title">Updated Date</p>
            <h3 className="detail-value">Dec 28, 2024 4:00 PM</h3>
          </div>
          <div className="detail-box">
            <p className="detail-title">Upload Date</p>
            <h3 className="detail-value">Dec 28, 2024 12:30 PM</h3>
          </div>
        </div>

        {/* Event Description */}
        <div className="event-description">
          <h2 className="description-title">Event Description</h2>
          <p className="description-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionComponent;
