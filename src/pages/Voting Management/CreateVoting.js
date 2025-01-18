import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import VotingForm from "../../components/VotingForm/VotingForm";
import UploadCandidateDetails from "../../components/VotingForm/UploadCandidateDetails";
// import { useToken } from "../../context/TokenContext";

const CreateVoting = () => {
  const [formData, setFormData] = useState({
    title: "",
    votingRound: "",
    desc: "",
    img: "",
    org: "",
    services: ""
  });


  return (
    <DashboardLayout>
      <div className="dashboard">
        <VotingForm  formData={formData} setFormData={setFormData}/>
        <UploadCandidateDetails />
      </div>

      <style jsx>{`
        .dashboard {
          padding: 20px;
          font-family: "Poppins", sans-serif;
          // background-color: #f9f9f9;
        }

        .confirm-btn {
          display: block;
          margin: 20px 0px;
          align-items: right;
          padding: 10px 35px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }

        .confirm-btn:hover {
          background-color: #0056b3;
        }

        .confirm-btn:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default CreateVoting;
