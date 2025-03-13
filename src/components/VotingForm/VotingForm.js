import React, { useState, useEffect } from "react";
import "../../assets/eventdetails.css";
import { useToken } from "../../context/TokenContext";

const VotingForm = ({ formData = {}, setFormData, data }) => {
  const {
    title = "",
    votingRound = "",
    desc = "",
    img = "",
    org = "",
  } = formData;
  const [votingMode, setVotingMode] = useState("");
  // const [votingCapsPerUser, setVotingCapsPerUser] = useState("");
  const [createdAt, setVotingStartDate] = useState(data?.createdAt || "");
  const [finaldate, setVotingEndDate] = useState(data?.finaldate || "");
  const [error, setError] = useState("");
  const [payment_info, setPaymentInfo] = useState("");
  const [votingAccessPreference, setVotingAccessPreference] = useState("");
  const [services, setServices] = useState("");
  const [votingName, setVotingName] = useState(title);
  const [successMessage, setSuccessMessage] = useState("");
  const { token } = useToken();

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

  const handleImageChange = (e) => {
    setFormData({ ...formData, img: e.target.value });
  };

  const handleVotingModeChange = (e) => {
    setVotingMode(e.target.value);
  };

  // const handleVotingCapsPerUserChange = (e) => {
  //   setVotingCapsPerUser(e.target.value);
  // };

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

  const handleVotePricingChange = (e) => {
    setPaymentInfo(e.target.value);
  };

  const handleVotingAccessPreferenceChange = (e) => {
    setVotingAccessPreference(e.target.value);
  };

  const handleServicesChange = (e) => {
    setServices(e.target.value);
  };

  useEffect(() => {
    if (data) {
      setVotingStartDate(data.createdAt || "");
      setVotingEndDate(data.finaldate || "");
    }
  }, [data]);

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
      services.length === 0
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
      votingMode,
      // votingCapsPerUser,
      createdAt,
      finaldate,
      payment_info,
      votingAccessPreference,
      services,
    };

    try {
      const response = await fetch("https://auth.zeenopay.com/events/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Event successfully created:", result);

        setSuccessMessage("Event successfully created!");

        setFormData({
          title: "",
          votingRound: "",
          desc: "",
          img: "",
          org: "",
        });
        setVotingMode("");
        // setVotingCapsPerUser("");
        setVotingStartDate("");
        setVotingEndDate("");
        setPaymentInfo("");
        setVotingAccessPreference("");
        setServices([]);
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
                <label>Event Description</label>
                <textarea
                  placeholder="Write event description here"
                  value={desc}
                  onChange={handleEventDescriptionChange}
                ></textarea>
              </div>
              <div>
                <label>Upload Event Photos/Banners</label>
                <input
                  type="text"
                  placeholder="Enter image Link"
                  value={img}
                  onChange={handleImageChange}
                />
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
            </div>
          </div>
        </div>

        {/* Set Voting Rules Section */}
        <h2 className="section-title" style={{ fontSize: '14px' }}>Set Voting Rules</h2>
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

            {/* <div className="voting-form-field">
              <label>Voting Caps Per User</label>
              <input
                className="voting"
                type="number"
                placeholder="Enter Voting Caps Per User"
                value={votingCapsPerUser}
                onChange={handleVotingCapsPerUserChange}
              />
            </div> */}

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
        <h2 className="section-title" style={{ fontSize: '14px' }}>Voting Options</h2>
        <div className="voting-options">
          <div className="voting-form-grid">
            <div className="voting-form-field">
              <label>Vote Pricing</label>
              <input
                className="voting"
                type="text"
                value={payment_info}
                onChange={handleVotePricingChange}
                placeholder="Enter Voting Price"
              />
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

            <div className="voting-form-field">
              <label>Services</label>
              <input
                className="voting"
                type="text"
                value={services}
                onChange={handleServicesChange}
                placeholder="Enter services separated by commas"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button className="confirm-btn" type="submit" style={{ background: '#028248' }}>
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