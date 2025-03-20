import React, { useState } from "react";
import { useToken } from "../context/TokenContext";
import ImageUploader from "./ImageUploader";

const KycComponent = () => {
  const { token } = useToken();
  const [companyName, setCompanyName] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [optionalPhoneNumber, setOptionalPhoneNumber] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [panVatCertificateNumber, setPanVatCertificateNumber] = useState("");
  const [
    authorizedPersonCitizenshipNumber,
    setAuthorizedPersonCitizenshipNumber,
  ] = useState("");
  const [registrationCertificateUrl, setRegistrationCertificateUrl] =
    useState("");
  const [panVatCertificateUrl, setPanVatCertificateUrl] = useState("");
  const [authorizedPersonCitizenshipUrl, setAuthorizedPersonCitizenshipUrl] =
    useState("");
  const [taxClearanceUrl, setTaxClearanceUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      companyName,
      representativeName,
      email,
      phoneNumber,
      optionalPhoneNumber,
      companyAddress,
      registrationNumber,
      panVatCertificateNumber,
      authorizedPersonCitizenshipNumber,
      registrationCertificateUrl,
      panVatCertificateUrl,
      authorizedPersonCitizenshipUrl,
      taxClearanceUrl,
    };

    try {
      const response = await fetch("https://api.zeenopay.com/users/me/kyc", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("KYC form submitted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to submit KYC form: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting KYC form:", error);
      alert(
        "An error occurred while submitting the KYC form. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="section-title">KYC Verification Form</h2>
      <p style={{ color: "#555" }}>
        Verify your KYC to unlock full access to the dashboard, create various
        items, and perform detailed metrics.
      </p>
      <div className="kyc-setup">
        <div className="kyc-form-grid">
          <div className="kyc-form-field">
            <label>Company Name</label>
            <input
              className="kyc-input"
              type="text"
              placeholder="Enter Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="kyc-form-field">
            <label>Representative Name</label>
            <input
              className="kyc-input"
              type="text"
              placeholder="Enter Representative Name"
              value={representativeName}
              onChange={(e) => setRepresentativeName(e.target.value)}
            />
          </div>

          <div className="kyc-form-field">
            <label>Email</label>
            <input
              className="kyc-input"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="kyc-form-field">
            <label>Phone Number</label>
            <input
              className="kyc-input"
              type="tel"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="kyc-form-field">
            <label>Optional Phone Number</label>
            <input
              className="kyc-input"
              type="tel"
              placeholder="Enter Optional Phone Number"
              value={optionalPhoneNumber}
              onChange={(e) => setOptionalPhoneNumber(e.target.value)}
            />
          </div>

          <div className="kyc-form-field">
            <label>Company Address</label>
            <input
              className="kyc-input"
              type="text"
              placeholder="Enter Company Address"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
            />
          </div>

          <div className="kyc-form-field">
            <label>Company Registration Number</label>
            <input
              className="kyc-input"
              type="text"
              placeholder="Enter Company Registration Number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
            />
          </div>

          <div className="kyc-form-field">
            <label>Registration Certificate URL</label>
            <input
              className="kyc-input"
              type="text"
              placeholder="Enter Registration Certificate URL"
              value={registrationCertificateUrl}
              onChange={(e) => setRegistrationCertificateUrl(e.target.value)}
            />
          </div>

          <div className="kyc-form-field">
            <label>PAN/VAT Certificate Number</label>
            <input
              className="kyc-input"
              type="text"
              placeholder="Enter PAN/VAT Certificate Number"
              value={panVatCertificateNumber}
              onChange={(e) => setPanVatCertificateNumber(e.target.value)}
            />
          </div>

          <div className="kyc-form-field">
            <label>PAN/VAT Certificate URL</label>
            <input
              className="kyc-input"
              type="text"
              placeholder="Enter PAN/VAT Certificate URL"
              value={panVatCertificateUrl}
              onChange={(e) => setPanVatCertificateUrl(e.target.value)}
            />
          </div>

          <div className="kyc-form-field">
            <label>Authorized Person Citizenship Number</label>
            <input
              className="kyc-input"
              type="text"
              placeholder="Enter Citizenship Number"
              value={authorizedPersonCitizenshipNumber}
              onChange={(e) =>
                setAuthorizedPersonCitizenshipNumber(e.target.value)
              }
            />
          </div>

          <div className="kyc-form-field">
            <label>Authorized Person Citizenship URL</label>
            <input
              className="kyc-input"
              type="text"
              placeholder="Enter Citizenship URL"
              value={authorizedPersonCitizenshipUrl}
              onChange={(e) =>
                setAuthorizedPersonCitizenshipUrl(e.target.value)
              }
            />
          </div>

          <div className="kyc-form-field">
            <label>Tax Clearance URL (If any)</label>
            <input
              className="kyc-input"
              type="text"
              placeholder="Enter Tax Clearance URL"
              value={taxClearanceUrl}
              onChange={(e) => setTaxClearanceUrl(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button type="submit" className="kyc-submit-button">
        Submit
      </button>

      <ImageUploader/>

      <style>{`
        .section-title {
          margin-bottom: 15px;
          font-size: 16px;
          font-weight: bold;
          text-align: left;
          font-family: 'Poppins', sans-serif;
        }
        .kyc-setup {
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 25px;
          font-family: 'Poppins', sans-serif;
        }
        .kyc-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          font-family: 'Poppins', sans-serif;
        }
        .kyc-form-field {
          margin-bottom: 10px;
          font-family: 'Poppins', sans-serif;
        }
        .kyc-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
          font-family: 'Poppins', sans-serif;
        }
        .kyc-submit-button {
          background-color: #028248;
          color: white;
          padding: 10px 25px;
          border: none;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }
        .kyc-submit-button:hover {
          background-color:rgb(46, 153, 105);
        }
        @media (max-width: 768px) {
          .kyc-form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </form>
  );
};

export default KycComponent;