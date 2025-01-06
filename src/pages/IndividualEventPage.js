import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import VotingCardComponent from '../components/ViewVotingDashboard/VotingCardComponent';
import VotingData from '../components/ViewVotingDashboard/VotingData';
import RealtimeVoting from '../components/ViewVotingDashboard/RealtimeVoting';

const ViewRegistration = () => {
  return (
    <>
    <DashboardLayout>
      <div className="dashboard">
        <VotingCardComponent />
        <VotingData />
        <RealtimeVoting/>
      </div>

      {/* Scoped Styles using styled-jsx */}
    </DashboardLayout>
          <style jsx>{`
            .dashboard {
              padding: 20px;
              font-family: Arial, sans-serif;
              {/* background-color: #f9f9f9; */}
            }
          `}</style>
    </>
  );
};

export default ViewRegistration;