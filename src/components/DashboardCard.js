import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardCard = () => {
  const [data, setData] = useState({
    totalEvents: 0,
    completedEvents: 0,
    ongoingEvents: 0,
    registrationEvents: 0,
    votingEvents: 0,
    ticketingEvents: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [registrationRes, votingRes, ticketingRes] = await Promise.all([
          axios.get("https://auth.zeenopay.com/events/forms/"),
          axios.get("https://auth.zeenopay.com/events"),
          axios.get("https://auth.zeenopay.com/events/ticket-categories/"),
        ]);

        const registrationEvents = registrationRes.data.length;
        const votingEvents = votingRes.data.length;
        const ticketingEvents = ticketingRes.data.length;
        const totalEvents = registrationEvents + votingEvents + ticketingEvents;

        const completedEvents = votingRes.data.filter(
          (event) => event.status === "completed"
        ).length;

        const ongoingEvents = totalEvents - completedEvents;

        setData({
          totalEvents,
          completedEvents,
          ongoingEvents,
          registrationEvents,
          votingEvents,
          ticketingEvents,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const cards = [
    { image: "https://i.ibb.co/gFcnBhR0/IMG-2035.png", title: "Total Event Organized", value: data.totalEvents },
    { image: "https://i.ibb.co/WNMZ72j7/IMG-2037.png", title: "Completed Events", value: data.completedEvents },
    { image: "https://i.ibb.co/bjhM75JQ/IMG-2038.png", title: "Ongoing Event", value: data.ongoingEvents },
    { image: "https://i.ibb.co/Zz89ZtHD/IMG-2044.png", title: "Total Registration Events", value: data.registrationEvents },
    { image: "https://i.ibb.co/NdrtMFcC/IMG-2034.png", title: "Total Voting Events", value: data.votingEvents },
    { image: "https://i.ibb.co/6JDmR2q4/IMG-2036.png", title: "Total Ticketing Events", value: data.ticketingEvents },
  ];

  return (
    <div className="cards-container">
      {cards.map((card, index) => (
        <div key={index} className="card">
          <div className="card-row">
            <div className="card-icon">
              <img src={card.image} alt={card.title} className="icon-img" />
            </div>
            <div className="card-content">
              <h4 className="card-title">{card.title}</h4>
              <h2 className="card-value">{card.value}</h2>
            </div>
          </div>
        </div>
      ))}
      <hr className="horizontal-line" />

      <style>{`
        .cards-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: flex-start; /* Align cards to the start */
          margin: 0px 0;
          animation: fadeIn 0.6s ease-in-out;
        }

        .horizontal-line {
          width: 100%;
          border: 0;
          border-top: 2px solid #f4f4f4;
          margin-top: 10px;
        }

        .card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          max-width: 320px; /* Default max-width for desktop */
          padding: 20px;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          background-color: #ffffff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transform: translateY(20px);
          opacity: 0;
          animation: cardAppear 0.6s ease-in-out forwards;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .card-row {
          display: flex;
          align-items: center;
        }

        .card-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #f0f4ff;
          margin-right: 15px;
        }

        .icon-img {
          width: 40px;
          height: 40px;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
        }

        .card-title {
          font-size: 16px;
          font-weight: 600;
          color: #4f4f4f;
          margin: 0;
        }

        .card-value {
          font-size: 36px;
          font-weight: 700;
          margin: 0;
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes cardAppear {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .cards-container {
            justify-content: space-between; 
          }
          .card {
            flex: 1 1 calc(50% - 10px); 
            max-width: calc(40% - 10px);
            padding: 15px; 
          }
          .card-title { font-size: 12px; }
          .card-value { font-size: 20px; }
        }

        @media (max-width: 480px) {
          .card {
            flex: 1 1 calc(40% - 10px); 
            max-width: calc(50% - 10px);
            // padding: 10px; 
          }
          .card-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .card-icon { 
            margin-bottom: 10px; 
            width: 40px; 
            height: 40px;
          }
          .icon-img {
            width: 20px; 
            height: 20px;
          }
          .card-content { align-items: flex-start; }
        }
      `}</style>
    </div>
  );
};

export default DashboardCard;