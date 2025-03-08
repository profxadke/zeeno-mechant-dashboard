import React, { useState, useEffect } from "react";
import "../../assets/modal.css";
import { useToken } from '../../context/TokenContext';

const CandidateModel = ({
  visible,
  onClose,
  title,
  candidate,
  isEditMode,
  onUpdate,
}) => {
  const [formData, setFormData] = useState(candidate || {});
  const [voterDetails, setVoterDetails] = useState([]);
  const { token } = useToken();

  useEffect(() => {
    setFormData(candidate || {});
    if (candidate && candidate.id) {
      fetchVoterDetails(candidate.id);
    }
  }, [candidate]);

  const fetchIntents = async (url) => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error(`Error fetching intents from ${url}:`, error);
      return [];
    }
  };

  const fetchVoterDetails = async (contestantId) => {
    const endpoints = [
      "https://auth.zeenopay.com/payments/fonepay/intents/",
      "https://auth.zeenopay.com/payments/esewa/intents/",
      "https://auth.zeenopay.com/payments/khalti/intents/",
      "https://auth.zeenopay.com/payments/payu/intents/",
      "https://auth.zeenopay.com/payments/phonepe/intents/",
      "https://auth.zeenopay.com/payments/prabhupay/intents/",
      "https://auth.zeenopay.com/payments/stripe/intents/",
    ];

    try {
      const allIntents = await Promise.all(endpoints.map(fetchIntents));
      const flattenedIntents = allIntents.flat();

      const matchedIntents = flattenedIntents.filter(
        (intent) => intent.intent_id === contestantId && intent.intent === "V"
      );

      const voterDetails = matchedIntents.map((intent) => ({
        name: intent.name,
        phone_no: intent.phone_no,
        email: intent.email,
        votes: intent.amount / 10,
      }));

      setVoterDetails(voterDetails);
    } catch (error) {
      console.error("Error fetching voter details:", error);
    }
  };

  if (!visible) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="modal-title">{title}</h2>

        {/* Conditional Content */}
        {isEditMode ? (
          <form onSubmit={handleSubmit} className="edit-form">
            {/* Candidate Avatar */}
            <div className="form-group">
              <label>Avatar URL:</label>
              <input
                type="text"
                name="avatar"
                value={formData.avatar || ""}
                onChange={handleInputChange}
                placeholder="Enter avatar URL"
                required
              />
            </div>

            {/* Name */}
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                placeholder="Enter name"
                required
              />
            </div>

            {/* Status */}
            <div className="form-group">
              <label>Status:</label>
              <input
                type="text"
                name="status"
                value={formData.status || ""}
                onChange={handleInputChange}
                placeholder="Enter status"
                required
              />
            </div>

            {/* Bio */}
            <div className="form-group">
              <label>Bio:</label>
              <textarea
                name="bio"
                value={formData.bio || ""}
                onChange={handleInputChange}
                placeholder="Enter bio"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="modal-submit-btn">
              Save Changes
            </button>
          </form>
        ) : (
          <div className="modal-content">
            {/* Candidate Information */}
            <div className="candidate-info">
              <div className="candidate-avatar">
                <img
                  src={candidate.avatar}
                  alt={`${candidate.name}'s avatar`}
                  className="candidate-photo"
                />
              </div>

              <div className="candidate-details">
                <p>
                  <strong>ID:</strong> {candidate.misc_kv}
                </p>
                <p>
                  <strong>Name:</strong> {candidate.name}
                </p>
                <p>
                  <strong>Status:</strong> {candidate.status}
                </p>
                <p>
                  <strong>Total Votes:</strong> {candidate.votes}
                </p>
                <p>
                  <strong>Bio:</strong> {candidate.bio || "Not provided"}
                </p>
              </div>
            </div>

            {/* Voter Information Table */}
            <h3 className="modal-section-title">Voter Information</h3>
            <div className="table-wrapper">
              <table className="voters-table">
                <thead>
                  <tr>
                    <th>Voter Name</th>
                    <th>Phone No</th>
                    <th>Email</th> 
                    <th>Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {voterDetails.length > 0 ? (
                    voterDetails.map((voter, index) => (
                      <tr key={index}>
                        <td>{voter.name}</td>
                        <td>{voter.phone_no}</td>
                        <td>{voter.email}</td>
                        <td>{voter.votes}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        No voters available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateModel;