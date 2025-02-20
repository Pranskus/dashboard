import React from "react";
import styled from "styled-components";
import { WiDaySunny, WiStrongWind } from "react-icons/wi";

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  dt: number;
}

interface WeatherCardProps {
  currentWeather: WeatherData;
}

const Card = styled.div`
  background-color: #2c2c2c;
  border-radius: 10px;
  padding: 20px;
`;

const DateTime = styled.div`
  margin-bottom: 20px;
`;

const Day = styled.h2`
  font-size: 2rem;
  margin: 0;
`;

const Time = styled.p`
  font-size: 1.2rem;
  margin: 5px 0 0;
`;

const Temperature = styled.div`
  display: flex;
  align-items: center;
  font-size: 6rem;
  margin-bottom: 20px;
`;

const WeatherIcon = styled(WiDaySunny)`
  font-size: 4rem;
  margin-left: 20px;
`;

const Details = styled.div`
  font-size: 1rem;
`;

const DetailItem = styled.p`
  margin: 5px 0;
`;

function WeatherCard({ currentWeather }: WeatherCardProps): React.ReactElement {
  const { main, wind, dt } = currentWeather;
  const date = new Date(dt * 1000);

  return (
    <Card>
      <DateTime>
        <Day>{date.toLocaleDateString("en-US", { weekday: "long" })}</Day>
        <Time>
          {date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Time>
      </DateTime>
      <Temperature>
        {Math.round(main.temp)}°<WeatherIcon />
      </Temperature>
      <Details>
        <DetailItem>Real Feel: {Math.round(main.feels_like)}°</DetailItem>
        <DetailItem>
          <WiStrongWind /> Wind: {wind.speed} km/h
        </DetailItem>
        <DetailItem>Pressure: {main.pressure} MB</DetailItem>
        <DetailItem>Humidity: {main.humidity}%</DetailItem>
      </Details>
    </Card>
  );
}

export default WeatherCard;
