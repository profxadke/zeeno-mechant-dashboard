import React, { useState } from "react";
import "../../assets/eventdetails.css";

const TicketDetailsForm = () => {
  const [image, setImage] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [bookingStartDate, setBookingStartDate] = useState("");
  const [bookingEndDate, setBookingEndDate] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Only accept image files (png, jpeg, jpg)
      if (file.type === "image/png" || file.type === "image/jpeg") {
        setImage(URL.createObjectURL(file));
      } else {
        alert("Please upload a PNG or JPEG image.");
      }
    }
  };

  const handleEventDateChange = (e) => {
    setEventDate(e.target.value);
  };

  const handleEventVenueChange = (e) => {
    setEventVenue(e.target.value);
  };

  const handleEventCategoryChange = (e) => {
    setEventCategory(e.target.value);
  };

  const handleBookingStartDateChange = (e) => {
    setBookingStartDate(e.target.value);
  };

  const handleBookingEndDateChange = (e) => {
    setBookingEndDate(e.target.value);
  };

  return (
    <div className="event-details-container">
      <h2 className="form-title">Fill Ticketing Event Details</h2>
      <div className="event-details-form">
        <div className="form-grid">
          {/* Ticketing Event Name */}
          <div>
            <label>Ticketing Event Name</label>
            <input type="text" placeholder="Enter Ticketing Event Name" />
          </div>

          {/* Event Date */}
          <div>
            <label>Event Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={handleEventDateChange}
              placeholder="Select Event Date"
            />
          </div>

          {/* Event Venue/Location */}
          <div>
            <label>Event Venue/Location</label>
            <input
              type="text"
              value={eventVenue}
              onChange={handleEventVenueChange}
              placeholder="Enter Event Venue/Location"
            />
          </div>

          {/* Event Category */}
          <div>
            <label>Event Category</label>
            <input
              type="text"
              value={eventCategory}
              onChange={handleEventCategoryChange}
              placeholder="Enter Event Category"
            />
          </div>

          {/* Booking Starting Date */}
          <div>
            <label>Booking Starting Date</label>
            <input
              type="date"
              value={bookingStartDate}
              onChange={handleBookingStartDateChange}
              placeholder="Select Booking Start Date"
            />
          </div>

          {/* Booking Closing Date */}
          <div>
            <label>Booking Closing Date</label>
            <input
              type="date"
              value={bookingEndDate}
              onChange={handleBookingEndDateChange}
              placeholder="Select Booking Closing Date"
            />
          </div>

          {/* Event Description */}
          <div>
            <label>Event Description</label>
            <textarea placeholder="Write event description here"></textarea>
          </div>

          {/* Upload Event Photos/Banners */}
          <div>
            <label>Upload Event Photos/Banners</label>
            <div className="upload-box" onClick={() => document.getElementById('file-input').click()}>
              {image ? (
                <img src={image} alt="Uploaded" className="uploaded-image" />
              ) : (
                <>
                  <span>+</span>
                  <p>Image should be in png/jpeg only</p>
                </>
              )}
            </div>
            <input
              type="file"
              id="file-input"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsForm;
