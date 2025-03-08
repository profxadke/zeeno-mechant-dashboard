import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useToken } from "../../context/TokenContext";

const RegistrationSalesChart = () => {
  const [registrationData, setRegistrationData] = useState([]);
  const [paymentData, setPaymentData] = useState([]); // Updated to store payment amounts by type
  const [eventId, setEventId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useToken();

  // Fetch eventId from the URL
  useEffect(() => {
    const pathSegments = window.location.pathname.split("/");
    const id = pathSegments[pathSegments.length - 1];

    if (id && !isNaN(id)) {
      setEventId(Number(id));
      setError(null);
    } else {
      setError("Invalid eventId in URL");
    }
  }, []);

  // Fetch registration data from API
  const fetchRegistrationData = async () => {
    if (!eventId) return;

    try {
      const response = await fetch(
        `https://auth.zeenopay.com/events/form/responses/${eventId}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Registration API Response:", data);

      // Filter data for matching form ID
      const filteredData = data.filter((item) => item.form === eventId);

      setRegistrationData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching registration data:", error);
      setError("Failed to fetch registration data");
      setLoading(false);
    }
  };

  // Fetch payment data from API and filter for intent="V"
  const fetchPaymentData = async () => {
    try {
      const response = await fetch("https://auth.zeenopay.com/payments/intents/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Payment API Response:", data);

      // Filter payments with intent="V"
      const filteredPayments = data.filter((payment) => payment.intent === "F");

      // Calculate total amount by payment method
      const paymentAmounts = {};
      filteredPayments.forEach((payment) => {
        const method = payment.payment_method;
        const amount = parseFloat(payment.amount) || 0;
        paymentAmounts[method] = (paymentAmounts[method] || 0) + amount;
      });

      setPaymentData(paymentAmounts);
    } catch (error) {
      console.error("Error fetching payment data:", error);
      setError("Failed to fetch payment data");
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchRegistrationData();
    }
    fetchPaymentData();
  }, [eventId]);

  // Process registration data for bar chart
  const processRegistrationData = () => {
    const registrationCounts = {};

    registrationData.forEach((item) => {
      const date = new Date(item.created_at).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });

      registrationCounts[date] = (registrationCounts[date] || 0) + 1;
    });

    return Object.keys(registrationCounts)
      .map((date) => ({ date, count: registrationCounts[date] }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const registrationCounts = processRegistrationData();

  // Bar chart options
  const barOptions = {
    chart: { type: "bar", height: 350, toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: "50%" } },
    dataLabels: { enabled: false },
    xaxis: { categories: registrationCounts.map((item) => item.date) },
    yaxis: { labels: { formatter: (value) => Math.floor(value) } },
    colors: ["#028248"],
  };

  const barSeries = [
    {
      name: "Registrations",
      data: registrationCounts.map((item) => Math.floor(item.count)),
    },
  ];

  // Process payment data for pie chart
  const paymentMethods = Object.keys(paymentData);
  const pieSeries = paymentMethods.map((method) => paymentData[method]);

  // Pie chart options
  const pieOptions = {
    chart: { type: "pie", height: 350 },
    labels: paymentMethods,
    colors: ["#028248", "#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
    legend: { position: "bottom" },
    dataLabels: { formatter: (value) => `Rs. ${Math.floor(value)}` },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div className="chart-container">
      <div className="header">
        <h2>Registration & Sales Chart</h2>
        <button className="export-btn">Export</button>
      </div>

      <div className="charts">
        {/* Registration Report */}
        <div className="registration-chart">
          <h3 className="regis">Registration Report</h3>
          <Chart options={barOptions} series={barSeries} type="bar" height={350} />
        </div>

        {/* Sales Report */}
        <div className="sales-report">
          <h3 className="regis">Sales Report</h3>
          <Chart options={pieOptions} series={pieSeries} type="pie" height={350} />
          <div className="total-sales">
            Rs. {Math.floor(pieSeries.reduce((sum, amount) => sum + amount, 0))}{" "}
            {/* <span>+18.5%</span> */}
          </div>
        </div>
      </div>

      <style jsx>{`
        .chart-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          border-radius: 8px;
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
          font-size: 24px;
          color: #333;
        }

        .regis{
          padding: 10px;
          font-size: 14px;
        }

        .export-btn {
          background-color: #028248;
          color: white;
          padding: 8px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .export-btn:hover {
          background-color: #026c3d;
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
          padding: 0px;
          border-radius: 8px;
          width: 48%;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        }

        .total-sales {
          margin-top: 10px;
          font-size: 18px;
          font-weight: bold;
          color: #028248;
          text-align: center;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .charts {
            flex-direction: column;
          }

          .registration-chart,
          .sales-report {
            width: 100%;
          }

          .header h2 {
            font-size: 20px;
          
          }

          .export-btn {
            padding: 6px 12px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default RegistrationSalesChart;