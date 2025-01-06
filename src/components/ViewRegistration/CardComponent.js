import React from "react";

const CardComponent = () => {
  const cards = [
    {
      icon: "👥",
      title: "No. Registration",
      value: "450",
      subtext: "18.5% Up from last week",
      subtextColor: "green",
    },
    {
      icon: "📈",
      title: "Registrations Today",
      value: "25",
      subtext: "7 Down from yesterday",
      subtextColor: "red",
    },
    {
      icon: "📉",
      title: "Pending Approvals",
      value: "10",
      subtext: "2 Down from last week",
      subtextColor: "red",
    },
  ];

  return (
    <div className="cards-container">
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
            className={`card-subtext ${card.subtextColor === "green" ? "green" : "red"}`}
          >
            {card.subtext}
          </p>
        </div>
      ))}
      <hr className="horizontal-line" />
      
      <style>{`
        /* Container for all cards */
        .cards-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: space-between;
          margin: 0px 0;
          animation: fadeIn 0.6s ease-in-out;
        }

        /* Individual card styles */
        .card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          max-width: 350px;
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
          font-size: 24px;
          margin-right: 15px;
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
          font-size: 14px;
          margin-top: 10px;
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
          margin-top: 10px;
          margin-bottom: 30px;
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
            justify-content: center;
          }

          /* Adjust card width for tablets and mobile */
          .card {
            max-width: 100%;
            width: 100%;
          }

          .card-title {
            font-size: 14px;
          }

          .card-value {
            font-size: 30px;
          }

          .card-subtext {
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .card-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .card-icon {
            margin-bottom: 10px;
          }

          .card-content {
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default CardComponent;
