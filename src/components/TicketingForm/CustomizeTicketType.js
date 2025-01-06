import React from 'react';

const CustomizeTicketType = () => {
  const ticketTypes = ['Add Ticket Type', 'Add Ticket Type', 'Add Ticket Type', 'Add Ticket Type'];

  return (
    <div className="customize-wrapper">

      <h2 className="customize-header">Customize Ticket Type</h2>
      
      <div className="customize-container">
        <div className="ticket-type-container">
          {ticketTypes.map((type, index) => (
            <div key={index} className="ticket-type-card">
              <span className="ticket-text">{type}</span>
              <button className="add-button">+</button>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`

        .customize-wrapper {
          padding: 0px;
        }

        .customize-header {
          margin-bottom: 15px;
          font-size: 16px;
          font-weight: bold;
        }

        .customize-container {
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 15px;
        }

        .ticket-type-container {
          display: flex;
          gap: 16px;
          justify-content: space-between;
          margin-bottom: 15px;
        }

        .ticket-type-card {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border: 1px dashed #ccc;
          border-radius: 8px;
          background-color: #fff;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .ticket-type-card:hover {
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .ticket-text {
          font-size: 14px;
          font-weight: bold;
          color: #666;
        }

        .add-button {
          background-color: transparent;
          border: none;
          font-size: 20px;
          font-weight: bold;
          color: #666;
          cursor: pointer;
          outline: none;
          transition: color 0.2s ease;
        }

        .add-button:hover {
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default CustomizeTicketType;
