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
            .dashboard {
            scroll-behavior: smooth;
              padding: 20px;
              font-family: Arial, sans-serif;
              {/* background-color: #f9f9f9; */}
            }
          `}</style>
    </>
  );
};

export default DashboardPage;
