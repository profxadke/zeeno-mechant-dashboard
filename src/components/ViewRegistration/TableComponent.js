import React, { useState } from 'react';
import { FaSearch, FaDownload, FaPhoneAlt, FaEye, FaCheck, FaTimes } from 'react-icons/fa';

const TableComponent = () => {
  const [filters, setFilters] = useState({
    period: '',
    paymentStatus: '',
    approvalStatus: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const data = [
    {
      name: "Rishabh Singh",
      email: "rishabh05@gmail.com",
      phone: "+971 - 90000000",
      paymentStatus: "Paid",
      status: "Pending",
    },
    {
      name: "Ravi Pal",
      email: "ravi.p@gmail.com",
      phone: "+971 - 99900000",
      paymentStatus: "Paid",
      status: "Pending",
    },
    {
      name: "Gopi Krish Zain",
      email: "gopi.krish@gmail.com",
      phone: "+971 - 99990000",
      paymentStatus: "Paid",
      status: "Pending",
    },
    {
      name: "Rubi Shree",
      email: "rubi.shree99@gmail.com",
      phone: "+971 - 99999000",
      paymentStatus: "Paid",
      status: "Pending",
    },
    {
      name: "Abhi Malik",
      email: "abhimalik1@gmail.com",
      phone: "+971 - 99999900",
      paymentStatus: "Paid",
      status: "Pending",
    },
    {
      name: "Neha Sinha",
      email: "neha.sinha@gmail.com",
      phone: "+971 - 98765432",
      paymentStatus: "Pending",
      status: "Approved",
    },
    {
      name: "Kunal Mehra",
      email: "kunal.m@gmail.com",
      phone: "+971 - 98761234",
      paymentStatus: "Paid",
      status: "Rejected",
    },
    {
      name: "Rohit Sharma",
      email: "rohit.sharma@gmail.com",
      phone: "+971 - 98767678",
      paymentStatus: "Pending",
      status: "Pending",
    },
    {
      name: "Pooja Gupta",
      email: "pooja.gupta@gmail.com",
      phone: "+971 - 98765555",
      paymentStatus: "Paid",
      status: "Approved",
    },
    {
      name: "Aryan Mishra",
      email: "aryan.mishra@gmail.com",
      phone: "+971 - 98769999",
      paymentStatus: "Pending",
      status: "Pending",
    },
  ];

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="table-container">
      {/* Header with Search, Export, and Filter */}
      <div className="table-header">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or email"
            onChange={handleSearchChange}
          />
        </div>
        <div className="actions">
          <button className="export-btn">
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
              <select
                name="paymentStatus"
                value={filters.paymentStatus}
                onChange={handleFilterChange}
                className="filter-dropdown"
              >
                <option value="">All Payments</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
              <select
                name="approvalStatus"
                value={filters.approvalStatus}
                onChange={handleFilterChange}
                className="filter-dropdown"
              >
                <option value="">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
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
              <th>
                <input type="checkbox" />
              </th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Payment Status</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td className={row.paymentStatus === 'Paid' ? 'paid' : 'pending'}>
                  {row.paymentStatus}
                </td>
                <td
                  className={
                    row.status === 'Approved'
                      ? 'approved'
                      : row.status === 'Rejected'
                      ? 'rejected'
                      : 'pending'
                  }
                >
                  {row.status}
                </td>
                <td>
                  <button className="action-btn">
                    <FaPhoneAlt />
                  </button>
                  <button className="action-btn">
                    <FaEye />
                  </button>
                  <button className="action-btn">
                    <FaCheck />
                  </button>
                  <button className="action-btn">
                    <FaTimes />
                  </button>
                </td>
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

        .search-bar {
          position: relative;
          width: 100%;
        }

        .search-bar input {
          padding: 8px 12px 8px 32px; 
          border: 1px solid #ddd;
          border-radius: 5px;
          width: 70%; 
        }

        .search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #888;
          font-size: 18px;
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

        .filter-text {
          margin-right: 8px;
        }

        .filter-dropdowns {
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

        td {
          background-color: white;
        }

        .paid {
          color: green;
        }

        .pending {
          color: orange;
        }

        .approved {
          color: green;
          font-weight: bold;
        }

        .rejected {
          color: red;
          font-weight: bold;
        }

        .action-btn {
          padding: 5px 10px;
          border: none;
          background-color: #f1f1f1;
          cursor: pointer;
          margin: 0 3px;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .action-btn:hover {
          background-color: #ddd;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .table-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .actions {
            flex-direction: column;
            gap: 10px;
          }

          .filter-dropdowns {
            flex-direction: column;
            gap: 10px;
            width: 100%;
          }

          .filter-dropdown {
            width: 100%;
            margin-bottom: 10px;
          }

          .filter span {
            display: block;
            margin-bottom: 8px;
          }

          .filter-text {
            display: none !important;
          }

          .export-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: auto;
            padding: 8px 20px;
            border-radius: 5px;
            z-index: 10;
          }

          .search-bar input {
            width: 100%;
            padding: 8px 12px;
            margin-bottom: 10px;
          }

          .search-icon {
         display: none;
        }
        }
      `}</style>
    </div>
  );
};

export default TableComponent;
