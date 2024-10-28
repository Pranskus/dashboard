import React from "react";
import styled, { keyframes } from "styled-components";

import { ReactComponent as RainyIcon } from "../assets/Rainy.svg";
import { ReactComponent as ThunderstormIcon } from "../assets/Thunderstorm.svg";
import { ReactComponent as PartlyCloudyIcon } from "../assets/PartlyCloudy.svg";

import SunnyIcon from "../assets/sun.png";
import CloudyIcon from "../assets/Cloudy.png";

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(74, 144, 226, 0.3); }
  50% { box-shadow: 0 0 20px rgba(74, 144, 226, 0.6); }
  100% { box-shadow: 0 0 5px rgba(74, 144, 226, 0.3); }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const ForecastContainer = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
  background: linear-gradient(135deg, #1e2130 0%, #2c3e50 100%);
  padding: 20px;
  border-radius: 25px;
  animation: ${glow} 3s infinite;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Card = styled.div`
  background: ${
    (props) =>
      props.selected
        ? "linear-gradient(135deg, #4a90e2 0%, #357abd 100%)"
        : "rgba(255, 255, 255, 0.05)" // Remove background, just use container's background
  };
  border-radius: 25px;
  padding: ${(props) => (props.selected ? "25px" : "20px")};
  color: white;
  flex: ${(props) => (props.selected ? 3 : 1)};
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.selected ? "space-between" : "center")};
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    background: ${(props) =>
      props.selected
        ? "linear-gradient(135deg, #4a90e2 0%, #357abd 100%)"
        : "rgba(200, 200, 200, 0.05)"};
`;

const CurrentDayInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MiddleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BottomRow = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  border-radius: 20px;
  width: 100%;
`;

const Day = styled.h3`
  margin: 0;
  font-size: ${(props) => (props.current ? "2rem" : "1.2rem")};
  font-weight: bold;
  text-align: center;
  color: white;
`;

const WeatherIconWrapper = styled.div`
  width: ${(props) => (props.current ? "80px" : "70px")};
  height: ${(props) => (props.current ? "80px" : "70px")};
  animation: ${float} 3s ease-in-out infinite;

  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: rotate(360deg);

    img,
    svg {
      transform: scale(1.5); /* Scale the icon slightly */
      transition: transform 0.3s ease; /* Smooth scaling */
    }
  }
`;

const SunIcon = styled.img`
  animation: ${spin} 20s linear infinite;
`;

const Temperature = styled.p`
  font-size: ${(props) => (props.current ? "3.5rem" : "1.8rem")};
  margin: 0;
  font-weight: bold;
  color: white;
`;

const DetailRow = styled.p`
  margin: 0;
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.05);
  padding: 10px 15px;
  border-radius: 15px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const DetailLabel = styled.span`
  color: #cfd8dc;
  font-size: 0.9rem;
`;

const DetailValue = styled.span`
  color: white;
  font-weight: bold;
`;

const SmallCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 15px;
  padding: 10px;
`;

const getWeatherIcon = (condition) => {
  if (!condition) return PartlyCloudyIcon;

  const conditions = condition.toLowerCase();

  if (conditions.includes("snow")) {
    return ThunderstormIcon; // You might want to add a snow icon
  }
  if (conditions.includes("rain")) {
    return RainyIcon;
  }
  if (conditions.includes("thunder") || conditions.includes("storm")) {
    return ThunderstormIcon;
  }
  if (conditions.includes("cloudy") || conditions.includes("overcast")) {
    return (props) => <img src={CloudyIcon} alt="Cloudy" {...props} />;
  }
  if (conditions.includes("partly") || conditions.includes("partially")) {
    return PartlyCloudyIcon;
  }
  if (conditions.includes("clear") || conditions.includes("sunny")) {
    return (props) => <SunIcon src={SunnyIcon} alt="Sunny" {...props} />;
  }

  // Default case
  return PartlyCloudyIcon;
};

const WeatherForecast = ({
  currentWeather = null,
  forecast = [],
  onDaySelect = () => {},
}) => {
  console.log("WeatherForecast rendering");
  const [selectedDay, setSelectedDay] = React.useState(0);
  const currentDate = new Date();
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleDaySelect = (index) => {
    setSelectedDay(index);
    if (typeof onDaySelect === "function") {
      onDaySelect(index);
    }
  };

  const renderDayCard = (day, index) => {
    const isSelected = selectedDay === index;
    const WeatherIcon = getWeatherIcon(day.weather[0].main);

    return (
      <Card
        key={index}
        selected={isSelected}
        onClick={() => handleDaySelect(index)}
      >
        {isSelected ? (
          <CurrentDayInfo>
            <TopRow>
              <Day current>{weekDays[(currentDate.getDay() + index) % 7]}</Day>
            </TopRow>
            <MiddleRow>
              <Temperature current>{Math.round(day.main.temp)}°</Temperature>
              <WeatherIconWrapper current>
                <WeatherIcon />
              </WeatherIconWrapper>
            </MiddleRow>
            <BottomRow>
              <DetailRow>
                <DetailLabel>Real Feel:</DetailLabel>
                <DetailValue>{Math.round(day.main.feels_like)}°</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Wind:</DetailLabel>
                <DetailValue>{day.wind.speed} km/h</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Pressure:</DetailLabel>
                <DetailValue>{day.main.pressure} MB</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Humidity:</DetailLabel>
                <DetailValue>{day.main.humidity}%</DetailValue>
              </DetailRow>
            </BottomRow>
          </CurrentDayInfo>
        ) : (
          <SmallCard>
            <Day>
              {weekDays[(currentDate.getDay() + index) % 7].slice(0, 3)}
            </Day>
            <WeatherIconWrapper>
              <WeatherIcon />
            </WeatherIconWrapper>
            <Temperature>{Math.round(day.main.temp)}°</Temperature>
          </SmallCard>
        )}
      </Card>
    );
  };

  const selectedDayData = React.useMemo(() => {
    const allDays = [currentWeather, ...forecast.slice(0, 7)];
    return allDays[selectedDay] || null;
  }, [currentWeather, forecast, selectedDay]);

  return (
    <ForecastContainer>
      {[currentWeather, ...forecast.slice(0, 7)].map((day, index) =>
        renderDayCard(day, index)
      )}
    </ForecastContainer>
  );
};

export default React.memo(WeatherForecast);
