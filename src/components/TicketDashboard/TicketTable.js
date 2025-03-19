import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';

const TicketTable = () => {
  // Dummy data for the table
  const dummyData = [
    {
      orderId: 'ORD12345',
      date: '2023-10-01T12:00:00Z',
      customerName: 'John Doe',
      phoneNumber: '+1234567890',
      email: 'john.doe@example.com',
      location: 'New York, USA',
      soldTicket: 2,
      totalPrice: 200,
    },
    {
      orderId: 'ORD67890',
      date: '2023-10-02T14:00:00Z',
      customerName: 'Jane Smith',
      phoneNumber: '+9876543210',
      email: 'jane.smith@example.com',
      location: 'London, UK',
      soldTicket: 1,
      totalPrice: 100,
    },
    {
      orderId: 'ORD54321',
      date: '2023-10-03T16:00:00Z',
      customerName: 'Alice Johnson',
      phoneNumber: '+1122334455',
      email: 'alice.johnson@example.com',
      location: 'Sydney, Australia',
      soldTicket: 3,
      totalPrice: 300,
    },
  ];

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    return `${day} ${month} ${year}, ${formattedHours}:${minutes} ${period}`;
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = dummyData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(dummyData.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <div className="search-bar">
          <h3>Ticket Sales Data</h3>
        </div>
        <div className="actions">
          <button className="export-btn">
            <FaDownload className="export-icon" /> Export
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Phone Number</th>
              <th>Email Address</th>
              <th>Location</th>
              <th>Sold Ticket</th>
            
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={index}>
                <td>{row.orderId}</td>
                <td>{formatDate(row.date)}</td>
                <td>{row.customerName}</td>
                <td>{row.phoneNumber}</td>
                <td>{row.email}</td>
                <td>{row.location}</td>
                <td>{row.soldTicket}</td>
                
                <td>Rs.{row.totalPrice}</td>
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

      <style>{
        `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

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
        }`
      }</style>
    </div>
  );
};

export default TicketTable;