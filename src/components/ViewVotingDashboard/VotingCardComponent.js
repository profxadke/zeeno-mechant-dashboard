import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToken } from "../../context/TokenContext";

const VotingCardComponent = () => {
  const { token } = useToken();
  const { event_id } = useParams();
  const [totalVotes, setTotalVotes] = useState(null);

  const cardSchema = {
    totalVotes: {
      icon: "📊",
      title: "Total Votes",
      value: totalVotes !== null ? ` ${totalVotes}` : "Loading...",
      subtext: "Votes fetched dynamically",
      subtextColor: totalVotes !== null && totalVotes > 0 ? "green" : "red",
    },
    uniqueVotes: {
      icon: "🌟",
      title: "Unique Votes",
      value: "-",
      subtext: "Data will be available soon",
      subtextColor: "green",
    },
    totalRevenue: {
      icon: "💵",
      title: "Top Perfomer",
      value: "-",
      subtext: "Data will be available soon",
      subtextColor: "green",
    },
  };

  const cards = Object.values(cardSchema);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await fetch(
          `https://auth.zeenopay.com/contestants/${event_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const totalVotesCalculated = data.reduce(
          (sum, contestant) => sum + (contestant.votes || 0),
          0
        );

        setTotalVotes(totalVotesCalculated);
      } catch (error) {
        console.error("Error fetching votes:", error);
        setTotalVotes("Error");
      }
    };

    fetchVotes();
  }, [event_id]);

  return (
    <div className="cards-container">
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      {cards.map((card, index) => (
        <div key={index} className="card">
          <div className="card-row">
            <div className="card-icon">{card.icon}</div>
            <div className="card-content">
              <h4 className="card-title">{card.title}</h4>
              <h2 className="card-value">{card.value}</h2>
            </div>
          </div>
          <p
            className={`card-subtext ${
              card.subtextColor === "green" ? "green" : "red"
            }`}
          >
            {card.subtext}
          </p>
        </div>
      ))}
      <hr className="horizontal-line" />

      <style>{`
        .cards-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: space-between;
          margin: 0px 0;
          animation: fadeIn 0.6s ease-in-out;
          font-family: 'Poppins', sans-serif;
        }

        .card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          max-width: 280px;
          padding: 15px;
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
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #f0f4ff;
          font-size: 20px;
          margin-right: 12px;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
        }

        .card-title {
          font-size: 14px;
          font-weight: 600;
          color: #4f4f4f;
          margin: 0;
        }

        .card-value {
          font-size: 30px;
          font-weight: 700;
          margin: 0;
        }

        .card-subtext {
          font-size: 12px;
          margin-top: 8px;
        }

        .card-subtext.green {
          color: #28a745;
        }

        .card-subtext.red {
          color: #dc3545;
        }

        .horizontal-line {
          width: 100%;
          border: 0;
          border-top: 2px solid #f4f4f4;
          margin: 20px 0 25px;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes cardAppear {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 480px) {
          .cards-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
            margin-bottom:30px;
          }

          .card {
            max-width: 100%;
            padding: 10px;
          }

          .card-title {
            font-size: 12px;
          }

          .card-value {
            font-size: 14px;
          }

          .card-subtext {
            font-size: 10px;
          }

          .horizontal-line {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default VotingCardComponent;
