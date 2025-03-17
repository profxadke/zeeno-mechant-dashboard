import React, { useState } from "react";
import "../../assets/eventdetails.css";
import { useToken } from "../../context/TokenContext";

const VotingForm = ({ formData, setFormData, events, setEvents }) => {
  const {
    title = "",
    votingRound = "",
    desc = "",
    img = "",
    org = "",
    misc_kv = "",
  } = formData;
  const [votingMode, setVotingMode] = useState("");
  const [createdAt, setVotingStartDate] = useState("");
  const [finaldate, setVotingEndDate] = useState("");
  const [error, setError] = useState("");
  const [payment_info, setPaymentInfo] = useState("");
  const [votingAccessPreference, setVotingAccessPreference] = useState("");
  const [votingName, setVotingName] = useState(title);
  const [successMessage, setSuccessMessage] = useState("");
  const { token } = useToken();

  // Handle image upload for Event Photos/Banners and Event Logo
  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;

      // Update the form data with the base64 string
      if (field === "img") {
        setFormData({ ...formData, img: base64 });
      } else if (field === "misc_kv") {
        setFormData({ ...formData, misc_kv: base64 });
      }
    };

    reader.readAsDataURL(file);
  };

  const handleEventNameChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
    setVotingName(e.target.value);
  };

  const handleVotingRoundChange = (e) => {
    const selectedRound = e.target.value;
    setFormData({ ...formData, votingRound: selectedRound });

    if (selectedRound && selectedRound !== "None") {
      setVotingName(`${title} - ${selectedRound}`);
    } else {
      setVotingName(title);
    }
  };

  const handleEventDescriptionChange = (e) => {
    setFormData({ ...formData, desc: e.target.value });
  };

  const handleOrganiserChange = (e) => {
    setFormData({ ...formData, org: e.target.value });
  };

  const handleVotingModeChange = (e) => {
    setVotingMode(e.target.value);
  };

  const handleVotingStartDateChange = (e) => {
    const value = e.target.value;
    if (value && !isNaN(Date.parse(value))) {
      setVotingStartDate(value);
      setError("");
    } else {
      setError("Please select a valid start date and time.");
    }
  };

  const handleVotingEndDateChange = (e) => {
    const value = e.target.value;
    if (value && !isNaN(Date.parse(value))) {
      setVotingEndDate(value);
      if (new Date(value) <= new Date(createdAt)) {
        setError("End date and time must be after the start date and time.");
      } else {
        setError("");
      }
    } else {
      setError("Please select a valid end date and time.");
    }
  };

  const handleVotingAccessPreferenceChange = (e) => {
    setVotingAccessPreference(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (
      !title ||
      !votingRound ||
      !desc ||
      !org ||
      !createdAt ||
      !finaldate ||
      !misc_kv
    ) {
      setError("Please fill in all the required fields.");
      return;
    }

    if (!token) {
      setError("Authorization token is missing.");
      return;
    }

    const eventData = {
      title,
      votingRound,
      desc,
      img,
      org,
      misc_kv,
      votingMode,
      createdAt,
      finaldate,
      payment_info,
      votingAccessPreference,
    };

    try {
      const response = await fetch("https://auth.zeenopay.com/events/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Event successfully created:", result);

        // Update the events list with the newly created event
        setEvents([...events, result]);

        setSuccessMessage("Event successfully created!");

        // Reset form data
        setFormData({
          title: "",
          votingRound: "",
          desc: "",
          img: "",
          org: "",
          misc_kv: "",
        });
        setVotingMode("");
        setVotingStartDate("");
        setVotingEndDate("");
        setPaymentInfo("");
        setVotingAccessPreference("");
        setError("");
      } else {
        const error = await response.json();
        console.error("Error creating event:", error);

        if (error.code === "token_not_valid") {
          setError("The token is not valid. Please re-authenticate.");
        } else {
          setError(error.message || "An error occurred while submitting the event.");
        }
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="voting-form-container">
      <form onSubmit={handleSubmit}>
        {/* Voting Event Details Section */}
        <div className="event-details-container">
          <h2 className="form-title">Fill Voting Event Details</h2>
          <div className="event-details-form">
            <div className="form-grid">
              <div>
                <label>Voting Event Name</label>
                <input
                  type="text"
                  placeholder="Enter Voting Event Name"
                  value={votingName}
                  onChange={handleEventNameChange}
                />
              </div>
              <div>
                <label>Voting Round</label>
                <select
                  value={votingRound}
                  onChange={handleVotingRoundChange}
                  className="voting-round-dropdown"
                >
                  <option value="">Select Voting Round</option>
                  <option value="None">None</option>
                  <option value="Auditions">Auditions</option>
                  <option value="Top 20">Top 20</option>
                  <option value="Top 10">Top 10</option>
                  <option value="Top 6">Top 6</option>
                  <option value="Finals">Finals</option>
                </select>
              </div>

              <div>
                <label>Upload Event Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "misc_kv")}
                />
                {formData.misc_kv && (
                  <img
                    src={formData.misc_kv}
                    alt="Event Logo"
                    style={{ width: "100px", height: "100px", marginTop: "10px" }}
                  />
                )}
              </div>

              <div>
                <label>Upload Event Photos/Banners</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "img")}
                />
                {formData.img && (
                  <img
                    src={formData.img}
                    alt="Event Banner"
                    style={{ width: "100px", height: "100px", marginTop: "10px" }}
                  />
                )}
              </div>

              <div>
                <label>Organiser</label>
                <input
                  type="text"
                  placeholder="Enter Organiser Name"
                  value={org}
                  onChange={handleOrganiserChange}
                />
              </div>
              <div>
                <label>Event Description</label>
                <textarea
                  placeholder="Write event description here"
                  value={desc}
                  onChange={handleEventDescriptionChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Set Voting Rules Section */}
        <h2 className="section-title" style={{ fontSize: "14px" }}>
          Set Voting Rules
        </h2>
        <div className="voting-setup">
          <div className="voting-form-grid">
            <div className="voting-form-field">
              <label>Voting Mode</label>
              <select
                className="voting"
                value={votingMode}
                onChange={handleVotingModeChange}
              >
                <option value="">Select Voting Mode</option>
                <option value="Paid Vote">Paid Vote</option>
              </select>
            </div>

            <div className="voting-form-field">
              <label>Voting Start Date and Time</label>
              <input
                className="voting"
                type="datetime-local"
                value={createdAt}
                onChange={handleVotingStartDateChange}
              />
            </div>

            <div className="voting-form-field">
              <label>Voting End Date and Time</label>
              <input
                className="voting"
                type="datetime-local"
                value={finaldate}
                onChange={handleVotingEndDateChange}
              />
            </div>
          </div>
        </div>

        {/* Voting Options */}
        <h2 className="section-title" style={{ fontSize: "14px" }}>
          Voting Options
        </h2>
        <div className="voting-options">
          <div className="voting-form-grid">
            <div className="voting-form-field">
              <label>Vote Pricing</label>
              <select
                className="voting"
                value={payment_info}
                onChange={(e) => setPaymentInfo(e.target.value)}
              >
                <option value="">Select Vote Price</option>
                <option value="10">Rs. 10</option>
              </select>
            </div>

            <div className="voting-form-field">
              <label>Voting Access Preference</label>
              <select
                className="voting"
                value={votingAccessPreference}
                onChange={handleVotingAccessPreferenceChange}
              >
                <option value="">Select Access Preference</option>
                <option value="Public">Public</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="confirm-btn"
          type="submit"
          style={{ background: "#028248" }}
        >
          Create Event
        </button>
      </form>

      {error && (
        <p className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </p>
      )}

      {successMessage && (
        <p className="success-message">
          <span className="success-icon">🎉</span>
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default VotingForm;