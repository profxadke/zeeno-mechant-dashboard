import React, { useState } from "react";
import Chart from "react-apexcharts";

const RegistrationSalesChart = () => {
  const barOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: [
        "Jan 1",
        "Jan 2",
        "Jan 3",
        "Jan 4",
        "Jan 5",
        "Jan 6",
        "Jan 7",
        "Jan 8",
        "Jan 9",
        "Jan 10",
      ],
    },
    colors: ["#028248"],
  };

  const barSeries = [
    {
      name: "Registrations",
      data: [10, 20, 40, 10, 10, 20, 15, 10, 35, 40],
    },
  ];

  const pieOptions = {
    chart: {
      type: "pie",
      height: 350,
    },
    labels: ["Esewa", "Khalti", "ImePay", "Bank Transfer", "Connect IPS"],
    colors: ["#028248", "#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
    legend: { position: "bottom" },
  };

  const pieSeries = [10, 20, 30, 15, 25];

  const [registrationDateRange, setRegistrationDateRange] = useState("1 Jan - 10 Jan");
  const [salesDateRange, setSalesDateRange] = useState("1 Jan - 10 Jan");

  const dateRanges = [
    { label: "1 Jan - 10 Jan", value: "1 Jan - 10 Jan" },
    { label: "11 Jan - 20 Jan", value: "11 Jan - 20 Jan" },
    { label: "21 Jan - 30 Jan", value: "21 Jan - 30 Jan" },
  ];

  const handleRegistrationDateChange = (event) => {
    setRegistrationDateRange(event.target.value);
  };

  const handleSalesDateChange = (event) => {
    setSalesDateRange(event.target.value);
  };

  return (
    <div className="chart-container">
      <div className="header">
        <h2>Registration & Sales Chart</h2>
        <button className="export-btn">Export</button>
      </div>

      <div className="charts">
        {/* Registration Report */}
        <div className="registration-chart">
          <div className="chart-header">
            <h3>Registration Report</h3>
            <div className="dropdown">
              <button className="filter-btn">
                Select Date Range: {registrationDateRange}
              </button>
              <div className="dropdown-content">
                {dateRanges.map((range) => (
                  <button
                    key={range.value}
                    value={range.value}
                    onClick={handleRegistrationDateChange}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Chart
            options={barOptions}
            series={barSeries}
            type="bar"
            height={350}
          />
        </div>

        {/* Sales Report */}
        <div className="sales-report">
          <div className="chart-header">
            <h3>Sales Report</h3>
            <div className="dropdown">
              <button className="filter-btn">
                Select Date Range: {salesDateRange}
              </button>
              <div className="dropdown-content">
                {dateRanges.map((range) => (
                  <button
                    key={range.value}
                    value={range.value}
                    onClick={handleSalesDateChange}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Chart
            options={pieOptions}
            series={pieSeries}
            type="pie"
            height={350}
          />
          <div className="total-sales">
            Rs. 35,000 <span>+18.5%</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .chart-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }

        .header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
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
          background-color: #0056b3;
        }

        .charts {
          display: flex;
          justify-content: space-between;
          width: 100%;
          gap: 20px;
        }

        .registration-chart,
        .sales-report {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          width: 48%;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
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

        .total-sales {
          text-align: center;
          font-size: 18px;
          margin-top: 20px;
        }

        .total-sales span {
          color: green;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .charts {
            flex-direction: column;
          }

          .registration-chart,
          .sales-report {
            width: 100%;
            margin-bottom: 20px;
          }

          .filter-btn {
            font-size: 14px;
            padding: 8px;
          }
          
          .total-sales {
            font-size: 16px;
          }

           .header {
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            gap: 50px;
          }

          .export-button {
            width: auto;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .header h2 {
            font-size: 18px;
          }

          .export-btn {
            padding: 6px 12px;
          }

          .filter-btn {
            font-size: 12px;
            padding: 6px 10px;
          }

          .dropdown-content button {
            padding: 10px;
          }

          .total-sales {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default RegistrationSalesChart;
