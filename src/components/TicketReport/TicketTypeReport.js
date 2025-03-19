import React from "react";
import Chart from "react-apexcharts";

const TicketTypeReport = () => {
  // Updated data for ticket categories
  const ticketCategories = [
    { id: 1, name: "Normal Seat", sales: 454, trend: "down" },
    { id: 2, name: "VIP Seat", sales: 341, trend: "up" },
    { id: 3, name: "VVIP Seat", sales: 225, trend: "down" },
    { id: 4, name: "Other Seats", sales: 150, trend: "up" },
  ];

  // Updated chart options to display ticket category sales
  const chartOptions = {
    chart: { type: "line" },
    stroke: { width: 3, curve: "smooth" },
    series: [
      { name: "Normal Seat", data: [0, 3000, 4000, 3500, 5000, 6500, 4000], color: "#ff3e6c" },
      { name: "VIP Seat", data: [0, 2500, 3000, 2800, 4000, 5500, 3000], color: "#00bcd4" },
      { name: "VVIP Seat", data: [0, 1500, 2000, 1800, 3000, 4500, 2000], color: "#4caf50" },
      { name: "Other Seats", data: [0, 1000, 1200, 1100, 2000, 3000, 1500], color: "#ff9800" },
    ],
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
    yaxis: { min: 0, max: 7500 },
  };

  return (
    <div className="container" style={styles.container}>
      {/* Trending Box for Ticket Categories */}
      <div className="trending-box" style={styles.trendingBox}>
        <h3 className="title" style={styles.title}>Ticket Categories</h3>
        {ticketCategories.map((item) => (
          <div key={item.id} className="trending-item" style={styles.trendingItem}>
            <div className="item-details" style={styles.itemDetails}>
              <span className="item-rank" style={styles.itemRank}>#{item.id}</span>
              <span className="item-name" style={styles.itemName}>{item.name}</span>
            </div>
            <div className="item-sales" style={styles.itemSales}>
              <p className="sales-number" style={styles.salesNumber}>{item.sales}</p>
              <p className="sales-label" style={styles.salesLabel}>Sales</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Box for Ticket Category Sales */}
      <div className="chart-box" style={styles.chartBox}>
        <Chart options={chartOptions} series={chartOptions.series} type="line" height={500} />
      </div>
    </div>
  );
};

// Styles remain the same
const styles = {
  container: {
    display: "flex",
    gap: "20px",
    padding: "20px",
  },
  trendingBox: {
    width: "30%",
    background: "white",
    padding: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  trendingItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  },
  itemDetails: {
    display: "flex",
    gap: "10px",
  },
  itemRank: {
    color: "#ff3e6c",
    fontWeight: "bold",
  },
  itemName: {
    fontSize: "14px",
  },
  itemSales: {
    textAlign: "right",
  },
  salesNumber: {
    color: "#ff3e6c",
    fontWeight: "bold",
  },
  chartBox: {
    width: "65%",
    background: "white",
    padding: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
};

export default TicketTypeReport;