import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { useToken } from "../../context/TokenContext";
import { useParams } from "react-router-dom";

const VotingData = () => {
  const { token } = useToken();
  const { event_id } = useParams();
  const [chartOptions] = useState({
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: {
        enabled: false,
      },
      events: {
        mouseMove: (event, chartContext, config) => {
          event.preventDefault();
        },
      },
    },
    xaxis: {
      categories: [
        "12:00 am", "6:00 am", "12:00 pm", "6:00 pm",
      ],
      labels: {
        style: {
          colors: "#333333",
          fontWeight: "bold",
        },
      },
    },
    yaxis: {
      title: { text: "Votes" },
      labels: {
        style: {
          fontWeight: "bold",
        },
      },
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["rgb(133, 219, 80)"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        gradientToColors: ["rgb(133, 219, 80)"],
        stops: [0, 100],
      },
    },
    grid: { borderColor: "#ECEFF1" },
  });

  const [series] = useState([{
    name: "Votes",
    data: [100, 750, 300, 750],
  }]);

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          `https://auth.zeenopay.com/events/contestants/?event_id=${event_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const sortedCandidates = response.data
          .sort((a, b) => b.votes - a.votes)
          .slice(0, 6);

        setCandidates(sortedCandidates);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError("Failed to fetch candidate data.");
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [event_id, token]);

  useEffect(() => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    setCurrentDate(date.toLocaleDateString("en-US", options));

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-container">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
          .dashboard-container {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 0 30px;
            gap: 30px;
            margin-bottom: 20px;
            font-family: 'Poppins', sans-serif;
            box-sizing: border-box;
          }
          .chart-card {
            background-color: #f7f9fc;
            // border: 1px solid #E0E0E0;
            border-radius: 10px;
            padding: 20px;
            flex: 2;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            font-family: 'Poppins', sans-serif;
          }
          .chart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            font-family: 'Poppins', sans-serif;
          }
          .total-votes {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 20px;
            color: #333333;
            font-family: 'Poppins', sans-serif;
          }
          .candidate-card {
            background-color: #f7f9fc;
            // border: 1px solid #E0E0E0;
            border-radius: 10px;
            padding: 30px;
            flex: 2;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            font-family: 'Poppins', sans-serif;
          }
          .candidate-list {
            list-style-type: none;
            padding: 0;
            margin: 0;
            font-family: 'Poppins', sans-serif;
          }
          .candidate-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color:rgb(133, 219, 80);
            border: 1px solid #E0E0E0;
            color: #fff;
            font-weight: 600;
            border-radius: 8px;
            padding: 10px 15px;
            margin-bottom: 10px;
            font-family: 'Poppins', sans-serif;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .candidate-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
          }
          .candidate-image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
            border: 2px solid #90CAF9;
          }
          .candidate-button {
            background-color: #1E88E5;
            color: #FFFFFF;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
            font-weight: bold;
            font-family: 'Poppins', sans-serif;
          }
          .candidate-button:hover {
            background-color: #1565C0;
          }
         @media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
    padding: 0 5px; /* Add equal gap on both sides */
  }
  .chart-card,
  .candidate-card {
    width: 100%;
    padding: 10px;
    box-sizing: border-box; 
  }
  .chart-card {
    padding-top: 10px;
    padding-bottom: 0;
  }
  .chart-header h1 {
    font-size: 18px;
  }
  .date-display {
    display: none;
  }
  .total-votes {
    font-size: 1.5rem;
  }
  .voting-h3 {
    display: none;
  }
  .top-h3 {
    font-size: 16px;
  }
  .chart {
    height: ${isMobile ? '250px' : '300px'};
  }
}

        `}
      </style>
      <div className="chart-card">
        <h3 className="voting-h3">Voting Activity by Time Intervals</h3>
        <div className="chart-header">
          <h3>Today's Votes</h3>
          <div className="date-display">{currentDate}</div>
        </div>
        <Chart options={chartOptions} series={series} type="line" height={isMobile ? 240 : 300} className="chart" />
      </div>

      <div className="candidate-card">
        <h3 className="top-h3">Top - Performing Candidates</h3>
        <ul className="candidate-list">
          {candidates.map((candidate, index) => (
            <li key={index} className="candidate-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={candidate.avatar}
                  alt="candidate"
                  className="candidate-image"
                />
                {candidate.name}
              </div>
              <span>{candidate.votes} Votes</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VotingData;
