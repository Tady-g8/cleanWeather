import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function LineChart() {
  // Retrieve dataHistory from localStorage
  const storedData = localStorage.getItem("dataHistory");
  const dataHistory = storedData ? JSON.parse(storedData) : [];

  const averageHumidity = dataHistory.reduce((sum, data) => sum + data.humidity, 0) / dataHistory.length;

  const hours = Math.max(...dataHistory.map((data) => new Date(data.time).getHours())) - Math.min(...dataHistory.map((data) => new Date(data.time).getHours()));

  return (
    <div className="chart-container">
      <Line 
        data={{
          labels: dataHistory.map((data) => new Date(data.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
          datasets: [
            {
              label: "Humidity",
              data: dataHistory.map((data) => data.humidity),
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
                  min: 0,
                  max: 100,
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
      <p className="average">Average Humidity in the past {hours} hours is {averageHumidity.toFixed(2)}</p>
    </div>
  );
}