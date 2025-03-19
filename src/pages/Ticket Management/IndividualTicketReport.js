import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import TicketTypeReport from '../../components/TicketReport/TicketTypeReport';


const IndividualTicketReport = () => {
  return (
    <DashboardLayout>
      <div className="dashboard">
        <TicketTypeReport/>
      </div>

      {/* styled-jsx */}
      <style jsx>{`
       html,
            body {
                width: 100%;
                margin: 0;
                padding: 0;
                overflow: scroll;
            }

           
      `}</style>
    </DashboardLayout>
  );
};

export default IndividualTicketReport;
