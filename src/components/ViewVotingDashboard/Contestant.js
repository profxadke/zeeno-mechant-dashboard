import React, { useState, useEffect } from "react";

const Contestant = ({ event_id, token }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch event data
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

        // Fetch contestants data
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

        // Fetch regular payment intents
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

        // Fetch QR/NQR payment intents
        const qrPaymentsResponse = await fetch(
          `https://auth.zeenopay.com/payments/qr/intents?event_id=${event_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!qrPaymentsResponse.ok) {
          throw new Error("Failed to fetch QR/NQR payment intents data");
        }

        const qrPaymentIntents = await qrPaymentsResponse.json();

        // Combine regular and QR/NQR payment intents
        const allPaymentIntents = [...paymentIntents, ...qrPaymentIntents];

        // Filter payment intents to include only successful transactions (status === 'S')
        const successfulPaymentIntents = allPaymentIntents.filter(
          (intent) => intent.status === 'S'
        );

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
          HKD: 1,
          CNY: 1,
          SAR: 2,
          OMR: 20,
          SGD: 8,
          NOK: 1,
          KGS: 1,   // 1 Vote: 1 KGS
          NZD: 5,   // 1 Vote: 5 NZD
          ILS: 2,   // 1 Vote: 2 ILS
          KRW: 200,
          JPY: 20,
          THB: 4,
          INR: 10,
          NPR: 10,
          RBL: 15,  // 15 RBL: 1 Vote
          BDT: 15  // 15 BDT: 1 Vote
        };

        // Calculate votes by matching intent_id with id of contestants
        const candidatesWithVotes = contestants.map((contestant) => {
          let totalVotes = 0;

          successfulPaymentIntents.forEach((intent) => {
            if (intent.intent_id.toString() === contestant.id.toString()) {
              let currency = 'USD';
              const processor = intent.processor?.toUpperCase();

              // Determine the currency based on the processor
              if (
                ["ESEWA", "KHALTI", "FONEPAY", "PRABHUPAY", "NQR", "QR"].includes(
                  processor
                )
              ) {
                currency = 'NPR';
              } else if (["PHONEPE", "PAYU"].includes(processor)) {
                currency = 'INR';
              } else if (processor === "STRIPE") {
                currency = intent.currency?.toUpperCase() || 'USD';
              }

              const currencyValue = currencyValues[currency] || 1;

              let votes;
              if (['KRW', 'JPY', 'THB', 'INR', 'NPR', 'ILS', 'KGS', 'NZD', 'RBL', 'BDT'].includes(currency)) {
                votes = Math.floor(intent.amount / currencyValue);
              } else {
                votes = Math.floor(intent.amount * currencyValue);
              }

              totalVotes += votes;
            }
          });

          return {
            ...contestant,
            votes: totalVotes,
          };
        });

        // Sort candidates by votes in descending order and take top 6
        const sortedCandidates = candidatesWithVotes
          .sort((a, b) => b.votes - a.votes)
          .slice(0, 6); // Only take the top 6 candidates

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
