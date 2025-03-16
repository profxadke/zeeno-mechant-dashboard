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
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </DashboardLayout>
  );
};

export default ViewVotingReport;
