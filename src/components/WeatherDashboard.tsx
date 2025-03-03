import React, { useState, useCallback } from "react";
import styled from "styled-components";
import WeatherForecast from "./WeatherForecast";
import CelestialInfo from "./CelestialInfo";
import CityComparison from "./CityComparison";
import WeatherChart from "./WeatherChart";
import { WeatherData } from "../types/weather";

interface WeatherDashboardProps {
  currentWeather: WeatherData;
  forecast: WeatherData[];
}

const MaxWidthWrapper = styled.div`
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-height: 100vh;
  position: relative;
  box-sizing: border-box;
  overflow-y: auto;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const ForecastContainer = styled.div`
  width: 100%;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const BottomContent = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h1`
  color: white;
  font-size: 2rem;
  margin: 0;
  font-size: 1.2rem;
  padding: 0 10px; // Remove this padding
  margin-bottom: 10px;
`;

const BottomWrapper = styled.div`
  width: 100%;
  padding-bottom: 20px;
  box-sizing: border-box;
`;

const WeatherDashboard = React.memo(
  ({ currentWeather, forecast }: WeatherDashboardProps): React.ReactElement => {
    const [selectedDayData, setSelectedDayData] =
      useState<WeatherData>(currentWeather);

    const handleDaySelect = useCallback(
      (index: number) => {
        const allDays = [currentWeather, ...forecast.slice(0, 7)];
        setSelectedDayData(allDays[index]);
      },
      [currentWeather, forecast]
    );

    return (
      <MaxWidthWrapper>
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
              <BottomContent>
                <ContentSection>
                  <Title>Other largest cities</Title>
                  <CityComparison hideTitle currentCity={currentWeather.name} />
                </ContentSection>
                <ContentSection>
                  <Title>Temperature next 7 days</Title>
                  <WeatherChart
                    forecast={[currentWeather, ...forecast.slice(0, 6)]}
                  />
                </ContentSection>
              </BottomContent>
            </BottomSection>
          </MainSection>
          <BottomWrapper>
            <CelestialInfo data={selectedDayData} />
          </BottomWrapper>
        </DashboardContainer>
      </MaxWidthWrapper>
    );
  }
);

export default WeatherDashboard;
