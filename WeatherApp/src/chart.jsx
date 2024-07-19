import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function LineChart() {
  // Retrieve dataHistory from localStorage
  const storedData = localStorage.getItem("dataHistory");
  const dataHistory = storedData ? JSON.parse(storedData) : [];

  const minTemp = Math.min(...dataHistory.map((data) => data.temperature));
  const maxTemp = Math.max(...dataHistory.map((data) => data.temperature));

  const scaledMinTemp = Math.floor(minTemp - 5);
  const scaledMaxTemp = Math.floor(maxTemp + 5);

  return (
    <div className="chart-container">
      <Line 
        data={{
          labels: dataHistory.map((data) => new Date(data.time).toLocaleTimeString()),
          datasets: [
            {
              label: "Temperature",
              data: dataHistory.map((data) => data.temperature),
              backgroundColor: "#3f51b5",
              borderColor: "#2196f3",
              borderWidth: 1,
            }
          ],
        }}
        options={{
            scales: {
                y: {
                  beginAtZero: true,
                  min: scaledMinTemp,
                  max: scaledMaxTemp,
                  ticks: {
                    color: "#999999", // Set color property for the axis text
                  },
                  grid: {
                    color: "#999999", // Set color property for the grid lines
                  },
                },
                x: {
                  ticks: {
                    color: "#999999", // Set color property for the axis text
                  },
                  grid: {
                    color: "#999999", // Set color property for the grid lines
                  },
                },
            },
        }}
      />
    </div>
  );
}