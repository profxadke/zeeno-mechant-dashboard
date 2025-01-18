import React, { useState, useEffect } from "react";
import "../../assets/modal.css";

const CandidateModel = ({
  visible,
  onClose,
  title,
  candidate,
  isEditMode,
  onUpdate,
}) => {
  const [formData, setFormData] = useState(candidate || {});

  useEffect(() => {
    setFormData(candidate || {});
  }, [candidate]);

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
                    <th>Votes</th>
                    <th>Payment Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {candidate.voters && candidate.voters.length > 0 ? (
                    candidate.voters.map((voter, index) => (
                      <tr key={index}>
                        <td>{voter.name}</td>
                        <td>{voter.votes}</td>
                        <td>{voter.paymentMode}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
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
