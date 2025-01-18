import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import KycComponent from "../components/KycComponent";

const ViewRegistration = () => {
  return (
    <DashboardLayout>
      <div className="dashboard">
        <KycComponent />
      </div>

      {/* Styling */}
      <style jsx>{`
        .dashboard {
          padding: 20px;
          font-family: Arial, sans-serif;
           {
            /* background-color: #f9f9f9; */
          }
        }

        .confirm-btn {
          display: block;
          margin: 20px 0px;
          align-items: right;
          padding: 10px 35px;
          background-color: #028248;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }

        .confirm-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default ViewRegistration;
