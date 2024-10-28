import React from "react";
import styled from "styled-components";

const Title = styled.h2`
  color: white;
  font-size: 1.5rem;
  margin: 0;
  padding: 0 10px;
`;

const ChartContainer = styled.div`
  background: linear-gradient(135deg, #1e2130 0%, #2c3e50 100%);
  border-radius: 25px;
  padding: 20px;
  color: white;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Ensure everything aligns to the bottom */
`;

const BarChartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 200px;
  gap: 15px;
  margin-top: 10px;
`;

const BarGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 40px;
  height: 100%;
  /* Create three sections: temp label, bar (flexible space), day label */
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const Bar = styled.div`
  width: 100%;
  max-width: 40px;
  background: linear-gradient(180deg, #4a90e2 0%, #357abd 100%);
  border-radius: 8px;
  transition: height 0.3s ease;
  min-height: 10px;
  height: ${(props) => `${Math.max(10, props.height)}%`};
  align-self: flex-end; /* Align bar to bottom of its grid cell */
`;

const Temperature = styled.span`
  font-size: 0.9rem;
  color: white;
  font-weight: bold;
  padding-bottom: 8px;
`;

const DayLabel = styled.span`
  font-size: 0.9rem;
  color: #8e9eab;
  padding-top: 8px;
`;

const WeatherChart = ({ forecast, hideTitle }) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date();

  // Find min and max temperatures for scaling
  const temperatures = forecast.map((day) => day.main.temp);
  const maxTemp = Math.max(...temperatures);
  const minTemp = Math.min(...temperatures);
  const range = maxTemp - minTemp;

  return (
    <>
      {!hideTitle && <Title>Temperature for week</Title>}
      <ChartContainer>
        <BarChartContainer>
          {forecast.map((day, index) => {
            // Scale bar height to percentage based on temperature range
            const heightPercentage =
              range === 0 ? 100 : ((day.main.temp - minTemp) / range) * 90 + 10;
            // Ensures the smallest bar has at least 10% height

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
