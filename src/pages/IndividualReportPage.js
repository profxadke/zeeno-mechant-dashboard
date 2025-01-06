import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import CandidateTable from '../components/VotingReport/CandidateTable';
import VoteByCountry from '../components/VotingReport/VoteByCountry';

const ViewVotingReport = () => {
  return (
    <DashboardLayout>
      <div className="dashboard">
        <CandidateTable />
        <VoteByCountry/>
      </div>

      {/* Styling */}
      <style jsx>{`
        .dashboard {
          padding: 20px;
          font-family: Arial, sans-serif;
          {/* background-color: #f9f9f9; */}
        }
      `}</style>
    </DashboardLayout>
  );
};

export default ViewVotingReport;
