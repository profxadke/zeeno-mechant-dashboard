// CandidateTable.js
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
  const itemsPerPage = 10;

  const { token } = useToken();
  const { event_id } = useParams();

  useEffect(() => {
    const fetchCandidates = async () => {
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
        const response = await fetch(
          `https://api.zeenopay.com/contestants/e/${event_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized. Please log in again.");
          } else if (response.status === 404) {
            throw new Error("Event not found.");
          } else {
            throw new Error("Failed to fetch data. Please try again.");
          }
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [event_id, token]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedCandidate(null);
  };

  const handleView = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalVisible(true);
  };

  const filteredData = data.filter((candidate) => {
    const isPeriodMatch =
      filters.period === "" || candidate.period === filters.period;
    const isStatusMatch =
      filters.status === "" || candidate.status === filters.status;

    return isPeriodMatch && isStatusMatch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleExport = () => {
    const dataForExport = filteredData.map((candidate) => ({
      ID: candidate.id,
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
          <button className="export-btn" onClick={handleExport}>
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
              <th>ID</th>
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
                  <td>{candidate.id}</td>
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
                  <td>{candidate.status}</td>
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
                        onClick={() => console.log("Edit:", candidate)}
                        title="Edit"
                        className="icon-btn edit-btn"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => console.log("Delete:", candidate)}
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
  title="Candidate Details"
  candidate={selectedCandidate} // Passing the candidate to the modal
/>
    </div>
  );
};

export default CandidateTable;