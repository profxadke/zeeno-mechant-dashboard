import React, { useState, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import ReactCountryFlag from 'react-country-flag';
import { useToken } from "../../context/TokenContext";

const RealtimeVoting = ({ id: event_id }) => {
  const { token } = useToken();
  const [data, setData] = useState([]);
  const [eventData, setEventData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Currency mapping
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

  // Currency to country code mapping
  const currencyToCountry = {
    USD: 'US', // United States Dollar
    AUD: 'AU', // Australian Dollar
    GBP: 'GB', // British Pound
    CAD: 'CA', // Canadian Dollar
    EUR: 'EU', // Euro (European Union)
    AED: 'AE', // UAE Dirham
    QAR: 'QA', // Qatari Riyal
    MYR: 'MY', // Malaysian Ringgit
    KWD: 'KW', // Kuwaiti Dinar
    HKD: 'HK', // Hong Kong Dollar
    CNY: 'CN', // Chinese Yuan
    SAR: 'SA', // Saudi Riyal
    OMR: 'OM', // Omani Rial
    SGD: 'SG', // Singapore Dollar
    NOK: 'NO', // Norwegian Krone
    KRW: 'KR', // South Korean Won
    JPY: 'JP', // Japanese Yen
    THB: 'TH', // Thai Baht
    INR: 'IN', // Indian Rupee
    NPR: 'NP', // Nepalese Rupee
  };

  // Log the event_id for debugging
  console.log('Event ID:', event_id, 'Type:', typeof event_id);

  // Function to format date
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

  // Status labels and colors
  const statusLabel = {
    P: { label: 'Pending', color: '#FFA500' },
    S: { label: 'Success', color: '#28A745' },
    F: { label: 'Failed', color: '#DC3545' },
    C: { label: 'Cancelled', color: '#6C757D' },
  };

  // Fetch event data to get payment_info
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`https://auth.zeenopay.com/events/${event_id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }

        const result = await response.json();
        setEventData(result);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEventData();
  }, [token, event_id]);

  // Fetch payment intents data
  useEffect(() => {
    const fetchData = async () => {
      if (!eventData) return; 

      try {
        const response = await fetch(`https://auth.zeenopay.com/payments/intents/?event_id=${event_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        console.log('API Response:', result);

        // Filter and map the data
        const filteredData = result
          .filter((item) => item.event_id == event_id)
          .map((item) => {
            let currency = 'USD';
            const processor = item.processor?.toUpperCase();

            if (['ESEWA', 'KHALTI', 'FONEPAY', 'PRABHUPAY', 'NQR', 'QR'].includes(processor)) {
              currency = 'NPR';
            } else if (['PHONEPE', 'PAYU'].includes(processor)) {
              currency = 'INR';
            } else if (processor === 'STRIPE') {
              currency = item.currency?.toUpperCase() || 'USD';
            }

            const currencyValue = currencyValues[currency] || 1;

            let votes;
            if (['JPY', 'THB', 'INR', 'NPR'].includes(currency)) {
              votes = Math.floor(item.amount / currencyValue);
            } else {
              votes = Math.floor(item.amount * currencyValue);
            }

            // Determine payment type display value
            const paymentType = ['PAYU', 'PHONEPE', 'STRIPE'].includes(processor)
              ? 'International'
              : processor
                ? processor.charAt(0).toUpperCase() + processor.slice(1)
                : '';

            return {
              name: item.name,
              email: item.email || 'N/A',
              phone: item.phone_no || 'N/A',
              createdAt: item.created_at,
              formattedCreatedAt: formatDate(item.created_at),
              amount: item.amount,
              status: statusLabel[item.status] || { label: item.status, color: '#6C757D' },
              paymentType: paymentType,
              votes: votes,
              currency: currency,
            };
          });

        const sortedData = filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        console.log('Sorted Data:', sortedData);
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token, event_id, eventData]);

  // Handle CSV export
  const handleExport = async () => {
    try {
      const response = await fetch(`https://auth.zeenopay.com/report/csv?event_id=${event_id}`, {
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

  // Pagination logic
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
              <th>Status</th>
              <th>Payment Type</th>
              <th>Currency</th>
              <th>Transaction Time</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.phone}</td>
                  <td>{row.votes}</td>
                  <td>
                    <span
                      className="status"
                      style={{ backgroundColor: row.status.color, color: '#fff' }}
                    >
                      {row.status.label}
                    </span>
                  </td>
                  <td>{row.paymentType}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <ReactCountryFlag
                        countryCode={currencyToCountry[row.currency]}
                        svg
                        style={{ width: '20px', height: '15px' }}
                      />
                      <span>{row.currency}</span>
                    </div>
                  </td>
                  <td>{row.formattedCreatedAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>
                  No data available for this event.
                </td>
              </tr>
            )}
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

        .status {
          padding: 5px 10px;
          border-radius: 5px;
          font-weight: bold;
          font-size: 12px;
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

export default RealtimeVoting;