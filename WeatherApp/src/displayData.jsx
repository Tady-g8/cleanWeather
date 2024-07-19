import LineChart from "./chart";
import LineChart2 from "./chart2";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

export default function DisplayData({Data}) {

    const [dataHistory, setDataHistory] = useState([]);

    useEffect(() => {
        if (Data) {
          const storedData = localStorage.getItem("dataHistory");
          const dataHistory = storedData ? JSON.parse(storedData) : [];
    
          const newData = {
            temperature: Data.main.temp,
            humidity: Data.main.humidity,
            time: new Date().toLocaleString()
          };
    
          if (dataHistory.length >= 10) {
            dataHistory.shift();
          }
    
          dataHistory.push(newData);
          localStorage.setItem("dataHistory", JSON.stringify(dataHistory));
        }
      }, [Data]);

    return (
        <>
          
          <div className="data">
            <h1>Weather in {Data.name}</h1>
              <div className="tripplet">
                <div className="data-desc">

                  <ul>
                    <li>Temperature: {Data.main.temp} °C</li>
                    <li>Feels like: {Data.main.feels_like} °C</li>
                    <li>Humidity: {Data.main.humidity}%</li>
                    <li>Description: {Data.weather[0].description}</li>
                    <li>Wind: {Data.wind.speed} m/s</li>
                    <li>Clouds: {Data.clouds.all}%</li>
                    <li>Rain: {Data.rain ? Data.rain["1h"] : 0} mm</li>
                    <li>Snow: {Data.snow ? Data.snow["1h"] : 0} mm</li>
                    <li>Pressure: {Data.main.pressure} hPa</li>
                    <li>Visibility: {Data.visibility} m</li>
                  </ul>

                </div>
                <div className="data-temp">
                  <Bar 
                    data={{
                      labels: ["Temperature"],
                      datasets: [
                        {
                          label: "Temperature",
                          data: [Data.main.temp],
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
                          min: -45,
                          max: 45,
                          ticks: {
                            color: "#999999", 
                          },
                          grid: {
                            color: "#999999", 
                          },
                        },
                        x: {
                          ticks: {
                            color: "#999999", 
                          },
                          grid: {
                            color: "#999999", 
                          },
                        },
                      },
                      maintainAspectRatio: false,
                      width: "80%",
                      height: "100%",
                    }}
                  />
                </div>
                <div className="data-humidity">
                  <Bar 
                    data={{
                      labels: ["Humidity"],
                      datasets: [
                        {
                          label: "Humidity",
                          data: [Data.main.humidity],
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
                            color: "#999999", 
                          },
                          grid: {
                            color: "#999999", 
                          },
                        },
                        x: {
                          ticks: {
                            color: "#999999", 
                          },
                          grid: {
                            color: "#999999", 
                          },
                        },
                      },
                      maintainAspectRatio: false,
                      width: "80%",
                      height: "100%",
                    }}
                  />
                </div>
              </div>
              <div className="duet">
                <div className="tempChart"><LineChart /></div>
                <div className="humChart"><LineChart2 /></div>
              </div>
          </div>
        </>
    )
}

