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

        html,
            body {
                width: 100%;
                margin: 0;
                padding: 0;
                overflow: scroll;
            }
            body::-webkit-scrollbar {
            display: none;
            }

        /* Hide scrollbar for IE, Edge and Firefox */
        body {
            -ms-overflow-style: none; 
            scrollbar-width: none; 
        }
      `}</style>
    </DashboardLayout>
  );
};

export default CreateVoting;
