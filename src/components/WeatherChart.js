import React from "react";
import styled from "styled-components";

const ChartContainer = styled.div`
  background: linear-gradient(135deg, #1e2130 0%, #2c3e50 100%);
  border-radius: 25px;
  padding: 20px;
  color: white;
  width: 100%;
`;

const Title = styled.h2`
  color: white;
  font-size: 1.5rem;
  margin: 0 0 20px 0;
`;

const BarChartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 200px;
  gap: 15px;
`;

const BarGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const Bar = styled.div`
  width: 100%;
  background: linear-gradient(180deg, #4a90e2 0%, #357abd 100%);
  border-radius: 8px;
  transition: height 0.3s ease;
  min-height: 4px;
  height: ${(props) => props.height}%;

  &:hover {
    background: linear-gradient(180deg, #5a9fe2 0%, #458acd 100%);
    transform: scaleY(1.05);
  }
`;

const DayLabel = styled.span`
  font-size: 0.9rem;
  color: #8e9eab;
`;

const Temperature = styled.span`
  font-size: 0.9rem;
  color: white;
  font-weight: bold;
`;

const WeatherChart = ({ forecast }) => {
  // Find min and max temperatures for scaling
  const temperatures = forecast.map((day) => day.main.temp);
  const maxTemp = Math.max(...temperatures);
  const minTemp = Math.min(...temperatures);
  const range = maxTemp - minTemp;

  // Get day names
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDate = new Date();

  return (
    <ChartContainer>
      <Title>Temperature Trend</Title>
      <BarChartContainer>
        {forecast.map((day, index) => {
          // Calculate bar height percentage based on temperature
          const heightPercentage =
            ((day.main.temp - minTemp) / range) * 80 + 20; // 20% minimum height

          return (
            <BarGroup key={index}>
              <Temperature>{Math.round(day.main.temp)}°</Temperature>
              <Bar height={heightPercentage} />
              <DayLabel>
                {weekDays[(currentDate.getDay() + index) % 7]}
              </DayLabel>
            </BarGroup>
          );
        })}
      </BarChartContainer>
    </ChartContainer>
  );
};

export default WeatherChart;
