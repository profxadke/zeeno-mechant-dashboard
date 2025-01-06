import React, { useState } from "react";
import "../../assets/eventdetails.css";

const EventDetailsForm = () => {
  const [image, setImage] = useState(null);

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

  return (
    <div className="event-details-container">
      <h2 className="form-title">Fill Event Details</h2>
      <div className="event-details-form">
        <div className="form-grid">
          <div>
            <label>Event Name</label>
            <input type="text" placeholder="Enter Event Name" />
          </div>
          <div>
            <label>Event Date</label>
            <input type="date" />
          </div>
          <div>
            <label>Event Description</label>
            <textarea placeholder="Write event description here"></textarea>
          </div>
          <div>
            <label>Event Guidelines</label>
            <textarea placeholder="Write event guidelines here"></textarea>
          </div>
          <div>
            <label>Event Terms & Conditions</label>
            <textarea placeholder="Write event terms & conditions here"></textarea>
          </div>
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

export default EventDetailsForm;
