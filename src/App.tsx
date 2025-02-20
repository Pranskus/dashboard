import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import WeatherDashboard from "./components/WeatherDashboard";
import clearSkyBg from "./assets/clear-sky.jpg";
import stormBg from "./assets/storm.jpeg";
import cloudyBg from "./assets/cloudy.jpg";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  sunrise?: string;
  sunset?: string;
  moonphase?: number;
  uvindex?: number;
}

interface AppContainerProps {
  bgImage: string;
}

// First, add the keyframe animation
const moveBackground = keyframes`
  0% {
    background-size: 110% 110%;
    background-position: 50% 50%;
  }
  50% {
    background-size: 120% 120%;
    background-position: 51% 51%;
  }
  100% {
    background-size: 110% 110%;
    background-position: 50% 50%;
  }
`;

const AppContainer = styled.div<AppContainerProps>`
  font-family: Arial, sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(13, 15, 22, 0.7), rgba(24, 29, 45, 0.8)),
      url(${(props) => props.bgImage});
    background-size: 110% 110%;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    filter: blur(8px); // Adjust blur amount here
    animation: ${moveBackground} 10s ease-in-out infinite;
    z-index: -1;
  }

  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px 40px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-y: auto;
  min-height: 100%;

  @media (max-width: 768px) {
    padding: 10px 15px;
    gap: 10px;
  }
`;

function App(): React.ReactElement {
  const [weatherData, setWeatherData] = useState<{
    currentWeather: WeatherData | null;
    forecast: WeatherData[] | null;
  }>({
    currentWeather: null,
    forecast: null,
  });
  const [city, setCity] = useState("Vilnius,LT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        forecast: data.days.slice(1, 8).map((day: any) => ({
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
            deg: day.winddir,
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

  const handleSearch = (searchTerm: string) => {
    setCity(searchTerm);
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer bgImage={cloudyBg}>
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
