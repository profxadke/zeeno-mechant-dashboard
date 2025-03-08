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
        .dashboard {
          padding: 20px;
          font-family: Arial, sans-serif;
          {/* background-color: #f9f9f9; */}
        }
      `}</style>
    </DashboardLayout>
  );
};

export default IndividualReport;



