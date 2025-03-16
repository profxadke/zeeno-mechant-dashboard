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

export default IndividualReport;



