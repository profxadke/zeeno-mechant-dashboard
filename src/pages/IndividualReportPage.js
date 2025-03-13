import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import CandidateTable from '../components/VotingReport/CandidateTable';
import VoteByCountry from '../components/VotingReport/VoteByCountry';

const ViewVotingReport = () => {
  const { event_id } = useParams(); 
  return (
    <DashboardLayout>
      <div className="dashboard">
        <CandidateTable />
        <VoteByCountry id={event_id}/>
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
