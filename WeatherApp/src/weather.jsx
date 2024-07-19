import DisplayData from "./displayData";
import LineChart from "./chart";
import LineChart2 from "./chart2";
import React, { useEffect, useState } from "react";

export default function Weather() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching weather data..." + new Date());
        const response = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=Maribor&units=metric&APPID=d981d845a8d09fc64218ada733aa6659"
        );
        const weatherData = await response.json();
        setData(weatherData);
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(fetchData, 900000); 

    fetchData();

    return () => {
      clearInterval(intervalId); 
    };

  }, []);

  return (
    <div className="weather">
      {data && <DisplayData Data={data} />}
    </div>
  );
}