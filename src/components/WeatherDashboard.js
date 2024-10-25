import React, { useState, useCallback } from "react";
import styled from "styled-components";
import WeatherForecast from "./WeatherForecast";
import ChanceOfRain from "./ChanceOfRain";

const DashboardContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  height: 300px; // Set a fixed height for the dashboard
`;

const ForecastContainer = styled.div`
  flex: 1;
  min-width: 0; // This allows the flex item to shrink below its minimum content size
  height: 100%; // Make it full height
`;

const ChanceOfRainContainer = styled.div`
  width: 300px; // Adjust this width as needed
  flex-shrink: 0; // Prevents this container from shrinking
  height: 100%; // Make it full height
`;

const WeatherDashboard = React.memo(({ currentWeather, forecast }) => {
  console.log("WeatherDashboard rendering");
  const [selectedDayData, setSelectedDayData] = useState(currentWeather);

  const handleDaySelect = useCallback(
    (index) => {
      const allDays = [currentWeather, ...forecast.slice(0, 5)];
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
      <ChanceOfRainContainer>
        <ChanceOfRain selectedDayData={selectedDayData} />
      </ChanceOfRainContainer>
    </DashboardContainer>
  );
});

export default WeatherDashboard;
