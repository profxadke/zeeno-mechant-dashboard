import React, { useState } from "react";
import "../../assets/registrationfields.css";
import { FaUser, FaEnvelope, FaPhone, FaAddressCard, FaCamera, FaVideo } from "react-icons/fa";

const RegistrationFields = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldIndex, setFieldIndex] = useState(null);
  const [fields, setFields] = useState(Array(8).fill(null));

  // Available field options
  const fieldOptions = [
    { name: "Name", icon: <FaUser /> },
    { name: "Email Address", icon: <FaEnvelope /> },
    { name: "Phone Number", icon: <FaPhone /> },
    { name: "Address", icon: <FaAddressCard /> },
    { name: "Photo", icon: <FaCamera /> },
    { name: "Video", icon: <FaVideo /> }
  ];

  // Open the modal when a field button is clicked
  const openModal = (index) => {
    setFieldIndex(index); 
    setIsModalOpen(true); 
  };

  // Close the modal without selecting
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Set selected field to the clicked button
  const selectField = (field) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex] = field.name;
    setFields(updatedFields);
    setIsModalOpen(false);
  };

  return (
    <>
      <h2>Add Registration Fields for Users</h2>
      <div className="registration-fields">
        <div className="field-grid">
          {fields.map((field, index) => (
            <button
              key={index}
              onClick={() => openModal(index)} 
              className="add-field-btn"
            >
              {field || "Add Field +"}
            </button>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Select Field</h3>
              <div className="field-cards">
                {fieldOptions.map((field, index) => (
                  <div 
                    key={index} 
                    className="field-card" 
                    onClick={() => selectField(field)} 
                  >
                    <div className="field-icon">{field.icon}</div>
                    <div className="field-name">{field.name}</div>
                  </div>
                ))}
              </div>
              <button onClick={closeModal} className="close-modal-btn">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RegistrationFields;
