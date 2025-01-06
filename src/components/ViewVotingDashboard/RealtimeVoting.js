import React, { useState, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useToken } from "../../context/TokenContext";

const RealtimeVoting = () => {
  const { event_id } = useParams();
  const { token } = useToken();
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    period: '',
  });

  // Function to format the date as per the required format
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.zeenopay.com/contestants/e/${event_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        const filteredData = result.map((item) => ({
          name: item.name,
          noOfVotes: item.votes,
          addedAt: formatDate(item.addedAt),
        }));

        filteredData.sort((a, b) => b.noOfVotes - a.noOfVotes);

        setData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [event_id, token]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleExport = async () => {
    try {
      const response = await fetch(`https://api.zeenopay.com/report/csv`, {
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

  return (
    <div className="table-container">
      {/* Header with Export and Filter */}
      <div className="table-header">
        <div className="search-bar">
          <h3>Realtime Voting Data</h3>
        </div>
        <div className="actions">
          <button className="export-btn" onClick={handleExport}>
            <FaDownload className="export-icon" /> Export
          </button>
          <div className="filter">
            <span className="filter-text">Filtration</span>
            <div className="filter-dropdowns">
              <select
                name="period"
                value={filters.period}
                onChange={handleFilterChange}
                className="filter-dropdown"
              >
                <option>17 Oct 2024 - 21 Nov 2024</option>
                <option>1 Jan 2024 - 31 Dec 2024</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Voter Given To</th>
              <th>No. of Votes</th>
              <th>Date and Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.noOfVotes}</td>
                <td>{row.addedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .table-container {
          font-family: 'Arial', sans-serif;
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
          background-color: #0062FF;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .export-icon {
          font-size: 16px;
          font-weight: normal;
        }

        .filter {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .filter-dropdown {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          border: 1px solid #ddd;
          min-width: 800px;
        }

        th, td {
          padding: 12px;
          text-align: center;
          border-bottom: 1px solid #ddd;
        }

        th {
          background-color: #0062FF;
          font-weight: 500;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default RealtimeVoting;
