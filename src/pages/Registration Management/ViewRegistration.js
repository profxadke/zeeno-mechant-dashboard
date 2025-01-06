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

export default ViewRegistration;
