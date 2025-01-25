import React, { useState, useEffect } from "react";
import "../../assets/eventdetails.css";

const EventDetailsForm = () => {
  // Initial data from the JSON
  const initialData = {
    formImg: "",
    formDate: "",
    formLocation: "",
    formFee: "",
    female_only: false,
    cash_payment: false,
    formTitle: "",
  };

  const [image, setImage] = useState(initialData.formImg);
  const [eventName, setEventName] = useState(initialData.formTitle);
  const [eventDate, setEventDate] = useState(initialData.formDate.split("T")[0]);
  const [eventLocation, setEventLocation] = useState(initialData.formLocation);
  const [registrationFee, setRegistrationFee] = useState(initialData.formFee);
  const [femaleOnly, setFemaleOnly] = useState(initialData.female_only);
  const [cashPayment, setCashPayment] = useState(initialData.cash_payment);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
            <input
              className="event-name"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter Event Name"
            />
          </div>
          <div>
            <label>Event Date</label>
            <input
              className="event-date"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>
          <div>
            <label>Event Location</label>
            <input
              className="event-location"
              type="text"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              placeholder="Enter Event Location"
            />
          </div>
          <div>
            <label>Registration Fee</label>
            <input
              className="event-location"
              type="text"
              value={registrationFee}
              onChange={(e) => setRegistrationFee(e.target.value)}
              placeholder="Enter Registration Fee"
            />
          </div>
          <div>
            <label>Upload Event Photos/Banners</label>
            <div
              className="upload-box"
              onClick={() => document.getElementById('file-input').click()}
            >
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
              className="file-input"
              type="file"
              id="file-input"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          <div className="payment-checkboxes">
            <div>
              <input
                className="cash-payment"
                type="checkbox"
                checked={cashPayment}
                onChange={() => setCashPayment(!cashPayment)}
              />
              <label>Cash Payment Accepted</label>
            </div>
            <div>
              <input
                className="female-only"
                type="checkbox"
                checked={femaleOnly}
                onChange={() => setFemaleOnly(!femaleOnly)}
              />
              <label>Female Only Event</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsForm;
