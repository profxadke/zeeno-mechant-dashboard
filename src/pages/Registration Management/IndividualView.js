import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import CardComponent from '../../components/ViewRegistration/CardComponent';
import TableComponent from '../../components/ViewRegistration/TableComponent';

const ViewRegistration = () => {
  return (
    <DashboardLayout>
      <div className="dashboard">
        <CardComponent />
        <TableComponent />
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

export default ViewRegistration;
