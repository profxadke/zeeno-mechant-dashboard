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

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', setViewportHeight);
    setViewportHeight();
    return () => window.removeEventListener('resize', setViewportHeight);
  }, []);

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
        /* Ensure html and body take full height */
        html, body {
          width: 100%;
          // height: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          overflow-y: auto;
          overscroll-behavior: none;
          -webkit-overflow-scrolling: touch;
          height: calc(var(--vh, 1vh) * 100);
        }

        /* Dashboard container */
        .dashboard {
          padding: 20px;
          font-family: "Poppins", sans-serif;
          min-height: 100vh; 
          overflow-y: auto;
          -webkit-overflow-scrolling: touch; 
        }

        /* Custom scrollbar for WebKit browsers */
        body::-webkit-scrollbar {
          width: 5px;
        }

        body::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default CreateVoting;