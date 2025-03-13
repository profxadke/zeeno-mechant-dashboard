import React, { useState, useEffect } from "react";
import "../../assets/modal.css";
import { useToken } from "../../context/TokenContext";

const CandidateModel = ({ visible, onClose, title, candidate, isEditMode, onUpdate }) => {
  const [formData, setFormData] = useState(candidate || {});
  const [voterDetails, setVoterDetails] = useState([]);
  const { token } = useToken();

  useEffect(() => {
    setFormData(candidate || {});
    if (candidate && candidate.misc_kv) {
      fetchVoterDetails(candidate.misc_kv);
    }
  }, [candidate]);

  // Fetch voter details and calculate votes
  const fetchVoterDetails = async (miscKv) => {
    try {
      // Fetch payment intents data
      const paymentsResponse = await fetch(
        `https://auth.zeenopay.com/payments/intents/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!paymentsResponse.ok) {
        throw new Error("Failed to fetch payment intents data");
      }

      const paymentIntents = await paymentsResponse.json();

      // Fetch events data
      const eventsResponse = await fetch(
        `https://auth.zeenopay.com/events/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!eventsResponse.ok) {
        throw new Error("Failed to fetch events data");
      }

      const events = await eventsResponse.json();

      // Filter payment intents by misc_kv and intent type
      const matchedIntents = paymentIntents.filter(
        (intent) => String(intent.intent_id) === String(miscKv) && intent.intent === "V"
      );

      const voterList = matchedIntents.map((intent) => {

        const event = events.find((event) => event.id === intent.event_id);

        const votes = event ? Number(intent.amount) / event.payment_info : 0;

        return {
          name: intent.name,
          phone_no: intent.phone_no,
          email: intent.email,
          votes: votes,
        };
      });

      setVoterDetails(voterList);
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
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h2 className="modal-title">{title}</h2>

        {isEditMode ? (
          <form onSubmit={handleSubmit} className="edit-form">
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

            <div className="form-group">
              <label>Bio:</label>
              <textarea
                name="bio"
                value={formData.bio || ""}
                onChange={handleInputChange}
                placeholder="Enter bio"
              />
            </div>

            <button type="submit" className="modal-submit-btn">Save Changes</button>
          </form>
        ) : (
          <div className="modal-content">
            <div className="candidate-info">
              <div className="candidate-avatar">
                <img
                  src={candidate.avatar}
                  alt={`${candidate.name}'s avatar`}
                  className="candidate-photo"
                />
              </div>
              <div className="candidate-details">
                <p><strong>ID:</strong> {candidate.misc_kv}</p>
                <p><strong>Name:</strong> {candidate.name}</p>
                <p><strong>Status:</strong> {candidate.status}</p>
                <p><strong>Total Votes:</strong> {candidate.votes}</p>
                <p><strong>Bio:</strong> {candidate.bio || "Not provided"}</p>
              </div>
            </div>

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
                      <td colSpan="4" style={{ textAlign: "center" }}>No voters available.</td>
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