import React, { useState, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import { useToken } from "../../context/TokenContext";

const RealtimeVoting = () => {
  const { token } = useToken();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    const ordinalSuffix = (d) => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return `${day}${ordinalSuffix(day)} ${month} ${year}, ${formattedHours}:${minutes} ${period}`;
  };

  const statusLabel = {
    P: { label: 'Pending', color: '#FFA500' },
    S: { label: 'Success', color: '#28A745' },
    F: { label: 'Failed', color: '#DC3545' },
    C: { label: 'Cancelled', color: '#6C757D' },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch(`https://auth.zeenopay.com/payments/intents/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const results = await Promise.all(responses.map((response) => response.json()));

        const combinedData = results.flat().map((item) => ({
          name: item.name,
          email: item.email || 'N/A',
          phone: item.phone_no || 'N/A',
          createdAt: formatDate(item.created_at),
          amount: item.amount,
          status: statusLabel[item.status] || { label: item.status, color: '#6C757D' }, 
          paymentType: item.payment_type
            ? item.payment_type.charAt(0).toUpperCase() + item.payment_type.slice(1)
            : '',
          votes: Math.floor(item.amount / 10) || 0, 
        }));

        setData(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleExport = async () => {
    try {
      const response = await fetch(`https://auth.zeenopay.com/report/csv`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to export data');
      }
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'realtime_voting_report.csv';
      link.click();
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <div className="search-bar">
          <h3>Realtime Voting Data</h3>
        </div>
        <div className="actions">
          <button className="export-btn" onClick={handleExport}>
            <FaDownload className="export-icon" /> Export
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Votes</th> 
              <th>Amount</th>
              <th>Status</th>
              <th>Payment Type</th>
              <th>Transaction Time</th>
            </tr>
          </thead>
          <tbody>
  {currentData
    .filter((row) => row.votes > 0) 
    .map((row, index) => (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.email}</td>
        <td>{row.phone}</td>
        <td>{row.votes}</td>
        <td>{row.amount}</td>
        <td>
          <span
            className="status"
            style={{ backgroundColor: row.status.color, color: '#fff' }}
          >
            {row.status.label}
          </span>
        </td>
        <td>{row.paymentType}</td>
        <td>{row.createdAt}</td>
      </tr>
    ))}
</tbody>

        </table>
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        .table-container {
          font-family: 'Poppins', sans-serif;
          padding: 20px;
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .actions {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .export-btn {
          padding: 8px 20px;
          border: none;
          background-color: #028248;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Poppins', sans-serif;
        }

        .export-icon {
          font-size: 16px;
          font-weight: normal;
        }

        .table-wrapper {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          border: 1px solid #ddd;
          min-width: 800px;
          font-family: 'Poppins', sans-serif;
        }

        th, td {
          padding: 12px;
          text-align: center;
          border-bottom: 1px solid #ddd;
        }

        th {
          background-color: #028248;
          font-weight: 600;
          color: #fff;
        }

        .pagination {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .pagination-btn {
          padding: 8px 12px;
          border: 1px solid #ddd;
          background: #f5f5f5;
          border-radius: 4px;
          cursor: pointer;
        }

        .pagination-btn.active {
          background: #028248;
          color: white;
        }

        .status {
          padding: 5px 10px;
          border-radius: 5px;
          font-weight: bold;
          font-size: 12px; /* Reduced font size for status */
        }

        @media screen and (max-width: 768px) {
          .table-container {
            padding: 10px;
          }

          table {
            font-size: 14px;
          }

          th, td {
            padding: 8px;
          }

          .table-wrapper {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  );
};

export default RealtimeVoting;
