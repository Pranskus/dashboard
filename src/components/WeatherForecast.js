import React, { useState } from "react";
import styled from "styled-components";

import { ReactComponent as SunnyIcon } from "../assets/Sunny.svg";
import { ReactComponent as CloudyIcon } from "../assets/Cloudy.svg";
import { ReactComponent as RainyIcon } from "../assets/Rainy.svg";
import { ReactComponent as ThunderstormIcon } from "../assets/Thunderstorm.svg";
import { ReactComponent as PartlyCloudyIcon } from "../assets/PartlyCloudy.svg";

const Container = styled.div`
  display: flex;
  gap: 10px;
  height: 400px;
`;

const Card = styled.div`
  background-color: ${(props) => (props.selected ? "#4a90e2" : "#2c2c2c")};
  border-radius: 20px;
  padding: ${(props) => (props.selected ? "30px" : "15px")};
  color: white;
  flex: ${(props) => (props.selected ? 3 : 1)};
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.selected ? "space-between" : "center")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.selected ? "#4a90e2" : "#3c3c3c")};
  }
`;

const CurrentDayInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  text-align: right;
`;

const Day = styled.h3`
  margin: 0;
  font-size: ${(props) => (props.current ? "2rem" : "1.2rem")};
  font-weight: ${(props) => (props.current ? "bold" : "normal")};
`;

const Time = styled.p`
  margin: 5px 0 0;
  font-size: 1.2rem;
  opacity: 0.8;
`;

const WeatherIconWrapper = styled.div`
  width: ${(props) => (props.current ? "100px" : "50px")};
  height: ${(props) => (props.current ? "100px" : "50px")};
  svg {
    width: 100%;
    height: 100%;
  }
`;

const Temperature = styled.p`
  font-size: ${(props) => (props.current ? "5rem" : "2rem")};
  margin: 10px 0;
  font-weight: bold;
`;

const Details = styled.div`
  font-size: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const DetailRow = styled.p`
  margin: 0;
`;

const getWeatherIcon = (condition) => {
  switch (condition) {
    case "Clear":
      return SunnyIcon;
    case "Clouds":
      return CloudyIcon;
    case "Rain":
      return RainyIcon;
    case "Thunderstorm":
      return ThunderstormIcon;
    default:
      return PartlyCloudyIcon;
  }
};

function WeatherForecast({ currentWeather, forecast }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const currentDate = new Date();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const renderDayCard = (day, index) => {
    const isSelected = selectedDay === index;
    return (
      <Card
        key={index}
        selected={isSelected}
        onClick={() => setSelectedDay(index)}
      >
        {isSelected ? (
          <>
            <CurrentDayInfo>
              <LeftColumn>
                <Day current>
                  {weekDays[(currentDate.getDay() + index) % 7]}
                </Day>
                <Temperature current>{Math.round(day.main.temp)}°</Temperature>
              </LeftColumn>
              <RightColumn>
                <WeatherIconWrapper current>
                  {React.createElement(getWeatherIcon(day.weather[0].main))}
                </WeatherIconWrapper>
              </RightColumn>
            </CurrentDayInfo>
            <Details>
              <DetailRow>
                Real Feel: {Math.round(day.main.feels_like)}°
              </DetailRow>
              <DetailRow>Wind: {day.wind.speed} km/h</DetailRow>
              <DetailRow>Pressure: {day.main.pressure} MB</DetailRow>
              <DetailRow>Humidity: {day.main.humidity}%</DetailRow>
            </Details>
          </>
        ) : (
          <>
            <Day>{weekDays[(currentDate.getDay() + index) % 7]}</Day>
            <WeatherIconWrapper>
              {React.createElement(getWeatherIcon(day.weather[0].main))}
            </WeatherIconWrapper>
            <Temperature>{Math.round(day.main.temp)}°</Temperature>
          </>
        )}
      </Card>
    );
  };

  return (
    <Container>
      {[currentWeather, ...forecast.slice(0, 5)].map((day, index) =>
        renderDayCard(day, index)
      )}
    </Container>
  );
}

export default WeatherForecast;
