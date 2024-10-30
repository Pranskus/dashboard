import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 250px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h2`
  color: white;
  font-size: 1.2rem;
  margin: 0;
`;

const CityCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(30, 33, 48, 0.3) 0%,
    rgba(44, 62, 80, 0.2) 100%
  );
  backdrop-filter: blur(100px);
  border-radius: 20px;
  padding: 8px 12px;
  color: white;
  transition: transform 0.3s ease;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateX(5px);
  }

  width: 100%;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const CityInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CityName = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: white;
`;

const DateText = styled.span`
  font-size: 0.8rem;
  color: #8e9eab;
`;

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
`;

const Temperature = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
`;

const WeatherIcon = styled.div`
  font-size: 1.4rem;
  color: #4a90e2;
  margin-bottom: 2px;
`;

const LoadingText = styled.div`
  color: white;
  font-size: 1rem;
`;

const CityComparison = ({ hideTitle }) => {
  const [citiesData, setCitiesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState({
    date: "",
    time: "",
  });

  const cities = ["Vilnius,LT", "Kaunas,LT", "Klaipėda,LT"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const API_KEY = "6PNY9WT9YSL482LUA525EZL8L";
        const requests = cities.map((city) =>
          fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}&contentType=json`
          ).then((response) => response.json())
        );

        const responses = await Promise.all(requests);
        const data = {};
        responses.forEach((response, index) => {
          data[cities[index]] = {
            temp: response.currentConditions.temp,
            conditions: response.currentConditions.conditions,
          };
        });

        setCitiesData(data);

        // Set current time
        const now = new Date();
        setCurrentTime({
          date: now.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          time: now.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      } catch (error) {
        console.error("Error fetching cities data:", error);
        setError("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getWeatherIcon = (condition) => {
    if (!condition) return "🌤";
    const conditions = condition.toLowerCase();
    if (conditions.includes("snow") || conditions.includes("flurries"))
      return "❄️";
    if (conditions.includes("rain")) return "🌧";
    if (conditions.includes("thunder") || conditions.includes("storm"))
      return "⚡️";
    if (conditions.includes("cloudy")) return "☁";
    if (conditions.includes("partly")) return "⛅";
    if (conditions.includes("clear") || conditions.includes("sunny"))
      return "☀";
    return "🌤";
  };

  if (loading) {
    return (
      <>
        <Title>Other largest cities</Title>
        <LoadingText>Loading cities data...</LoadingText>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Title>Other largest cities</Title>
        <LoadingText>{error}</LoadingText>
      </>
    );
  }

  return (
    <>
      {!hideTitle && <Title>Other largest cities</Title>}
      <Container>
        {cities.map((city) => {
          const cityName = city.split(",")[0];
          return (
            <CityCard key={city}>
              <CardContent>
                <CityInfo>
                  <CityName>{cityName}</CityName>
                  <DateText>{currentTime.date}</DateText>
                  <DateText>{currentTime.time}</DateText>
                </CityInfo>
                <WeatherInfo>
                  <WeatherIcon>
                    {getWeatherIcon(citiesData[city]?.conditions)}
                  </WeatherIcon>
                  <Temperature>
                    {Math.round(citiesData[city]?.temp || 0)}°
                  </Temperature>
                </WeatherInfo>
              </CardContent>
            </CityCard>
          );
        })}
      </Container>
    </>
  );
};

export default CityComparison;
