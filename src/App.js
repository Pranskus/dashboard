import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import WeatherForecast from "./components/WeatherForecast";
import ChanceOfRain from "./components/ChanceOfRain";

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
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const ForecastRow = styled.div`
  display: flex;
  gap: 20px;
`;

const ForecastColumn = styled.div`
  flex: 3;
`;

const ChanceOfRainColumn = styled.div`
  flex: 2;
`;

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
        if (!API_KEY) {
          throw new Error("API key is undefined");
        }
        const currentResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Vilnius,LT&appid=${API_KEY}&units=metric`
        );
        setCurrentWeather(currentResponse.data);

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=Vilnius,LT&appid=${API_KEY}&units=metric`
        );
        // Filter forecast data to get one entry per day
        const dailyForecast = forecastResponse.data.list.filter(
          (entry, index) => index % 8 === 0
        );
        setForecast(dailyForecast);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <MainContent>
          <ForecastRow>
            <ForecastColumn>
              {currentWeather && forecast && (
                <WeatherForecast
                  currentWeather={currentWeather}
                  forecast={forecast}
                />
              )}
            </ForecastColumn>
            <ChanceOfRainColumn>
              <ChanceOfRain />
            </ChanceOfRainColumn>
          </ForecastRow>
        </MainContent>
      </AppContainer>
    </>
  );
}

export default App;
