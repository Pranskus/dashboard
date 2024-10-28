import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import WeatherDashboard from "./components/WeatherDashboard";

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  background-color: #1e1e1e;
  color: white;
  min-height: 100vh;
  height: 60%;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 60px; // Reduce horizontal padding to 20px
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

function App() {
  const [weatherData, setWeatherData] = useState({
    currentWeather: null,
    forecast: null,
  });
  const [city, setCity] = useState("Vilnius,LT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = "6PNY9WT9YSL482LUA525EZL8L";
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}&contentType=json`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      console.log("API Response:", data);

      setWeatherData({
        currentWeather: {
          main: {
            temp: data.currentConditions.temp,
            humidity: data.currentConditions.humidity,
            pressure: data.currentConditions.pressure,
            feels_like: data.currentConditions.feelslike,
          },
          weather: [
            {
              main: data.currentConditions.conditions,
              description: data.currentConditions.conditions,
            },
          ],
          wind: {
            speed: data.currentConditions.windspeed,
            deg: data.currentConditions.winddir, // Add wind direction
          },
          name: data.address,
          sunrise: data.days[0].sunrise,
          sunset: data.days[0].sunset,
          moonphase: data.days[0].moonphase,
          uvindex: data.currentConditions.uvindex,
        },
        forecast: data.days.slice(1, 8).map((day) => ({
          dt_txt: day.datetime,
          main: {
            temp: day.temp,
            humidity: day.humidity,
            pressure: day.pressure,
            feels_like: day.feelslike,
          },
          weather: [
            {
              main: day.conditions,
              description: day.conditions,
            },
          ],
          wind: {
            speed: day.windspeed,
            deg: day.winddir, // Add wind direction for forecast days
          },
          sunrise: day.sunrise,
          sunset: day.sunset,
          moonphase: day.moonphase,
          uvindex: day.uvindex,
        })),
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const handleSearch = (searchTerm) => {
    setCity(searchTerm);
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header onSearch={handleSearch} currentCity={city} />
        <MainContent>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading &&
            !error &&
            weatherData.currentWeather &&
            weatherData.forecast && (
              <WeatherDashboard
                currentWeather={weatherData.currentWeather}
                forecast={weatherData.forecast}
              />
            )}
        </MainContent>
      </AppContainer>
    </>
  );
}

export default App;
