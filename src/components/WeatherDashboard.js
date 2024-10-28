import React, { useState, useCallback } from "react";
import styled from "styled-components";
import WeatherForecast from "./WeatherForecast";
import CelestialInfo from "./CelestialInfo";

import CityComparison from "./CityComparison";

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px; // Main content and fixed-width side column
  gap: 20px;
  height: 100%;
  width: 100%;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SideSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
`;

const ForecastContainer = styled.div`
  width: 100%;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column; // Change to column layout
  align-items: flex-start; // Align items to the left
  gap: 20px;
  margin-top: 20px;
`;

const WeatherDashboard = React.memo(({ currentWeather, forecast }) => {
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
      <MainSection>
        <ForecastContainer>
          <WeatherForecast
            currentWeather={currentWeather}
            forecast={forecast}
            onDaySelect={handleDaySelect}
          />
        </ForecastContainer>
        <BottomSection>
          <CityComparison />
        </BottomSection>
      </MainSection>
      <SideSection>
        <CelestialInfo data={selectedDayData} />
      </SideSection>
    </DashboardContainer>
  );
});

export default WeatherDashboard;
