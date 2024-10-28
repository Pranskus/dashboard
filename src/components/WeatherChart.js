import React from "react";
import styled from "styled-components";

const Title = styled.h2`
  color: white;
  font-size: 1.5rem;
  margin: 0;
  padding: 0 10px; // Remove this padding
`;

const ChartContainer = styled.div`
  background: linear-gradient(135deg, #1e2130 0%, #2c3e50 100%);
  border-radius: 25px;
  padding: 20px;
  color: white;
  width: 100%;
  box-sizing: border-box;
  height: 100%; // Changed to fill entire height
  display: flex;
  flex-direction: column;
`;

const BarChartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 200px;
  gap: 15px;
  margin-top: 10px;
  padding: 20px 0; // Add padding for temperature labels
`;

const BarGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 40px; // Ensure minimum width for bars
`;

const Bar = styled.div`
  width: 100%;
  max-width: 40px;
  background: linear-gradient(180deg, #4a90e2 0%, #357abd 100%);
  border-radius: 8px;
  transition: height 0.3s ease;
  min-height: 4px;
  height: ${(props) => `${Math.max(4, props.height)}px`};
`;

const Temperature = styled.span`
  font-size: 0.9rem;
  color: white;
  font-weight: bold;
  margin-bottom: 8px;
`;

const DayLabel = styled.span`
  font-size: 0.9rem;
  color: #8e9eab;
  margin-top: 8px;
`;

const WeatherChart = ({ forecast, hideTitle }) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date();

  // Find min and max temperatures for scaling
  const temperatures = forecast.map((day) => day.main.temp);
  const maxTemp = Math.max(...temperatures);
  const minTemp = Math.min(...temperatures);
  const range = maxTemp - minTemp;

  console.log("Temperatures:", temperatures);
  console.log("Max:", maxTemp, "Min:", minTemp, "Range:", range);

  return (
    <>
      {!hideTitle && <Title>Temperature for week</Title>}
      <ChartContainer>
        <BarChartContainer>
          {forecast.map((day, index) => {
            const heightPercentage =
              range === 0 ? 100 : ((day.main.temp - minTemp) / range) * 200; // Scale to match container height

            console.log(
              `Temperature: ${day.main.temp}°, Height: ${heightPercentage}%`
            );

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
    </>
  );
};

export default WeatherChart;
