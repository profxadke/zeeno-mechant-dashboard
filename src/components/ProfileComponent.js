import React, { useState } from "react";

const ProfileComponent = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "About Company", icon: "🏢" },
    { label: "Contact Details", icon: "📞" },
    { label: "Company Details", icon: "📋" },
    { label: "Attached Documents", icon: "📎" },
  ];

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div style={{ textAlign: "left", padding: "10px" }}>
            <p><strong>Company Name:</strong> ABC Ticketing PVT LTD</p>
            <p><strong>Representative Name:</strong> Dummy Name</p>
            <p><strong>Registered Date:</strong> 01/01/2020</p>
            <p><strong>Company Description:</strong> </p>
          </div>
        );
      case 1:
        return (
          <div style={{ textAlign: "left", padding: "10px" }}>
            <p><strong>Phone Number:</strong> +977 - 9899388920</p>
            <p><strong>Landline Number:</strong> +977 - 9899388920</p>
            <p><strong>Email Address:</strong> </p>
            <p><strong>Company Address:</strong> </p>
          </div>
        );
      case 2:
        return (
          <div style={{ textAlign: "left", padding: "10px" }}>
            <p><strong>Company Registration Number:</strong> </p>
            <p><strong>Company Pan Number:</strong> </p>
          </div>
        );
      case 3:
        return (
          <div style={{ textAlign: "left", display: "flex", flexWrap: "wrap", justifyContent: "space-between", padding: "10px" }}>
            <div style={{ width: "100%", maxWidth: "48%", margin: "10px 0" }}>
              <p>
                <strong style={{ fontSize:"10px" }}>Company Registration Certificate:</strong>
                <br />
                <img
                  style={{ width: "100%", borderRadius: "8px", marginTop: "10px" }}
                  alt="Attached Document"
                  src="https://i.ibb.co/ynCwb8Z/Screenshot-2024-12-29-172638.png"
                />
              </p>
            </div>
            <div style={{ width: "100%", maxWidth: "48%", margin: "10px 0" }}>
              <p>
                <strong style={{ fontSize:"10px" }}> Company PAN/VAT Certificate</strong>
                <br />
                <img
                  style={{ width: "100%", borderRadius: "8px", marginTop: "10px" }}
                  alt="Attached Document"
                  src="https://i.ibb.co/ynCwb8Z/Screenshot-2024-12-29-172638.png"
                />
              </p>
            </div>
            <div style={{ width: "100%", maxWidth: "48%", margin: "10px 0" }}>
              <p>
                <strong style={{ fontSize:"10px" }}>Citizenship of Authorized Person</strong>
                <br />
                <img
                  style={{ width: "100%", borderRadius: "8px", marginTop: "10px" }}
                  alt="Attached Document"
                  src="https://i.ibb.co/ynCwb8Z/Screenshot-2024-12-29-172638.png"
                />
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "'Poppins', sans-serif" }}>
      {/* Add Poppins font from Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <img
        style={{ width: "200px", marginBottom: "20px" }}
        alt="logo"
        src="https://i.ibb.co/HdffZky/zeenopay-logo-removebg-preview.png"
      />
      <h2 style={{ fontSize: "1.5rem", marginBottom: "10px", fontWeight: "600" }}>ABC Ticketing PVT LTD.</h2>
      <p style={{ fontSize: "1rem", color: "#666", marginBottom: "20px" }}>KYC Verified</p>

      {/* Buttons Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          backgroundColor: "#f9f9f9",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "90%",
          maxWidth: "800px",
          margin: "20px auto",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {steps.map((step, index) => (
          <button
            className="butt"
            key={index}
            onClick={() => handleStepClick(index)}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: activeStep === index ? "#028248" : "#ffffff",
              color: activeStep === index ? "#fff" : "#000",
              cursor: "pointer",
              fontWeight: activeStep === index ? "600" : "normal",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: activeStep === index ? "0 2px 6px rgba(0, 140, 252, 0.4)" : "none",
              transition: "all 0.3s ease",
              fontSize: "14px",
              flex: "1 1 45%",
              minWidth: "120px",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <span style={{ fontSize: "1.4rem" }}>{step.icon}</span>
            {step.label}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#f3f3f3",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          overflowX: "auto",
          width: "90%",
          maxWidth: "800px",
          margin: "20px auto",
        }}
      >
        <h3 style={{ fontSize: "1.2rem", marginBottom: "15px", fontWeight: "600" }}>{steps[activeStep].label}</h3>
        {renderStepContent()}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .profile-buttons {
            flex-direction: column;
          }

          .butt {
            flex: 1 1 100%;
            margin: 5px 0;
          }

          .step-content {
            padding: 10px;
          }

          img {
            width: 80%;
          }

          h2 {
            font-size: 1.3rem;
          }

          h3 {
            font-size: 1.1rem;
          }

          p {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          button {
            font-size: 12px;
            padding: 8px 15px;
          }

          .step-content img {
            width: 100%;
            max-width: 100%;
          }

          h2 {
            font-size: 1.2rem;
          }

          h3 {
            font-size: 1rem;
          }

          p {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileComponent;