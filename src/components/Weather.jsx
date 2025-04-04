import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": "/images/clear.png",
    "01n": "/images/clear.png",
    "02d": "/images/cloud.png",
    "02n": "/images/cloud.png",
    "03d": "/images/cloud.png",
    "03n": "/images/cloud.png",
    "04d": "/images/drizzle.png",
    "04n": "/images/drizzle.png",
    "09d": "/images/rain.png",
    "09n": "/images/rain.png",
    "10d": "/images/rain.png",
    "10n": "/images/rain.png",
    "13d": "/images/snow.png",
    "13n": "/images/snow.png",
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        WindSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data.");
    }
  };

  useEffect(() => {
    search("london");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src="/images/search.png"
          alt="search image"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          {" "}
          <img
            src={weatherData.icon}
            alt="clear weather image"
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src="/images/humidity.png" alt="humidity image" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src="/images/wind.png" alt="wind image" />
              <div>
                <p>{weatherData.WindSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
