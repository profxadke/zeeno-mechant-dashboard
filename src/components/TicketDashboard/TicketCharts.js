import React from "react";
import Chart from "react-apexcharts";

const DashboardCharts = () => {
  // Donut Charts (Customers Data)
  const donutOptions = {
    chart: { type: "radialBar" },
    plotOptions: {
      radialBar: {
        hollow: { size: "100%" },
        dataLabels: { name: { show: false }, value: { fontSize: "16px", color: "#333", offsetY: 5 } },
      },
    },
    colors: ["#28a745", "#ff3366"], // Green and Pink colors
    labels: ["Adult", "Young"],
  };

  const donutSeries = [50, 84]; // Adult 50%, Young 84%

  // Bar Chart (Weekly Data)
  const barOptions = {
    chart: { type: "bar" },
    plotOptions: { bar: { columnWidth: "50%" } },
    xaxis: { categories: ["Sun", "Mon", "Tue", "Wed", "Thus", "Fri", "Sat"] },
    colors: ["#ff3366"],
  };

  const barSeries = [{ name: "Visitors", data: [90, 75, 100, 50, 30, 40, 10] }];

  // Inline Styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
    minHeight: "30vh",
  };

  const headerStyle = {
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
  };

  const cardsContainerStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    alignItems: "stretch",
  };

  const cardStyle = {
    flex: "1 1 400px",
    maxWidth: "100%",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
    ":hover": {
      transform: "translateY(-5px)",
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
    },
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#333",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const filterStyle = {
    padding: "5px 10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    cursor: "pointer",
  };

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "10px",
  };

  const textStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
  };

  const subTextStyle = {
    fontSize: "16px",
    color: "#28a745",
  };

  return (
    <div style={containerStyle}>
      {/* Header Title */}
      <h3 style={headerStyle}>Dashboard Overview</h3>

      {/* Cards Container */}
      <div style={cardsContainerStyle}>
        {/* Left Card - Customers Age Distribution */}
        <div style={cardStyle}>
          <h3 style={titleStyle}>Event Attendees Distribution</h3>
          <div>
            {/* Adult */}
            <div style={rowStyle}>
              <Chart options={donutOptions} series={[donutSeries[0]]} type="radialBar" width={80} />
              <div>
                <p style={textStyle}>Adult</p>
                <p style={subTextStyle}>30 - 45 Years</p>
              </div>
            </div>

            {/* Young */}
            <div style={rowStyle}>
              <Chart options={donutOptions} series={[donutSeries[1]]} type="radialBar" width={80} />
              <div>
                <p style={textStyle}>Young</p>
                <p style={subTextStyle}>17 - 24 Years</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card - Bar Chart */}
        <div style={cardStyle}>
          <div style={titleStyle}>
            <h3>Day By Day Ticket Sales</h3>
            <select style={filterStyle}>
              <option value="7">Every 7 Days</option>
              <option value="14">Every 14 Days</option>
              <option value="30">Every 30 Days</option>
            </select>
          </div>
          <Chart options={barOptions} series={barSeries} type="bar" height={220} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;