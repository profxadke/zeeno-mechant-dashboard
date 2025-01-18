import React, { useState } from "react";
import { useToken } from "../../context/TokenContext";


const UploadCandidateDetails = () => {

  const [showModal, setShowModal] = useState(false);
  const [isBulk, setIsBulk] = useState(false);
  const [candidates, setCandidates] = useState([{ name: "", misc_kv: "", photo: "", description: "", event_id: "" }]);
  const [candidateDetails, setCandidateDetails] = useState([]);
  const { token } = useToken();


  const openModal = (bulk = false) => {
    setIsBulk(bulk);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleInputChange = (index, field, value) => {
    const newCandidates = [...candidates];
    newCandidates[index][field] = value;
    setCandidates(newCandidates);
  };

  const addMoreCandidate = () => {
    setCandidates([...candidates, { name: "", misc_kv: "", photo: "", description: "", event_id: "" }]);
  };

  const addMorePhoto = () => {
    setCandidates([...candidates, { photo: "", event_id: "" }]);
  };

  const handleSubmit = async () => {
    const candidatesData = candidates.map((candidate) => ({
      name: candidate.name,
      misc_kv: candidate.misc_kv,  // Adding misc_kv for Contestant Number
      avatar: candidate.photo,
      bio: candidate.description,
      status: "O",
      shareable_link: "",
      event: candidate.event_id,
    }));

    try {
      // Making API request
      for (const candidate of candidatesData) {
        await fetch("https://auth.zeenopay.com/events/contestants/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(candidate),
        });
      }

      setCandidateDetails([...candidateDetails, ...candidates]);
      setCandidates([{ name: "", misc_kv: "", photo: "", description: "", event_id: "" }]);
      closeModal();
    } catch (error) {
      console.error("Error submitting candidate details:", error);
    }
  };


  return (
    <div className="upload-candidate-container">
      {/* Header */}
      <h2 className="section-title">Upload Candidate Details</h2>

      {/* Box for Candidate Details */}
      <div className="upload-candidate-box">
        <p className="no-candidate-text">No Any Candidate added in the list</p>
        <div className="button-container">
          <button className="add-candidate-button" onClick={() => openModal(false)}>
            Add Candidates
          </button>
          <button className="add-bulk-candidate-button" onClick={() => openModal(true)}>
            Add Bulk Candidates
          </button>
        </div>
      </div>

      {/*Add Candidate or Add Bulk Candidate */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <span className="close-icon" onClick={closeModal}>&times;</span>
            <h3>{isBulk ? "Add Bulk Candidate Details" : "Add Candidate Details"}</h3>
            <div className="candidate-forms-container">
              {candidates.map((candidate, index) => (
                <div key={index} className="candidate-form">
                  {!isBulk ? (
                    <>
                      <input
                        type="text"
                        placeholder="Contestant Name"
                        value={candidate.name}
                        onChange={(e) => handleInputChange(index, "name", e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Contestant Number"
                        value={candidate.misc_kv}  // New input for Contestant Number
                        onChange={(e) => handleInputChange(index, "misc_kv", e.target.value)}
                      />
                      <textarea
                        placeholder="Contestant Description"
                        value={candidate.description}
                        onChange={(e) => handleInputChange(index, "description", e.target.value)}
                      />
                    </>
                  ) : null}
                  <input
                    type="text"
                    placeholder="Contestant Photo URL"
                    value={candidate.photo}
                    onChange={(e) => handleInputChange(index, "photo", e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Event ID"
                    value={candidate.event_id}
                    onChange={(e) => handleInputChange(index, "event_id", e.target.value)}
                  />
                </div>
              ))}
            </div>
            <div className="modal-actions">
              {!isBulk && (
                <button onClick={addMoreCandidate}>Add Another Candidate</button>
              )}
              {isBulk && (
                <button onClick={addMorePhoto}>Add Another Photo</button>
              )}
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Display Candidate Details after Submission */}
      <div className="candidate-details">
        {candidateDetails.length > 0 && (
          <div>
            <h3>Candidate Details</h3>
            <div className="candidate-list">
              {candidateDetails.map((candidate, index) => (
                <div key={index} className="candidate-card">
                  <div className="candidate-photo-container">
                    <img
                      src={candidate.photo}
                      alt={candidate.name}
                      className="candidate-photo"
                    />
                  </div>
                  <div className="candidate-info">
                    <p className="candidate-name">{candidate.name}</p>
                    <p className="candidate-number">{candidate.misc_kv}</p> 
                    <p className="candidate-description">{candidate.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Embedded CSS */}
      <style>{`
        .upload-candidate-container {
          display: flex;
          flex-direction: column;
        }

        .section-title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 15px;
          color: #333;
        }

        .upload-candidate-box {
          width: 100%;
          padding-top: 20px;
          padding-bottom: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          margin-bottom: 15px;
        }

        .no-candidate-text {
          font-size: 16px;
          color: #666;
          margin-bottom: 20px;
        }

        .button-container {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .add-candidate-button, .add-bulk-candidate-button {
          padding: 10px 20px;
          background-color: #028248;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
        }

        .add-candidate-button:hover, .add-bulk-candidate-button:hover {
          background-color: #0056b3;
        }

        /* Modal styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-container {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          max-width: 100%;
          max-height: 80%;
          overflow-y: auto;
          position: relative;
        }

        .candidate-forms-container {
          max-height: 300px;
          overflow-y: auto;
          margin-bottom: 20px;
        }

        .candidate-form input, .candidate-form textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .modal-actions {
          display: flex;
          justify-content: space-between;
        }

        .modal-actions button {
          padding: 10px 15px;
          background-color: #028248;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .modal-actions button:hover {
          background-color: #0056b3;
        }

        .close-icon {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 30px;
          color: #333;
          cursor: pointer;
        }

        .close-icon:hover {
          color: #f00;
        }

        /* Candidate details display */
        .candidate-details {
          margin-top: 20px;
        }

        .candidate-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        .candidate-card {
          background-color: #fff;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          width: 200px;
          text-align: center;
        }

        .candidate-photo-container {
          margin-bottom: 10px;
        }

        .candidate-photo {
          width: 100%;
          height: 120px;
          object-fit: cover;
          border-radius: 5px;
        }

        .candidate-info {
          color: #333;
        }

        .candidate-name {
          font-weight: bold;
          font-size: 16px;
        }

        .candidate-number {
          font-size: 14px;
          color: #888;
        }

        .candidate-description {
          font-size: 14px;
          color: #666;
        }

@media screen and (max-width: 768px) {
  .upload-candidate-container {
    // padding: 10px;
  }

  .section-title {
    font-size: 18px;
    text-align: center;
  }

  .upload-candidate-box {
    // padding: 15px 10px;
    margin-bottom: 10px;
  }

  .candidate-forms-container {
    // max-height: 250px;
  }

  .candidate-card {
    width: 150px;
  }
}
      `}</style>
    </div>
  );
};

export default UploadCandidateDetails;
