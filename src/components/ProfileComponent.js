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
          <div style={{ textAlign: "left" }}>
            <p><strong>Company Name:</strong> ABC Ticketing PVT LTD</p>
            <p><strong>Representative Name:</strong> Dummy Name</p>
            <p><strong>Registered Date:</strong> 01/01/2020</p>
            <p><strong>Company Description:</strong> </p>
          </div>
        );
      case 1:
        return (
          <div style={{ textAlign: "left" }}>
            <p><strong>Phone Number:</strong> +977 - 9899388920</p>
            <p><strong>Landline Number:</strong> +977 - 9899388920</p>
            <p><strong>Email Address:</strong> </p>
            <p><strong>Company Address:</strong> </p>
          </div>
        );
      case 2:
        return (
          <div style={{ textAlign: "left" }}>
            <p><strong>Company Registration Number:</strong> </p>
            <p><strong>Company Pan Number:</strong> </p>
          </div>
        );
      case 3:
        return (
          <div style={{ textAlign: "left", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
            <div style={{ width: "100%", maxWidth: "30%", margin: "10px 0" }}>
              <p>
                <strong>Company Registration Certificate:</strong>
                <br />
                <img
                  style={{ width: "100%", borderRadius: "8px", marginTop: "10px" }}
                  alt="Attached Document"
                  src="https://i.ibb.co/ynCwb8Z/Screenshot-2024-12-29-172638.png"
                />
              </p>
            </div>
            <div style={{ width: "100%", maxWidth: "30%", margin: "10px 0" }}>
              <p>
                <strong>Company PAN/VAT Certificate</strong>
                <br />
                <img
                  style={{ width: "100%", borderRadius: "8px", marginTop: "10px" }}
                  alt="Attached Document"
                  src="https://i.ibb.co/ynCwb8Z/Screenshot-2024-12-29-172638.png"
                />
              </p>
            </div>
            <div style={{ width: "100%", maxWidth: "30%", margin: "10px 0" }}>
              <p>
                <strong>Citizenship of Authorized Person</strong>
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
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <img
        style={{ width: "100px", marginBottom: "20px" }}
        alt="logo"
        src="https://i.ibb.co/kGJwMbM/Screenshot-2024-12-25-143534.png"
      />
      <h2>ABC Ticketing PVT LTD.</h2>
      <p>KYC Verified</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          backgroundColor: "#f9f9f9",
          padding: "15px 30px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "90%",
          margin: "20px auto",
          flexWrap: "wrap",
        }}
      >
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => handleStepClick(index)}
            style={{
              padding: "10px 30px",
              margin: "10px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: activeStep === index ? "#008cfc" : "#ffffff",
              color: activeStep === index ? "#fff" : "#000",
              cursor: "pointer",
              fontWeight: activeStep === index ? "bold" : "normal",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: activeStep === index ? "0 2px 6px rgba(0, 140, 252, 0.4)" : "none",
              transition: "all 0.3s ease",
              fontSize: "14px",
              flex: "1",
              minWidth: "120px",
            }}
          >
            <span style={{ fontSize: "1.4rem" }}>{step.icon}</span>
            {step.label}
          </button>
        ))}
      </div>
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#f3f3f3",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          overflowX: "auto",
        }}
      >
        <h3>{steps[activeStep].label}</h3>
        {renderStepContent()}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .profile-buttons {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .profile-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          img {
            width: 80%;
          }

          .step-content {
            padding: 10px;
          }

          button {
            font-size: 12px;
            padding: 8px 20px;
          }

          .step-content img {
            width: 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileComponent;
