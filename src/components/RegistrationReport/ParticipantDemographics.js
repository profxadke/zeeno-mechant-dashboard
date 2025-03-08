import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useToken } from '../../context/TokenContext';

const ParticipantDemographics = () => {
  const [ageDistributionData, setAgeDistributionData] = useState([]);
  const [eventId, setFormId] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useToken();

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/");
    const id = pathSegments[pathSegments.length - 1];

    if (id && !isNaN(id)) {
      setFormId(Number(id)); 
      setError(null);  
    } else {
      setError("Invalid formId in URL");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!eventId) {
        return;
      }

      try {
        const response = await fetch(`https://auth.zeenopay.com/events/form/responses/${eventId}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        console.log("Fetched Data:", data);

        if (Array.isArray(data)) {
          // Filter data based on matching form ID
          const filteredData = data.filter(item => item.form === eventId);

          const ageCounts = {};

          filteredData.forEach((participant) => {
            const responseData = participant.response;

            const age = Math.floor(parseFloat(responseData.additionalProp6)); 
            if (!isNaN(age)) {
              ageCounts[age] = (ageCounts[age] || 0) + 1;
            } else {
              console.log("Invalid age value:", responseData.additionalProp6);
            }
          });

          const ageArray = Object.keys(ageCounts).map(age => ({
            age: parseInt(age),
            count: ageCounts[age],
          }));

          // Sort by age
          ageArray.sort((a, b) => a.age - b.age);

          console.log("Age Distribution Data:", ageArray); 
          setAgeDistributionData(ageArray);
        }
      } catch (error) {
        console.error("Error fetching participant data:", error);
        setError("Failed to fetch participant data");
      }
    };

    fetchData();
  }, [eventId]);

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
      categories: ageDistributionData.map(data => data.age.toString()),
      labels: {
        style: {
          color: "#fff",
          fontWeight: "bold",
          fontFamily: 'Poppins, sans-serif',
        },
      },
    },
    yaxis: {
      title: {
        text: "Count",
        style: {
          color: "#fff",
          fontWeight: "bold",
          fontFamily: 'Poppins, sans-serif',
        },
      },
      labels: {
        formatter: (value) => Math.floor(value),
        style: {
          fontFamily: 'Poppins, sans-serif',
        },
      },
    },
    colors: ["#fff"],
  };

  const ageDistributionSeries = [
    {
      name: "Participants",
      data: ageDistributionData.map(data => data.count),
    },
  ];

  return (
    <div className="participant-demographics-container">
      <div className="header">
        <h2 className="title-demo">Participant Demographics</h2>
        <button className="export-button">Export</button>
      </div>

      <div className="participant-container">
        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

        <div className="age-distribution">
          <h3 className="regis">Age Distribution</h3>
          <Chart
            options={ageDistributionOptions}
            series={ageDistributionSeries}
            type="bar"
            height={200}
          />
          <p style={{ color: "#fff", paddingLeft: '10px' }}>Age Distribution</p>
          <span style={{ color: "#fff", fontWeight: "bold", paddingLeft: '10px' }}>
            Last Updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      <style jsx>{`
        .participant-demographics-container {
          margin-bottom: 40px;
          font-family: 'Poppins', sans-serif;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .title-demo {
          font-size: 18px;
          color: #000;
          font-weight: bold;
          margin: 0; 
          font-family: 'Poppins', sans-serif;
        }

        .export-button {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          white-space: nowrap; 
          font-family: 'Poppins', sans-serif;
        }

        .export-button:hover {
          background-color: #218838;
        }

        .participant-container {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          gap: 20px;
        }

        .age-distribution {
          background-color: #007bff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 20px;
          border-radius: 8px;
          width: 48%;
        }

        .age-distribution h3 {
          font-size: 18px;
          margin-bottom: 20px;
          color: #fff;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
        }

        .age-distribution p {
          font-size: 14px;
          margin-top: 10px;
          color: #666;
          font-family: 'Poppins', sans-serif;
        }

        .age-distribution span {
          font-size: 14px;
          color: #fff;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
        }

        /* Responsive styles */
        @media (max-width: 768px) {

          .regis{
            padding-left: 10px; 
          }
          
          .participant-demographics-container {
            // padding: 0 15px;
          }

          .header {
            flex-direction: row;
            align-items: center;
            gap: 10px;
          }

          .title-demo {
            font-size: 14px; 
          }

          .export-button {
            padding: 8px 16px; 
            font-size: 12px; 
          }

          .participant-container {
            flex-direction: column;
            gap: 15px;
          }

          .age-distribution {
            width: 100%;
            padding: 15px;
          }

          .age-distribution h3 {
            font-size: 16px;
            margin-bottom: 15px;
          }

          .age-distribution p,
          .age-distribution span {
            font-size: 12px;
          }

          .age-distribution .apexcharts-canvas {
            height: 150px !important;
          }
        }

        @media (max-width: 480px) {
          .participant-demographics-container {
            // padding: 0 10px;
          }

          .regis{
            padding-left: 10px; 
          }

          .title-demo {
            font-size: 12px; 
          }

          .export-button {
            font-size: 12px;
            padding: 6px 12px; 
          }

          .age-distribution {
            padding: 0px;
          }

          .age-distribution h3 {
            font-size: 14px;
            margin-bottom: 10px;
          }

          .age-distribution p,
          .age-distribution span {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default ParticipantDemographics;