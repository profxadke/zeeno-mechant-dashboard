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
      },
      xaxis: {
        categories: [
          "12:00 am", "2:00 am", "4:00 am", "6:00 am", "8:00 am",
          "10:00 am", "12:00 pm", "2:00 pm", "4:00 pm", "6:00 pm",
          "8:00 pm", "10:00 pm",
        ],
        labels: {
          style: {
            color: "#fff",
            fontWeight: "bold",
          },
        },
      },
      yaxis: {
        title: { text: "Votes" },
      },
      stroke: {
        curve: "smooth",
      },
      colors: ["#FFFFFF"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: ["#4A90E2"],
          stops: [0, 100],
        },
      },
      grid: { borderColor: "#90A4AE" },
   });

   const [series] = useState([{
     name: "Votes",
     data: [100, 200, 150, 300, 750, 200, 400, 350, 300, 450, 300, 500],
   }]);

   const [candidates, setCandidates] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const [currentDate, setCurrentDate] = useState("");

   useEffect(() => {
     const fetchCandidates = async () => {
       try {
         const response = await axios.get(
           `https://api.zeenopay.com/contestants/e/${event_id}`,
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
   }, []);

   if (loading) return <p>Loading...</p>;
   if (error) return <p>{error}</p>;

   return (
     <div className="dashboard-container">
       <style>
         {`
           .dashboard-container {
             display: flex;
             justify-content: space-between;
             align-items: flex-start;
             padding: 0px;
             gap: 30px;
             margin-bottom: 20px;
           }
           .chart-card {
             background-color: #4a90e2;
             color: #fff;
             border-radius: 10px;
             padding: 20px;
             flex: 2;
             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
           }
           .chart-header {
             display: flex;
             justify-content: space-between;
             align-items: center;
             margin-bottom: 20px;
           }
           .total-votes {
             font-size: 2.5rem;
             font-weight: bold;
             margin-bottom: 20px;
           }
           .candidate-card {
             background-color: #e91e63;
             color: #fff;
             border-radius: 10px;
             padding: 16px;
             flex: 1;
             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
           }
           .candidate-list {
             list-style-type: none;
             padding: 0;
             margin: 0;
           }
           .candidate-item {
             display: flex;
             justify-content: space-between;
             align-items: center;
             background-color: #d81b60;
             border-radius: 8px;
             padding: 10px 15px;
             margin-bottom: 10px;
           }
           .candidate-image {
             width: 40px;
             height: 40px;
             border-radius: 50%;
             margin-right: 10px;
           }
           .candidate-button {
             background-color: #fff;
             color: #e91e63;
             padding: 10px 15px;
             border: none;
             border-radius: 5px;
             cursor: pointer;
             margin-top: 20px;
             font-weight: bold;
           }
           @media (max-width: 768px) {
             .dashboard-container {
               flex-direction: column;
               gap: 20px;
             }
             .chart-card,
             .candidate-card {
               width: 100%;
             }
           }
         `}
       </style>
       <div className="chart-card">
         <h3>Voting Activity by Time Intervals</h3>
         <div className="chart-header">
           <h1>
             Total Votes <span style={{ fontSize: "16px" }}></span>
           </h1>
           <div className="date-display">{currentDate}</div>
         </div>
         <Chart options={chartOptions} series={series} type="line" height={300} />
       </div>

       <div className="candidate-card">
         <h3>Top - Performing Candidates</h3>
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
