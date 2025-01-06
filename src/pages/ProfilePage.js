import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import ProfileComponent from '../components/ProfileComponent';

const ProfilePage = () => {
  return (
    <DashboardLayout>
      <div className="dashboard">
        <ProfileComponent />
      </div>

      {/* Styling */}
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

export default ProfilePage;
