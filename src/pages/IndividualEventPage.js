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
        .dashboard {
          padding: 20px;
          font-family: Arial, sans-serif;
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
    </>
  );
};

export default ViewRegistration;
