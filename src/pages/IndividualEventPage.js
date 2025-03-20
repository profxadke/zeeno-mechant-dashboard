import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import VotingCardComponent from '../components/ViewVotingDashboard/VotingCardComponent';
import VotingData from '../components/ViewVotingDashboard/VotingData';
import RealtimeVoting from '../components/ViewVotingDashboard/RealtimeVoting';

const ViewRegistration = () => {
  // const router = useRouter();
  const { event_id } = useParams(); 
  return (
    <>
      <DashboardLayout>
        <div className="dashboard">
          <VotingCardComponent />
          <VotingData id={event_id}/>
          <RealtimeVoting id={event_id} /> 
        </div>
      </DashboardLayout>

      {/* Styling */}
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
    </>
  );
};

export default ViewRegistration;
