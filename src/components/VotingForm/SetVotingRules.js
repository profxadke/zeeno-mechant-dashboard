import React, { useState, useEffect } from "react";

const SetVotingRules = ({ data }) => {
  const [votingMode, setVotingMode] = useState("");
  const [votingCapsPerUser, setVotingCapsPerUser] = useState("");
  const [createdAt, setVotingStartDate] = useState(data?.createdAt || "");
  const [finaldate, setVotingEndDate] = useState(data?.finaldate || "");
  const [error, setError] = useState("");

  // Handling input changes
  const handleVotingModeChange = (e) => {
    setVotingMode(e.target.value);
  };

  const handleVotingCapsPerUserChange = (e) => {
    setVotingCapsPerUser(e.target.value);
  };

  const handleVotingStartDateChange = (e) => {
    const value = e.target.value;
    if (value && !isNaN(Date.parse(value))) {
      setVotingStartDate(value);
      setError(""); // Reset error if valid date
    } else {
      setError("Please select a valid start date and time.");
    }
  };

  const handleVotingEndDateChange = (e) => {
    const value = e.target.value;
    if (value && !isNaN(Date.parse(value))) {
      setVotingEndDate(value);

      // Check that the end date is after the start date
      if (new Date(value) <= new Date(createdAt)) {
        setError("End date and time must be after the start date and time.");
      } else {
        setError(""); // Reset error if valid date
      }
    } else {
      setError("Please select a valid end date and time.");
    }
  };

  useEffect(() => {
    // Ensure 'data' is defined before updating the state
    if (data) {
      setVotingStartDate(data.createdAt || "");
      setVotingEndDate(data.finaldate || "");
    }
  }, [data]);

  return (
    <div>
      <h2 className="section-title">Set Voting Rules</h2>
      <div className="voting-setup">
        <div className="voting-form-grid">
          {/* Voting Mode Dropdown */}
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

          {/* Voting Caps Field */}
          <div className="voting-form-field">
            <label>Voting Caps Per User</label>
            <input
              className="voting"
              type="number"
              placeholder="Enter Voting Caps Per User"
              value={votingCapsPerUser}
              onChange={handleVotingCapsPerUserChange}
            />
          </div>

          {/* Voting Start Date and Time */}
          <div className="voting-form-field">
            <label>Voting Start Date and Time</label>
            <input
              className="voting"
              type="datetime-local"
              value={createdAt}
              onChange={handleVotingStartDateChange}
            />
          </div>

          {/* Voting End Date and Time */}
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

        {/* Error message */}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <style>{`
        .section-title {
          margin-bottom: 15px;
          font-size: 16px;
          font-weight: bold;
          text-align: left;
        }

        .voting-setup {
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 25px;
        }

        .voting-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .voting-form-field {
          margin-bottom: 10px;
        }

        .voting {
          width: 100%;
          padding: 8px;
          font-size: 14px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
      `}</style>
    </div>
  );
};

export default SetVotingRules;
