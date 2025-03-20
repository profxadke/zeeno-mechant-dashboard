import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import RegistrationCardComponent from '../../components/RegistrationReport/RegistrationCardComponent';
import RegistrationSalesChart from '../../components/RegistrationReport/RegistrationSalesChart';
import ParticipantDemographics from '../../components/RegistrationReport/ParticipantDemographics';

const IndividualReport = () => {
  return (
    <DashboardLayout>
      <div className="dashboard">
        <RegistrationCardComponent />
        <ParticipantDemographics />
        <RegistrationSalesChart />
      </div>

      {/* Scoped Styles using styled-jsx */}
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

export default IndividualReport;



