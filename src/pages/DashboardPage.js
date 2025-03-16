import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import DashboardCard from '../components/DashboardCard';
import DashboardCalender from '../components/DashboardCalender';
import "../assets/dashboardmain.css"

const DashboardPage = () => {
  return (
    <>
      <DashboardLayout >
        <div className="dashboard">  
          <DashboardCard/>
          <DashboardCalender/>
       </div>
      
      </DashboardLayout>
      <style jsx>{`
            html,
            body {
                width: 100%;
                margin: 0;
                padding: 0;
                overflow: scroll;
            }
          `}</style>
    </>
  );
};

export default DashboardPage;
