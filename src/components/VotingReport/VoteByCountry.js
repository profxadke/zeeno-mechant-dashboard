import React, { useState } from "react";
import Chart from "react-apexcharts";
import { FaDownload } from "react-icons/fa";

const VoteByCountry = () => {
  const pieOptionsNepal = {
    chart: {
      type: "pie",
      height: 350,
    },
    labels: ["Esewa", "Khalti", "ImePay", "Bank Transfer"],
    colors: ["#007bff", "#ff6384", "#36a2eb", "#ffcd56"],
    legend: { position: "bottom" },
  };

  const pieSeriesNepal = [12800, 7833, 2789, 8921];

  const pieOptionsGlobal = {
    chart: {
      type: "pie",
      height: 350,
    },
    labels: ["Vote From India", "Vote From Global"],
    colors: ["#4bc0c0", "#9966ff"],
    legend: { position: "bottom" },
  };

  const pieSeriesGlobal = [12067, 19028];

  const [dateRange, setDateRange] = useState("1 Jan - 10 Jan");

  const dateRanges = [
    { label: "1 Jan - 10 Jan", value: "1 Jan - 10 Jan" },
    { label: "11 Jan - 20 Jan", value: "11 Jan - 20 Jan" },
    { label: "21 Jan - 30 Jan", value: "21 Jan - 30 Jan" },
  ];

  const handleDateChange = (event) => {
    setDateRange(event.target.value);
  };

  return (
    <div className="chart-container">
      <div className="header">
        <h2>Vote Breakdown</h2>
        <button style={{
                        background: "#028248", 
                      }} className="export-btn" >  <FaDownload className="export-icon" />Export</button>
      </div>

      <div className="charts">
        <div className="report">
          <div className="chart-header">
            <h3>Votes from Nepal</h3>
            <div className="dropdown">
              <button className="filter-btn">
                Select Date Range: {dateRange}
              </button>
              <div className="dropdown-content">
                {dateRanges.map((range) => (
                  <button
                    key={range.value}
                    value={range.value}
                    onClick={handleDateChange}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Chart
            options={pieOptionsNepal}
            series={pieSeriesNepal}
            type="pie"
            height={350}
          />
          <div className="total-votes">
            Total Votes: 32,343
          </div>
        </div>

        <div className="report">
          <div className="chart-header">
            <h3>Votes from Global</h3>
            <div className="dropdown">
              <button className="filter-btn">
                Select Date Range: {dateRange}
              </button>
              <div className="dropdown-content">
                {dateRanges.map((range) => (
                  <button
                    key={range.value}
                    value={range.value}
                    onClick={handleDateChange}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Chart
            options={pieOptionsGlobal}
            series={pieSeriesGlobal}
            type="pie"
            height={350}
          />
          <div className="total-votes">
            Total Votes: 63,095
          </div>
        </div>
      </div>

      <style jsx>{`
  .chart-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding-bottom: 20px; 
  }

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 30px;
  }

  .header h2 {
    margin: 0;
  }

  .export-btn {
    background-color: #028248;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .export-btn:hover {
    background-color:#028248;
  }

  .charts {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: px;
    flex-wrap: wrap;
  }

  .report {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 48%;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: space-between; 
  }

  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .filter-btn {
    background-color: #fff;
    color: #000;
    border: 1px solid #ddd;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown-content button {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    width: 100%;
    border: none;
    background-color: #fff;
    cursor: pointer;
  }

  .dropdown-content button:hover {
    background-color: #ddd;
  }

  .total-votes {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
    padding: 10px; 
    width: 100%;
    box-sizing: border-box; 
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .charts {
      flex-direction: column;
      gap: 20px; 
      align-items: center;
    }

    .report {
      width: 90%; 
      margin-bottom: 20px;
    }

    .filter-btn {
      display: none;
    }

    .export-btn {
      padding: 10px 20px;
    }

    .report .apexcharts-canvas {
      height: 250px !important;
    }
  }

  @media (max-width: 480px) {
    .header {
      flex-direction: column;
      align-items: flex-start;
    }

    .charts {
      gap: 10px;
    }

    .total-votes {
      font-size: 16px; 
    }

    .report .apexcharts-canvas {
      height: 200px !important;
    }
  }
`}</style>

    </div>
  );
};

export default VoteByCountry;
