import React from "react";
import html2pdf from "html2pdf.js";

const PopupModal = ({ data, onClose }) => {
  if (!data) return null;

  // Function to handle downloading the modal content as a PDF
  const handleDownloadPDF = () => {
    const element = document.getElementById("modal-content");
    const opt = {
      margin: 10,
      filename: `${data.name}_details.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Hide buttons and close icon before generating the PDF
    const buttons = document.querySelector(".modal-actions");
    const closeIcon = document.querySelector(".modal-close-btn");
    if (buttons) buttons.style.display = "none";
    if (closeIcon) closeIcon.style.display = "none";

    // Generate and download the PDF
    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        // Restore buttons and close icon after PDF generation
        if (buttons) buttons.style.display = "flex";
        if (closeIcon) closeIcon.style.display = "block";
      });
  };

  // Function to handle printing the modal content directly
  const handlePrintPDF = () => {
    const printContents = document.getElementById("modal-content").innerHTML;
    const originalContents = document.body.innerHTML;

    // Hide buttons and close icon before printing
    const buttons = document.querySelector(".modal-actions");
    const closeIcon = document.querySelector(".modal-close-btn");
    if (buttons) buttons.style.display = "none";
    if (closeIcon) closeIcon.style.display = "none";

    // Replace the body content with the modal content
    document.body.innerHTML = printContents;

    // Trigger the print dialog
    window.print();

    // Restore the original body content
    document.body.innerHTML = originalContents;

    // Restore buttons and close icon after printing
    if (buttons) buttons.style.display = "flex";
    if (closeIcon) closeIcon.style.display = "block";

    // Re-attach event listeners (if any)
    window.location.reload(); // Reload the page to restore functionality
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" id="modal-content">
        {/* Close button */}
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>

        {/* Profile picture at the top-right */}
        {data.imageUrl && (
          <div className="profile-image-container">
            <img
              src={data.imageUrl}
              alt={data.name}
              className="profile-image"
            />
          </div>
        )}

        {/* Modal header */}
        <h2>Detailed Information</h2>

        {/* Modal details */}
        <div className="modal-details">
          <p>
            <strong>Name:</strong> {data.name}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Phone:</strong> {data.phone}
          </p>
          <p>
            <strong>Age:</strong> {data.age}
          </p>
          <p>
            <strong>Location:</strong> {data.location}
          </p>
          <p>
            <strong>Parent Name:</strong> {data.parentName}
          </p>
          <p>
            <strong>Category:</strong> {data.category}
          </p>
          <p>
            <strong>Payment Status:</strong> {data.paymentStatus}
          </p>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
        </div>

        {/* Buttons for downloading and printing PDF */}
        <div className="modal-actions">
          <button onClick={handleDownloadPDF}>Download PDF</button>
          <button onClick={handlePrintPDF}>Print PDF</button>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          max-width: 90%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .modal-close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #333;
        }

        .profile-image-container {
          position: absolute;
          top: 10px;
          right: 10px;
          margin-top: 30px; /* Space below the close button */
        }

        .profile-image {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ddd;
        }

        .modal-details {
          margin-top: 20px;
        }

        .modal-details p {
          margin: 10px 0;
          font-size: 14px;
          color: #555;
        }

        .modal-details strong {
          color: #333;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-start; /* Align buttons to the left */
          gap: 10px; /* Space between buttons */
          margin-top: 20px;
        }

        .modal-actions button {
          padding: 10px 20px;
          background-color: #0062FF;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
        }

        .modal-actions button:hover {
          background-color: #0044CC;
        }

        @media print {
          .modal-actions,
          .modal-close-btn {
            display: none; /* Hide buttons and close icon when printing */
          }
        }
      `}</style>
    </div>
  );
};

export default PopupModal;