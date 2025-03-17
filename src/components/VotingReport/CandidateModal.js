import React, { useState, useEffect } from "react";
import "../../assets/modal.css";
import { useToken } from "../../context/TokenContext";
import * as XLSX from "xlsx";

const CandidateModel = ({ visible, onClose, title, candidate, isEditMode, onUpdate }) => {
  const [formData, setFormData] = useState(candidate || {});
  const [voterDetails, setVoterDetails] = useState([]);
  const { token } = useToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoadingVoters, setIsLoadingVoters] = useState(false);
  const [voterError, setVoterError] = useState(null);

  useEffect(() => {
    setFormData(candidate || {});
    if (candidate && candidate.id) {
      fetchVoterDetails(candidate.id);
    }
  }, [candidate]);

  // Define currency conversion rates
  const currencyValues = {
    USD: 10,
    AUD: 5,
    GBP: 10,
    CAD: 5,
    EUR: 10,
    AED: 2,
    QAR: 2,
    MYR: 2,
    KWD: 2,
    HKD: 30,
    CNY: 1,
    SAR: 2,
    OMR: 20,
    SGD: 8,
    NOK: 1,
    KRW: 200,
    JPY: 20,
    THB: 4,
    INR: 10,
    NPR: 10,
  };

  // Fetch voter details and calculate votes
  const fetchVoterDetails = async (miscKv) => {
    setIsLoadingVoters(true);
    setVoterError(null);

    try {
      const [paymentsResponse, eventsResponse] = await Promise.all([
        fetch(`https://auth.zeenopay.com/payments/intents/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`https://auth.zeenopay.com/events/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!paymentsResponse.ok || !eventsResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const [paymentIntents, events] = await Promise.all([
        paymentsResponse.json(),
        eventsResponse.json(),
      ]);

      const matchedIntents = paymentIntents.filter(
        (intent) => String(intent.intent_id) === String(miscKv) && intent.intent === "V"
      );

      const voterList = matchedIntents.map((intent) => {
        const event = events.find((event) => event.id === intent.event_id);
        let votes = 0;

        // Determine the currency based on the processor
        if (
          ["ESEWA", "KHALTI", "FONEPAY", "PRABHUPAY", "NQR", "QR"].includes(
            intent.processor
          )
        ) {
          // NPR currency
          votes = intent.amount / currencyValues.NPR;
        } else if (["PHONEPE", "PAYU"].includes(intent.processor)) {
          // INR currency
          votes = intent.amount / currencyValues.INR;
        } else if (intent.processor === "STRIPE") {
          // Use the currency specified in the intent
          const currency = intent.currency.toUpperCase();
          if (currencyValues[currency]) {
            votes = intent.amount / currencyValues[currency];
          }
        } else {
          // Default to payment_info if no specific logic
          votes = event ? Number(intent.amount) / event.payment_info : 0;
        }

        // Truncate decimal places using Math.floor
        votes = Math.floor(votes);

        return {
          name: intent.name,
          phone_no: intent.phone_no,
          processor: intent.processor || "N/A",
          votes: votes,
          transactionTime: intent.updated_at,
        };
      });

      setVoterDetails(voterList);
    } catch (error) {
      setVoterError(error.message);
    } finally {
      setIsLoadingVoters(false);
    }
  };

  // Calculate total votes
  const totalVotes = voterDetails.reduce((sum, voter) => sum + voter.votes, 0);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVoters = voterDetails.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to get processor color
  const getProcessorColor = (processor) => {
    switch (processor.toUpperCase()) {
      case "ESEWA":
        return "green";
      case "PRABHUPAY":
        return "red";
      case "KHALTI":
        return "purple";
      case "FONEPAY":
        return "red";
      case "NQR":
        return "skyblue";
      case "QR":
        return "skyblue";
      case "STRIPE":
        return "#5433ff";
      case "PHONEPE":
        return "#5F259F";
      case "PAYU":
        return "#FF5722";
      default:
        return "black";
    }
  };

  // Function to format transaction time
  const formatTransactionTime = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
    const day = date.getDate();
    const ordinalSuffix =
      day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";
    return formattedDate.replace(/\d+/, `${day}${ordinalSuffix}`);
  };

  // Function to export voting details to Excel
  const exportToExcel = () => {
    const dataForExport = voterDetails.map((voter) => ({
      "Full Name": voter.name,
      "Payment Method": voter.processor,
      Votes: voter.votes,
      "Phone No": voter.phone_no,
      "Transaction Time": formatTransactionTime(voter.transactionTime),
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataForExport);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Voting Details");
    XLSX.writeFile(workbook, "voting_details.xlsx");
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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleModalContainerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
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

            <div className="form-group">
              <label>Shareable Link:</label>
              <input
                type="text"
                name="shareable_link"
                value={formData.shareable_link || ""}
                onChange={handleInputChange}
                placeholder="Enter shareable link"
              />
            </div>

            <button type="submit" className="submit-btn">
              Save Changes
            </button>
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
                <p>
                  <strong>Name:</strong> {candidate.name}
                </p>
                <p>
                  <strong>Contestant No:</strong> {candidate.id}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`status-badge 
                      ${candidate.status === "O" ? "status-ongoing" :
                      candidate.status === "E" ? "status-eliminated" :
                      candidate.status === "H" ? "status-hidden" :
                      candidate.status === "C" ? "status-closed" : ""}`}
                  >
                    {candidate.status === "O"
                      ? "Ongoing"
                      : candidate.status === "E"
                      ? "Eliminated"
                      : candidate.status === "H"
                      ? "Hidden"
                      : candidate.status === "C"
                      ? "Closed"
                      : "Unknown"}
                  </span>
                </p>
                <p>
                  <strong>Total Votes:</strong> {totalVotes} Votes
                </p>
                <p>
                  <strong>Bio:</strong> {candidate.bio || "Not provided"}
                </p>
              </div>
            </div>

            {/* Voting Information Section */}
            <div className="voting-info-header">
              <h3 className="modal-section-title">Voting Information</h3>
              <button
                onClick={exportToExcel}
                className="export-btn"
                style={{
                  background: "#028248",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Export to Excel
              </button>
            </div>

            {isLoadingVoters ? (
              <p>Loading voter details...</p>
            ) : voterError ? (
              <p className="error-message">{voterError}</p>
            ) : (
              <div className="table-wrapper">
                <table className="voters-table">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Payment Method</th>
                      <th>Votes</th>
                      <th>Phone No</th>
                      <th>Transaction Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentVoters.length > 0 ? (
                      currentVoters.map((voter, index) => (
                        <tr key={index}>
                          <td>{voter.name}</td>
                          <td>
                            <span
                              style={{
                                fontWeight: "bold",
                                color: getProcessorColor(voter.processor),
                              }}
                            >
                              {voter.processor}
                            </span>
                          </td>
                          <td>{voter.votes}</td>
                          <td>{voter.phone_no}</td>
                          <td>{formatTransactionTime(voter.transactionTime)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>
                          No voters available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination Controls */}
            <div className="pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {Math.ceil(voterDetails.length / itemsPerPage)}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastItem >= voterDetails.length}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateModel;