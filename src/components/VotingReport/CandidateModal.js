import React from "react";
import "../../assets/modal.css";

const CandidateModel = ({ visible, onClose, title, candidate }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>{title}</h2>

        {/* Modal content */}
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
              <p><strong>ID:</strong> {candidate.id}</p>
              <p><strong>Name:</strong> {candidate.name}</p>
              <p><strong>Status:</strong> {candidate.status}</p>
              <p><strong>Total Votes:</strong> {candidate.votes}</p>
              <p><strong>Bio:</strong> {candidate.bio}</p>
            </div>
          </div>

          {/* Voters Table */}
          <h3>Voter Information</h3>
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
                  <td colSpan="3">No voters available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CandidateModel;
