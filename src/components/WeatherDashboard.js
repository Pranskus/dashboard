import React, { useState, useCallback } from "react";
import styled from "styled-components";
import WeatherForecast from "./WeatherForecast";
import CelestialInfo from "./CelestialInfo";

import CityComparison from "./CityComparison";
import WeatherChart from "./WeatherChart";

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px; // Main content and fixed-width side column
  gap: 20px;
  height: 100%;
  width: 100%;
  margin-bottom: 200px;
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
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
`;

const BottomTitles = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  width: 100%;
`;

const BottomContent = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  width: 100%;
`;

const Title = styled.h1`
  color: white;
  font-size: 2rem;
  margin: 0;
  font-size: 1.2rem;
  padding: 0 10px; // Remove this padding
  margin-bottom: 10px;
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
          <BottomTitles>
            <Title>Other largest cities</Title>
            <Title>Temperature next 7 days</Title>
          </BottomTitles>
          <BottomContent>
            <CityComparison hideTitle />
            <WeatherChart
              forecast={[currentWeather, ...forecast.slice(0, 6)]}
              hideTitle
            />
          </BottomContent>
        </BottomSection>
      </MainSection>
      <SideSection>
        <CelestialInfo data={selectedDayData} />
      </SideSection>
    </DashboardContainer>
  );
});

export default WeatherDashboard;
