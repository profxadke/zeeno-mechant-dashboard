import React from "react";
import Chart from "react-apexcharts";

const ParticipantDemographics = () => {
  const ageDistributionOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
      },
    },
    xaxis: {
      categories: ["16-20", "21-25", "26-30", "30+"],
      labels: {
        style: {
          color: "#fff",
          fontWeight: "bold",
        },
      },
    },
    yaxis: {
      title: {
        text: "Count",
        style: {
          color: "#fff",
          fontWeight: "bold",
        },
      },
    },
    colors: ["#fff"],
  };

  const ageDistributionSeries = [
    {
      name: "Participants",
      data: [400, 600, 300, 200],
    },
  ];

  return (
    <div className="participant-demographics-container">
      {/* Header Section */}
      <div className="header">
        <h2 className="title">Participant Demographics</h2>
        <button className="export-button">Export</button>
      </div>

      {/* Main Content */}
      <div className="participant-container">
        <div className="age-distribution">
          <h3>Age Distribution</h3>
          <Chart
            options={ageDistributionOptions}
            series={ageDistributionSeries}
            type="bar"
            height={200}
          />
          <p style={{ color: "#fff" }}>Age Distribution</p>
          <span style={{ color: "#fff", fontWeight: "bold" }}>
            Last Updated: 5:00 pm, 12/24/2024
          </span>
        </div>
        <div className="gender-breakdown">
          <h3>Gender Breakdown</h3>
          <div className="gender-stats">
            <div className="stat">
              <h4>178</h4>
              <p>Male Participants</p>
            </div>
            <div className="stat">
              <h4>167</h4>
              <p>Female Participants</p>
            </div>
            <div className="stat">
              <h4>10</h4>
              <p>Others Participants</p>
            </div>
          </div>
          <p className="gender-breakdown-text">Gender Breakdown</p>
          <span className="gender-breakdown-text">
            Last Updated: 5:00 pm, 12/24/2024
          </span>
        </div>
      </div>

      <style jsx>{`
        .participant-demographics-container {
          margin-bottom: 40px;
        }

        /* Header Section */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .title {
          font-size: 18px;
          color: #000;
          font-weight: bold;
        }

        .export-button {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
        }

        .export-button:hover {
          background-color: #218838;
        }

        /* Main Content Section */
        .participant-container {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          gap: 20px;
        }

        .age-distribution,
        .gender-breakdown {
          background-color: #007bff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 20px;
          border-radius: 8px;
          width: 48%;
        }

        .age-distribution h3,
        .gender-breakdown h3 {
          font-size: 18px;
          margin-bottom: 20px;
          color: #fff;
          font-weight: 600;
        }

        .age-distribution p,
        .gender-breakdown span {
          font-size: 14px;
          margin-top: 10px;
          color: #666;
        }

        /* Gender breakdown section enhancements */
        .gender-breakdown {
          background-color: #028248;
          color: white;
          padding: 25px;
        }

        .gender-stats {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
        }

        .stat {
          background-color: white;
          color: #333;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          width: 30%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease-in-out;
          margin-right: 15px;
        }

        .stat:last-child {
          margin-right: 0;
        }

        /* Hover effect for stat cards */
        .stat:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
        }

        .stat h4 {
          font-size: 28px;
          margin-bottom: 10px;
          color: #007bff;
        }

        .stat p {
          font-size: 16px;
          color: #000;
          font-weight: 600;
        }

        .gender-breakdown span {
          font-size: 16px;
          color: #fff;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .gender-breakdown-text {
          margin-top: 40px;
        }

       /* Responsive styles */
  @media (max-width: 768px) {
  .participant-container {
    flex-direction: column;
    gap: 15px;
  }

  .age-distribution,
  .gender-breakdown {
    padding: 15px;
    width: 100%;
  }

  .header {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }

  .export-button {
    width: auto;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .participant-demographics-container {
    padding: 0 15px; 
  }

  .participant-container {
    flex-direction: column;
    gap: 15px;
    margin: 0 15px; 
  }

  .age-distribution,
  .gender-breakdown {
    padding: 15px;
    width: 100%;
  }

  .gender-stats {
    flex-direction: column;
    gap: 10px;
  }

  .stat {
    width: 80%;
    margin: 10px auto; 
    padding: 15px;
  }

  .stat h4 {
    font-size: 20px;
  }

  .stat p {
    font-size: 14px;
  }
}

      `}</style>
    </div>
  );
};

export default ParticipantDemographics;
