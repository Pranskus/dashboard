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
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  max-width: auto;
  width: 80%;
  margin: 0 auto;
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
      const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
      if (!API_KEY) {
        throw new Error("API key is undefined");
      }
      const currentResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      // Filter forecast data to get one entry per day
      const dailyForecast = forecastResponse.data.list.filter(
        (entry, index) => index % 8 === 0
      );
      setWeatherData({
        currentWeather: currentResponse.data,
        forecast: dailyForecast,
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
