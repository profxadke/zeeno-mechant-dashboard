import React, { useState, useEffect } from "react";
import "../../assets/table.css";
import { useToken } from "../../context/TokenContext";
import { useParams } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx";
import CandidateModel from "./CandidateModal";

const CandidateTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    period: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null); // Add paymentInfo state
  const itemsPerPage = 10;

  const { token } = useToken();
  const { event_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!event_id) {
        setError("Event ID is missing. Please provide a valid event ID.");
        setLoading(false);
        return;
      }

      if (!token) {
        setError("Token not found. Please log in again.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch event data to get payment_info
        const eventResponse = await fetch(
          `https://auth.zeenopay.com/events/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!eventResponse.ok) {
          throw new Error("Failed to fetch event data.");
        }

        const eventData = await eventResponse.json();
        const event = eventData.find((event) => event.id === parseInt(event_id));

        if (!event) {
          throw new Error("Event not found.");
        }

        // Set payment_info
        setPaymentInfo(event.payment_info);

        // Fetch contestants data
        const contestantsResponse = await fetch(
          `https://auth.zeenopay.com/events/contestants/?event_id=${event_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!contestantsResponse.ok) {
          throw new Error("Failed to fetch contestants data.");
        }

        const contestants = await contestantsResponse.json();

        // Fetch payment intents data
        const paymentsResponse = await fetch(
          `https://auth.zeenopay.com/payments/intents/?event_id=${event_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!paymentsResponse.ok) {
          throw new Error("Failed to fetch payment intents data.");
        }

        const paymentIntents = await paymentsResponse.json();

        // Calculate votes for each contestant
        const candidatesWithVotes = contestants.map((contestant) => {
          let totalVotes = 0;

          // Find matching payment intents
          paymentIntents.forEach((intent) => {
            if (intent.intent_id.toString() === contestant.misc_kv) {
              // Calculate votes using payment_info
              totalVotes += parseFloat(intent.amount) / paymentInfo;
            }
          });

          return {
            ...contestant,
            votes: totalVotes, // Update votes
          };
        });

        setData(candidatesWithVotes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [event_id, token, paymentInfo]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedCandidate(null);
    setIsEditMode(false);
  };

  const handleView = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalVisible(true);
    setIsEditMode(false);
  };

  const handleEdit = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalVisible(true);
    setIsEditMode(true);
  };

  const handleUpdateCandidate = async (updatedCandidate) => {
    try {
      const response = await fetch(
        `https://auth.zeenopay.com/events/contestants/${updatedCandidate.id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(updatedCandidate),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update candidate. Please try again.");
      }

      const updatedData = data.map((candidate) =>
        candidate.id === updatedCandidate.id ? updatedCandidate : candidate
      );
      setData(updatedData);
      alert("Candidate updated successfully.");
      handleCloseModal();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this candidate?")) return;

    try {
      const response = await fetch(
        `https://auth.zeenopay.com/events/contestants/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete candidate. Please try again.");
      }

      setData(data.filter((candidate) => candidate.id !== id));
      alert("Candidate deleted successfully.");
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredData = Array.isArray(data)
    ? data.filter((candidate) => {
        const isPeriodMatch =
          filters.period === "" || candidate.period === filters.period;
        const isStatusMatch =
          filters.status === "" || candidate.status === filters.status;

        return isPeriodMatch && isStatusMatch;
      })
    : [];

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleExport = () => {
    const dataForExport = filteredData.map((candidate) => ({
      ID: candidate.misc_kv,
      Avatar: candidate.avatar,
      Name: candidate.name,
      Status: candidate.status,
      Votes: candidate.votes,
      Bio: candidate.bio,
    }));

    const ws = XLSX.utils.json_to_sheet(dataForExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Candidates");
    XLSX.writeFile(wb, "candidates_data.xlsx");
  };

  const statusMapping = {
    O: "Ongoing",
    E: "Eliminated",
    H: "Hidden",
    C: "Closed",
  };

  if (loading)
    return (
      <div className="loader">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="table-container">
      <div className="table-header">
        <div className="search-bar">
          <h3>Candidate List</h3>
        </div>
        <div className="actions">
          <button className="export-btn" onClick={handleExport} style={{
                        background: "#028248", 
                      }}>
            <FaDownload className="export-icon" /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>SN</th>
              <th>Contestant No.</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Status</th>
              <th>Votes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No candidates found.
                </td>
              </tr>
            ) : (
              paginatedData.map((candidate, index) => (
                <tr key={candidate.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{candidate.misc_kv}</td>
                  <td>
                    <img
                      src={candidate.avatar}
                      alt={`${candidate.name}'s avatar`}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%", 
                      }}
                    />
                  </td>
                  <td>{candidate.name}</td>
                  <td>
                    <span
                      className={`status-badge 
                        ${candidate.status === "O" ? "status-ongoing" :
                        candidate.status === "E" ? "status-eliminated" :
                        candidate.status === "H" ? "status-hidden" :
                        candidate.status === "C" ? "status-closed" : ""}`}
                    >
                      {statusMapping[candidate.status] || "Unknown"}
                    </span>
                  </td>
                  <td>{candidate.votes}</td>
                  <td>
                    <div className="action-icons">
                      <button
                        onClick={() => handleView(candidate)}
                        title="View"
                        className="icon-btn view-btn"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEdit(candidate)}
                        title="Edit"
                        className="icon-btn edit-btn"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(candidate.id)}
                        title="Delete"
                        className="icon-btn delete-btn"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`pagination-btn ${
              page === currentPage ? "active" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Modal */}
      <CandidateModel
        visible={isModalVisible}
        onClose={handleCloseModal}
        title={isEditMode ? "Edit Candidate" : "Candidate Details"}
        candidate={selectedCandidate}
        isEditMode={isEditMode}
        onUpdate={handleUpdateCandidate}
      />
    </div>
  );
};

export default CandidateTable;