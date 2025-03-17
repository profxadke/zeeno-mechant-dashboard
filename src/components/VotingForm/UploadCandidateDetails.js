import React, { useState, useEffect, useRef } from "react";
import { useToken } from "../../context/TokenContext";
import { MdArrowDropDown } from "react-icons/md";

const UploadCandidateDetails = ({ events }) => {
  const [showModal, setShowModal] = useState(false);
  const [isBulk, setIsBulk] = useState(false);
  const [candidates, setCandidates] = useState([
    { name: "", misc_kv: "", photo: "", description: "", event_id: "", shareable_link: "" },
  ]);
  const [candidateDetails, setCandidateDetails] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const { token } = useToken();
  const modalRef = useRef(null);
  const fileInputRefs = useRef([]); // Refs for file input fields

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

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
    setCandidates([
      ...candidates,
      { name: "", misc_kv: "", photo: "", description: "", event_id: selectedEvent, shareable_link: "" },
    ]);
  };

  const handleImageUpload = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set the desired width and height (e.g., 50% of the original size)
        const maxWidth = 800; // Maximum width for the resized image
        const maxHeight = 800; // Maximum height for the resized image
        let width = img.width;
        let height = img.height;

        // Calculate the new dimensions while maintaining the aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw the image on the canvas with the new dimensions
        ctx.drawImage(img, 0, 0, width, height);

        // Convert the canvas content to a base64 string
        const resizedImage = canvas.toDataURL("image/jpeg", 0.8); // Adjust quality (0.8 = 80%)

        // Update the candidate's photo with the resized image
        const updatedCandidateList = [...candidates];
        updatedCandidateList[index].photo = resizedImage;
        setCandidates(updatedCandidateList);
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedCandidateList = [...candidates];
    updatedCandidateList[index].photo = ""; // Clear the photo
    setCandidates(updatedCandidateList);

    // Clear the file input value
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].value = "";
    }
  };

  const handleSubmit = async () => {
    const candidatesData = candidates.map((candidate) => ({
      name: candidate.name,
      misc_kv: candidate.misc_kv,
      avatar: candidate.photo,
      bio: candidate.description,
      status: "O",
      shareable_link: candidate.shareable_link,
      event: selectedEvent,
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

      // Sort candidates before adding to candidateDetails
      const sortedCandidates = [...candidates].sort((a, b) => {
        if (a.misc_kv && b.misc_kv) {
          return a.misc_kv.localeCompare(b.misc_kv, undefined, { numeric: true });
        } else if (a.misc_kv) {
          return -1;
        } else if (b.misc_kv) {
          return 1;
        } else {
          return a.name.localeCompare(b.name);
        }
      });

      setCandidateDetails([...candidateDetails, ...sortedCandidates]);
      setCandidates([{ name: "", misc_kv: "", photo: "", description: "", event_id: selectedEvent, shareable_link: "" }]);
      closeModal();
    } catch (error) {
      console.error("Error submitting candidate details:", error);
    }
  };

  const addMorePhoto = () => {
    setCandidates([...candidates, { photo: "", event_id: "" }]);
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

      {/* Add Candidate or Add Bulk Candidate */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container" ref={modalRef}>
            <span className="close-icon" onClick={closeModal}>&times;</span>
            <h3>{isBulk ? "Add Bulk Candidate Details" : "Add Candidate Details"}</h3>
            <div className="candidate-forms-container">
              {/* Event dropdown */}
              <div className="event-dropdown">
                <label htmlFor="event">Select Event</label>
                <div className="dropdown-container">
                  <select
                    id="event"
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                  >
                    <option value="">Select Event</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.title}
                      </option>
                    ))}
                  </select>
                  <MdArrowDropDown className="dropdown-icon" />
                </div>
              </div>
              {candidates.map((candidate, index) => (
                <div key={index} className="candidate-form-section">
                  {/* <h5 className="candidate-form-header">Add Your Candidate </h5> */}
                  <div className="candidate-form">
                    {!isBulk ? (
                      <>
                        <label htmlFor="photo">Select Contestant Photo</label>
                        <input
                          id="photo"
                          type="file"
                          accept="image/*"
                          ref={(el) => (fileInputRefs.current[index] = el)}
                          onChange={(e) => handleImageUpload(index, e.target.files[0])}
                        />
                        {/* Image Preview */}
                        {candidate.photo && (
                          <div className="image-preview-container">
                            <img
                              src={candidate.photo}
                              alt="Preview"
                              className="image-preview"
                            />
                            <span
                              className="remove-image-icon"
                              onClick={() => handleRemoveImage(index)}
                            >
                              &times;
                            </span>
                          </div>
                        )}
                        <label htmlFor="name">Contestant Name</label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Enter Contestant Name"
                          value={candidate.name}
                          onChange={(e) => handleInputChange(index, "name", e.target.value)}
                        />
                        <label htmlFor="number">Contestant Number</label>
                        <input
                          id="number"
                          type="text"
                          placeholder="Enter Contestant Number"
                          value={candidate.misc_kv}
                          onChange={(e) => handleInputChange(index, "misc_kv", e.target.value)}
                        />
                        <label htmlFor="description">Contestant Bio</label>
                        <textarea
                          id="description"
                          placeholder="Enter Contestant Bio"
                          value={candidate.description}
                          onChange={(e) => handleInputChange(index, "description", e.target.value)}
                        />
                        {/* Reel Link Field */}
                        <label htmlFor="reel-link">Reel Link</label>
                        <input
                          id="reel-link"
                          type="text"
                          placeholder="Enter Reel Link"
                          value={candidate.shareable_link}
                          onChange={(e) => handleInputChange(index, "shareable_link", e.target.value)}
                        />
                      </>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button onClick={addMoreCandidate}>Add Another Candidate</button>
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
              {candidateDetails
                .sort((a, b) => {
                  if (a.misc_kv && b.misc_kv) {
                    return a.misc_kv.localeCompare(b.misc_kv, undefined, { numeric: true });
                  } else if (a.misc_kv) {
                    return -1;
                  } else if (b.misc_kv) {
                    return 1;
                  } else {
                    return a.name.localeCompare(b.name);
                  }
                })
                .map((candidate, index) => (
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
                      {/* Display Reel Link */}
                      {candidate.shareable_link && (
                        <p className="candidate-reel-link">
                          <a href={candidate.shareable_link} target="_blank" rel="noopener noreferrer">
                            View Reel
                          </a>
                        </p>
                      )}
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

        .candidate-form-section {
          margin-bottom: 20px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 20px;
        }

        .candidate-form-header {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
          color: #333;
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

        .candidate-reel-link a {
          color: #028248;
          text-decoration: none;
        }

        .candidate-reel-link a:hover {
          text-decoration: underline;
        }

        /* Responsive styles */
        @media screen and (max-width: 768px) {
          .upload-candidate-container {
            padding: 10px;
          }

          .section-title {
            font-size: 18px;
            text-align: center;
          }

          .upload-candidate-box {
            padding: 15px 10px;
            margin-bottom: 10px;
          }

          .candidate-forms-container {
            max-height: 250px;
          }

          .modal-actions {
            display: block;
            text-align: center;
          }

          .modal-actions button {
            width: 100%;
            margin: 5px 0;
          }
        }

        /* Event dropdown */
        .event-dropdown select:focus {
          border-color: #028248;
        }

        .event-dropdown {
          position: relative;
        }

        .event-dropdown select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          padding: 10px;
          font-size: 16px;
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 380px;
          padding-right: 30px;
          margin-bottom: 10px;
          outline: none;
        }

        .dropdown-container {
          position: relative;
          display: inline-block;
        }

        .dropdown-icon {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 18px;
          color: #333;
          pointer-events: none;
        }

        /* Image Preview */
        .image-preview-container {
          position: relative;
          margin-bottom: 10px;
        }

        .image-preview {
          width: 100%;
          max-height: 150px;
          object-fit: cover;
          border-radius: 5px;
        }

        .remove-image-icon {
          position: absolute;
          top: 5px;
          right: 5px;
          background-color: rgba(255, 0, 0, 0.8);
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
        }

        .remove-image-icon:hover {
          background-color: rgba(255, 0, 0, 1);
        }
      `}</style>
    </div>
  );
};

export default UploadCandidateDetails;