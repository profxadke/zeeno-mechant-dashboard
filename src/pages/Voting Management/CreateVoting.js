import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import VotingForm from "../../components/VotingForm/VotingForm";
import UploadCandidateDetails from "../../components/VotingForm/UploadCandidateDetails";
import { useToken } from "../../context/TokenContext";

const CreateVoting = () => {
  const [formData, setFormData] = useState({
    title: "",
    votingRound: "",
    desc: "",
    img: "",
    org: "",
    services: "",
  });

  const [events, setEvents] = useState([]); 
  const { token } = useToken();

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://auth.zeenopay.com/events/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [token]);

  return (
    <DashboardLayout>
      <div className="dashboard">
        {/* Pass events and setEvents to VotingForm */}
        <VotingForm
          formData={formData}
          setFormData={setFormData}
          events={events}
          setEvents={setEvents}
        />
        {/* Pass events to UploadCandidateDetails */}
        <UploadCandidateDetails events={events} />
      </div>

      <style jsx>{`
        .dashboard {
          padding: 20px;
          font-family: "Poppins", sans-serif;
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