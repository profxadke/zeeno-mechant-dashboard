import React, { useState, useEffect } from "react";

const Contestant = ({ event_id, token }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventResponse = await fetch(`https://auth.zeenopay.com/events/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!eventResponse.ok) {
          throw new Error("Failed to fetch event data");
        }

        const eventData = await eventResponse.json();
        const event = eventData.find((event) => event.id === parseInt(event_id));
        if (!event) {
          throw new Error("Event not found");
        }

        setPaymentInfo(event.payment_info);

        const contestantsResponse = await fetch(
          `https://auth.zeenopay.com/events/contestants/?event_id=${event_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!contestantsResponse.ok) {
          throw new Error("Failed to fetch contestants data");
        }

        const contestants = await contestantsResponse.json();

        const paymentsResponse = await fetch(
          `https://auth.zeenopay.com/payments/intents/?event_id=${event_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!paymentsResponse.ok) {
          throw new Error("Failed to fetch payment intents data");
        }

        const paymentIntents = await paymentsResponse.json();

        // Define currency conversion rates
        const currencyValues = {
          USD: 10,
          AUD: 5,
          GBP: 10,
          CAD: 5,
          EUR: 10,
          AED: 2,
          QAR: 2,
          MYR: 2,
          KWD: 2,
          HKD: 30,
          CNY: 1,
          SAR: 2,
          OMR: 20,
          SGD: 8,
          NOK: 1,
          KRW: 200,
          JPY: 20,
          THB: 4,
          INR: 10,
          NPR: 10,
        };

        // Calculate votes by matching intent_id with id of contestants
        const candidatesWithVotes = contestants.map((contestant) => {
          let totalVotes = 0;

          paymentIntents.forEach((intent) => {
            if (intent.intent_id.toString() === contestant.id.toString()) {
              let votes = 0;

              // Determine the currency based on the processor
              if (
                ["ESEWA", "KHALTI", "FONEPAY", "PRABHUPAY", "NQR", "QR"].includes(
                  intent.processor
                )
              ) {
                // NPR currency
                votes = intent.amount / currencyValues.NPR;
              } else if (["PHONEPE", "PAYU"].includes(intent.processor)) {
                // INR currency
                votes = intent.amount / currencyValues.INR;
              } else if (intent.processor === "STRIPE") {
                // Use the currency specified in the intent
                const currency = intent.currency.toUpperCase();
                if (currencyValues[currency]) {
                  votes = intent.amount / currencyValues[currency];
                }
              } else {
                // Default to payment_info if no specific logic
                votes = intent.amount / event.payment_info;
              }

              // Truncate decimal places using Math.floor
              totalVotes += Math.floor(votes);
            }
          });

          return {
            ...contestant,
            votes: totalVotes,
          };
        });

        const sortedCandidates = candidatesWithVotes
          .sort((a, b) => b.votes - a.votes)
          .slice(0, 6);

        setCandidates(sortedCandidates);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [event_id, token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
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
  );
};

export default Contestant;