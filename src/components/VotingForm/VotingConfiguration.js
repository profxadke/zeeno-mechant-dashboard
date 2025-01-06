import React, { useState } from "react";

const VotingConfiguration = () => {
  const [votePricing, setVotePricing] = useState("");
  // const [displayLiveCounts, setDisplayLiveCounts] = useState(""); 
  const [votingAccessPreference, setVotingAccessPreference] = useState("");

  const handleVotePricingChange = (e) => {
    setVotePricing(e.target.value);
  };

  // const handleLiveCountsChange = (e) => {
  //   setDisplayLiveCounts(e.target.value);
  // };

  const handleVotingAccessPreferenceChange = (e) => {
    setVotingAccessPreference(e.target.value);
  };

  return (
    <div>
      <h2 className="section-title">Voting Configuration</h2>
      <div className="voting-setup">
        <div className="form-grid">
          {/* Vote Pricing Field */}
          <div className="form-field">
            <label>Vote Pricing (Per Vote)</label>
            <input
              className="payment"
              type="number"
              placeholder="Enter Vote Pricing"
              value={votePricing}
              onChange={handleVotePricingChange}
            />
          </div>

          {/* Display Live Voting Counts Dropdown */}
          {/* <div className="form-field">
            <label>Display Live Voting Counts</label>
            <select
              className="payment"
              value={displayLiveCounts}
              onChange={handleLiveCountsChange}
            >
              <option value="">Select Yes or No</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div> */}

          {/* Voting Access Preference Dropdown */}
          <div className="form-field">
            <label>Anonymous voting</label>
            <select
              className="payment"
              value={votingAccessPreference}
              onChange={handleVotingAccessPreferenceChange}
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      </div>

      {/* Embedded CSS */}
      <style>{`
        .section-title {
          margin-bottom: 15px;
          font-size: 16px;
          font-weight: bold;
          text-align: left;
        }

        /* Voting Setup box styling */
        .voting-setup {
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Grid Layout */
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr; 
          gap: 15px;
        }

        .form-field {
          margin-bottom: 10px;
        }

        /* Input Styling */
        .payment {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
        }

        /* Optional: specific styling for select dropdown */
        .voting-setup select.payment {
          width: 100%;
        }

        /* Ensure form fields are responsive on smaller screens */
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default VotingConfiguration;

// Schema Field Name:
// votePricing
// displayLiveCounts
// anonymousVoting