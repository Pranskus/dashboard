import React, { useState, useCallback } from "react";
import styled from "styled-components";
import WeatherForecast from "./WeatherForecast";
import CelestialInfo from "./CelestialInfo";
import WindInfo from "./WindInfo";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  width: 100%;
`;

const ForecastContainer = styled.div`
  height: 100%; // Increase height to accommodate the content
  width: 100%;
`;

const CelestialContainer = styled.div`
  height: 200px;
  margin-top: 20px;
  width: 50%;
`;

const WindContainer = styled.div`
  height: 200px;
  margin-top: 20px;
  width: 50%;
`;

const WeatherDashboard = React.memo(({ currentWeather, forecast }) => {
  console.log(
    "WeatherDashboard rendering with data:",
    currentWeather,
    forecast
  );
  const [selectedDayData, setSelectedDayData] = useState(currentWeather);

  const handleDaySelect = useCallback(
    (index) => {
      const allDays = [currentWeather, ...forecast.slice(0, 7)];
      setSelectedDayData(allDays[index]);
    },
    [currentWeather, forecast]
  );

  return (
    <DashboardContainer data-testid="weather-dashboard">
      <ForecastContainer>
        <WeatherForecast
          currentWeather={currentWeather}
          forecast={forecast}
          onDaySelect={handleDaySelect}
        />
      </ForecastContainer>
      <div style={{ display: "flex", gap: "20px" }}>
        <CelestialContainer>
          <CelestialInfo data={selectedDayData} />
        </CelestialContainer>
        <WindContainer>
          <WindInfo data={selectedDayData} />
        </WindContainer>
      </div>
    </DashboardContainer>
  );
});

export default WeatherDashboard;
