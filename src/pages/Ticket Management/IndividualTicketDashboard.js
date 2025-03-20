import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import TicketCard from '../../components/TicketDashboard/TicketCard';
import TicketTable from '../../components/TicketDashboard/TicketTable';
import TicketCharts from '../../components/TicketDashboard/TicketCharts';

const IndividualTicketDashboard = () => {
  return (
    <DashboardLayout>
      <div className="dashboard">
        <TicketCard/>
        <TicketCharts/>
        <TicketTable/>
      </div>

      {/* styled-jsx */}
      <style jsx>{`
        html, body {
        width: 100%;
        margin: 0;
        padding: 0;
        overflow-x: auto;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        }

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

export default IndividualTicketDashboard;
