import React from "react";
import styled, { keyframes } from "styled-components";

import { ReactComponent as RainyIcon } from "../assets/Rainy.svg";
import { ReactComponent as ThunderstormIcon } from "../assets/Thunderstorm.svg";
import { ReactComponent as PartlyCloudyIcon } from "../assets/PartlyCloudy.svg";

import SunnyIcon from "../assets/sun.png";
import CloudyIcon from "../assets/Cloudy.png";

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
  gap: 10px;
  width: 100%;
  height: 100%; // Make it full height
`;

const Card = styled.div`
  background-color: ${(props) => (props.selected ? "#4a90e2" : "#2c2c2c")};
  border-radius: 40px;
  padding: ${(props) => (props.selected ? "20px" : "15px")};
  color: white;
  flex: ${(props) => (props.selected ? 3 : 1)};
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.selected ? "space-between" : "center")};
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%; // Make cards full height

  &:hover {
    background-color: ${(props) => (props.selected ? "#4a90e2" : "#3c3c3c")};
  }
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
  margin-bottom: -10px;
`;

const MiddleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const BottomRow = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  font-size: 12px;
  gap: 10px;
`;

const Day = styled.h3`
  margin: 0;
  font-size: ${(props) => (props.current ? "2.5rem" : "1.5rem")};
  font-weight: bold;
  text-align: center;
`;

const WeatherIconWrapper = styled.div`
  width: ${(props) => (props.current ? "80px" : "50px")};
  height: ${(props) => (props.current ? "80px" : "50px")};
  animation: ${float} 3s ease-in-out infinite;
  img,
  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SunIcon = styled.img`
  animation: ${spin} 20s linear infinite;
`;

const Temperature = styled.p`
  font-size: ${(props) => (props.current ? "4rem" : "2rem")};
  margin: 0;
  font-weight: bold;
`;

const DetailRow = styled.p`
  margin: 0;
  display: flex;
  justify-content: space-between;
`;

const DetailLabel = styled.span`
  color: inherit;
`;

const DetailValue = styled.span`
  color: black;
  font-weight: bold;
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

const SmallCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

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
