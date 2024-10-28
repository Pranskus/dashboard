import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  WiCloudy,
  WiDaySunny,
  WiRain,
  WiThunderstorm,
  WiSnow,
} from "react-icons/wi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
`;

const CityCard = styled.div`
  background: linear-gradient(135deg, #1e2130 0%, #2c3e50 100%);
  border-radius: 25px;
  padding: 15px;
  color: white;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CityInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CityName = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  color: #4a90e2;
`;

const DateText = styled.span`
  font-size: 0.8rem;
  color: #8e9eab;
`;

const Temperature = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
`;

const WeatherIcon = styled.div`
  font-size: 2.5rem;
  color: #4a90e2;
`;

const LoadingText = styled.div`
  text-align: center;
  color: #4a90e2;
  padding: 20px;
`;

const getWeatherIcon = (condition) => {
  if (!condition) return WiCloudy;

  const conditions = condition.toLowerCase();
  if (conditions.includes("snow")) return WiSnow;
  if (conditions.includes("rain")) return WiRain;
  if (conditions.includes("thunder") || conditions.includes("storm"))
    return WiThunderstorm;
  if (conditions.includes("cloud")) return WiCloudy;
  return WiDaySunny;
};

const getTime = () => {
  const now = new window.Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;

  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = now.toLocaleDateString("en-US", options);

  return { time, date };
};

const CityComparison = () => {
  const [citiesData, setCitiesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(getTime());

  const cities = ["Vilnius,LT", "Kaunas,LT", "Klaipėda,LT"];

  useEffect(() => {
    const fetchCitiesData = async () => {
      try {
        const API_KEY = "6PNY9WT9YSL482LUA525EZL8L";

        const promises = cities.map((city) => {
          const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&key=${API_KEY}&contentType=json`;
          return fetch(url).then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          });
        });

        const results = await Promise.all(promises);

        const data = {};
        results.forEach((result, index) => {
          data[cities[index]] = {
            temp: result.currentConditions.temp,
            conditions: result.currentConditions.conditions,
          };
        });

        setCitiesData(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    fetchCitiesData();

    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(getTime());
    }, 60000);

    return () => clearInterval(timeInterval);
  }, []);

  if (loading) {
    return <LoadingText>Loading cities data...</LoadingText>;
  }

  if (error) {
    return <LoadingText>{error}</LoadingText>;
  }

  return (
    <Container>
      {cities.map((city) => {
        const WeatherIconComponent = getWeatherIcon(
          citiesData[city]?.conditions
        );

        return (
          <CityCard key={city}>
            <CardContent>
              <CityInfo>
                <CityName>{city.split(",")[0]}</CityName>
                <DateText>{currentTime.date}</DateText>{" "}
                {/* Displaying the date */}
                <DateText>{currentTime.time}</DateText>{" "}
                {/* Displaying the time */}
                <Temperature>
                  {Math.round(citiesData[city]?.temp || 0)}°
                </Temperature>
              </CityInfo>
              <WeatherIcon>
                <WeatherIconComponent />
              </WeatherIcon>
            </CardContent>
          </CityCard>
        );
      })}
    </Container>
  );
};

export default CityComparison;
