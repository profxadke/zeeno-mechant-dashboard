import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { FaTachometerAlt } from 'react-icons/fa';

const DashboardPage = () => {
  return (
    <>
      <style jsx>{`
        .dashboard-header {
          text-align: center;
          margin-bottom: 40px;
          padding: 20px;
          background-color: #f4f6f9;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .dashboard-title {
          font-size: 36px;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .dashboard-title .icon {
          font-size: 40px;
          color: #3b82f6;
        }

        .dashboard-subtitle {
          font-size: 18px;
          color: #555;
          margin-top: 10px;
        }

        .dashboard-content {
          text-align: center;
          margin-top: 40px;
        }

        .in-progress {
          font-size: 20px;
          color: #f59e0b;
          padding: 20px;
          border: 2px dashed #f59e0b;
          border-radius: 8px;
          background-color: #fff3cd;
        }
      `}</style>

      <DashboardLayout>
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            <FaTachometerAlt className="icon" /> Dashboard
          </h1>
          <p className="dashboard-subtitle">Welcome to your personalized dashboard. Manage your activities and view insights here.</p>
        </div>

        <div className="dashboard-content">
          <div className="in-progress">
            <p>This page is in progress. Stay tuned for more updates!</p>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DashboardPage;
