import React from "react";
import styled from "styled-components";
import { WiDaySunny, WiRain } from "react-icons/wi";

const Card = styled.div`
  background-color: #2c2c2c;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
`;

const Day = styled.h3`
  margin-bottom: 10px;
`;

const WeatherIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const Temperature = styled.p`
  font-size: 1.5rem;
`;

function ForecastCard({ forecast }) {
  const { main, dt_txt } = forecast;
  const date = new Date(dt_txt);

  return (
    <Card>
      <Day>{date.toLocaleDateString("en-US", { weekday: "short" })}</Day>
      <WeatherIcon>{main.temp > 15 ? <WiDaySunny /> : <WiRain />}</WeatherIcon>
      <Temperature>{Math.round(main.temp)}°</Temperature>
    </Card>
  );
}

export default ForecastCard;
