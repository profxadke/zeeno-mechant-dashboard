import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToken } from "../../context/TokenContext";

const VotingCardComponent = () => {
  const { token } = useToken();
  const { event_id } = useParams();
  const [totalVotes, setTotalVotes] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [topPerformer, setTopPerformer] = useState(null);

  const cardSchema = {
    totalVotes: {
      image: "https://i.ibb.co/SwHs5b7g/IMG-2417.png", 
      title: "Total Votes",
      value: totalVotes !== null ? ` ${totalVotes}` : "Loading...",
      subtext: "Updated Recently",
      subtextColor: totalVotes !== null && totalVotes > 0 ? "green" : "red",
    },
    topPerformer: {
      image: "https://i.ibb.co/by04tPM/IMG-2418.png", 
      title: "Top Performer",
      value: topPerformer ? topPerformer.name : "Loading...",
      subtext: topPerformer ? `${topPerformer.votes.toFixed(2)} Votes` : "Data will be available soon",
      subtextColor: "green",
    },
  };

  const cards = Object.values(cardSchema);

  
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`https://auth.zeenopay.com/events/${event_id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }

        const result = await response.json();
        setEventData(result);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEventData();
  }, [token, event_id]);

  // Fetch payment intents data and calculate total votes
  useEffect(() => {
    const fetchVotes = async () => {
      if (!eventData) return;

      try {
        // Fetch payment intents
        const paymentsResponse = await fetch(
          `https://auth.zeenopay.com/payments/intents/?event_id=${event_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!paymentsResponse.ok) {
          throw new Error('Failed to fetch payment intents');
        }

        const paymentIntents = await paymentsResponse.json();

        // Fetch contestants
        const contestantsResponse = await fetch(
          `https://auth.zeenopay.com/events/contestants/?event_id=${event_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!contestantsResponse.ok) {
          throw new Error('Failed to fetch contestants');
        }

        const contestants = await contestantsResponse.json();

        // Calculate total votes and find top performer
        let totalVotesCalculated = 0;
        const candidatesWithVotes = contestants.map((contestant) => {
          let votes = 0;

          // Match misc_kv with intent_id and calculate votes
          paymentIntents.forEach((intent) => {
            if (intent.intent_id.toString() === contestant.misc_kv) {
              votes += parseFloat(intent.amount) / eventData.payment_info;
            }
          });

          totalVotesCalculated += votes;

          return {
            ...contestant,
            votes,
          };
        });

        // Sort candidates by votes and get the top performer
        const sortedCandidates = candidatesWithVotes.sort((a, b) => b.votes - a.votes);
        const topPerformer = sortedCandidates[0];

        setTotalVotes(totalVotesCalculated);
        setTopPerformer(topPerformer); // Set the top performer
      } catch (error) {
        console.error("Error fetching data:", error);
        setTotalVotes("Error");
        setTopPerformer(null);
      }
    };

    fetchVotes();
  }, [event_id, token, eventData]);

  return (
    <div className="cards-container">
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      {cards.map((card, index) => (
        <div key={index} className="card">
          <div className="card-row">
            <div className="card-icon">
              <img src={card.image} alt={card.title} className="icon-img" /> {/* Use image as icon */}
            </div>
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
          gap: 10px; /* Reduced gap between cards */
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
          max-width: 400px; /* Increased max-width for desktop */
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
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #f0f4ff;
          margin-right: 15px;
        }

        .icon-img {
          width: 30px;
          height: 30px;
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

        @media (max-width: 768px) {
          .cards-container {
            justify-content: space-between;
          }
          .card {
            flex: 1 1 calc(40% - 10px);
            max-width: calc(40% - 10px);
            padding: 15px;
          }
          .card-title { font-size: 12px; }
          .card-value { font-size: 20px; }
        }

        @media (max-width: 480px) {
          .card {
            flex: 1 1 calc(40% - 10px);
            max-width: calc(40% - 10px);
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

export default VotingCardComponent;