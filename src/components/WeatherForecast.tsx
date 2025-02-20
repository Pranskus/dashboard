import React from "react";
import styled, { keyframes } from "styled-components";
import { FaSun } from "react-icons/fa";
import { WeatherData, WeatherForecastProps } from "../types/weather";

import clearSkyBg from "../assets/clear-sky.jpg";
import cloudyBg from "../assets/cloudy.jpeg";
import rainyBg from "../assets/rainy.jpg";
import stormBg from "../assets/storm.jpeg";
import partlyCloudyBg from "../assets/partly-cloudy.jpg";
import snowingBg from "../assets/snowing.jpg";

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

const moveBackground = keyframes`
  0% {
    background-size: 150% auto;
    background-position: 50% 50%;
  }
  50% {
    background-size: 170% auto;
    background-position: 51% 51%;
  }
  100% {
    background-size: 150% auto;
    background-position: 50% 50%;
  }
`;

interface ForecastContainerProps {
  singleDay?: boolean;
}

interface CardProps {
  selected?: boolean;
  bgImage?: string;
}

interface DayProps {
  current?: boolean;
}

interface WeatherIconWrapperProps {
  current?: boolean;
}

interface TemperatureProps {
  current?: boolean;
}

interface ForecastButtonProps {
  active?: boolean;
}

const ForecastContainer = styled.div<ForecastContainerProps>`
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  border-radius: 25px;

  ${(props) =>
    props.singleDay &&
    `
    & > div {
      width: 100%;
      flex: 1;
    }
  `}

  @media (max-width: 768px) {
    gap: 15px;
    justify-content: center;
  }
`;
const Card = styled.div<CardProps>`
  background: ${(props) => {
    if (props.selected) {
      return `linear-gradient(rgba(74, 144, 226, 0.4), rgba(53, 122, 189, 0.9)), url(${props.bgImage})`;
    }
    return "rgba(255, 255, 255, 0.05)";
  }};
  background-size: ${(props) => (props.selected ? "150% auto" : "cover")};
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: local;
  border-radius: 25px;
  padding: 12px;
  color: white;
  flex-grow: ${(props) => (props.selected ? 3 : 1)};
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.selected ? "space-between" : "center")};
  cursor: pointer;
  transition: all 0.3s ease;
  max-height: 100%;
  position: relative;
  overflow: hidden;
  flex-basis: ${(props) =>
    props.selected ? "250px" : "80px"}; // Increased from 250px
  min-width: ${(props) => (props.selected ? "200px" : "80px")}; // Add this line
  animation: ${(props) => (props.selected ? moveBackground : "none")} 10s
    ease-in-out infinite;

  &:hover {
    transform: translateY(-5px);
    background: ${(props) => {
      if (props.selected) {
        return `linear-gradient(rgba(74, 144, 226, 0.5), rgba(53, 122, 189, 0.9)), url(${props.bgImage})`;
      }
      return "rgba(200, 200, 200, 0.05)";
    }};
    background-size: ${(props) => (props.selected ? "150% auto" : "cover")};
    background-position: center;
    background-repeat: no-repeat;
  }

  @media (max-width: 768px) {
    flex-basis: ${(props) =>
      props.selected ? "100%" : "calc(33.333% - 15px)"};
    min-width: ${(props) => (props.selected ? "300px" : "80px")};
  }

  @media (max-width: 480px) {
    flex-basis: ${(props) => (props.selected ? "100%" : "calc(50% - 15px)")};
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

const Day = styled.h3<DayProps>`
  margin: 0;
  font-size: ${(props) => (props.current ? "1.6rem" : "1rem")};
  font-weight: bold;
  text-align: center;
  color: white;
`;

const WeatherIconWrapper = styled.div<WeatherIconWrapperProps>`
  width: ${(props) => (props.current ? "60px" : "50px")};
  height: ${(props) => (props.current ? "60px" : "50px")};
  animation: ${float} 3s ease-in-out infinite;
  font-size: ${(props) => (props.current ? "2.5rem" : "2rem")};
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: rotate(360deg);
    font-size: ${(props) => (props.current ? "4rem" : "3rem")};
  }
`;

const Temperature = styled.p<TemperatureProps>`
  font-size: ${(props) => (props.current ? "2.5rem" : "1.5rem")};
  margin: 0;
  font-weight: bold;
  color: white;
`;

const DetailRow = styled.p`
  margin: 0;
  display: flex;
  justify-content: space-between;
  background: rgba(50, 50, 50, 0.2);
  padding: 8px 12px;
  border-radius: 15px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(50, 50, 50, 0.6);
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

const StyledSun = styled(FaSun)`
  color: #ffd700; // Golden yellow color
  filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.5));
`;

const getWeatherIcon = (condition: string): React.ReactNode => {
  if (!condition) return "🌤";
  const conditions = condition.toLowerCase();
  if (conditions.includes("snow") || conditions.includes("flurries"))
    return "❄️";
  if (conditions.includes("rain")) return "🌧";
  if (conditions.includes("thunder") || conditions.includes("storm"))
    return "⚡️";
  if (conditions.includes("cloudy")) return "☁";
  if (conditions.includes("partly")) return "⛅";
  if (conditions.includes("clear") || conditions.includes("sunny"))
    return <StyledSun />;
  return "🌤";
};

const getBackgroundImage = (condition: string): string => {
  if (!condition) return partlyCloudyBg;

  const conditions = condition.toLowerCase();
  if (conditions.includes("snow") || conditions.includes("flurries"))
    return snowingBg;
  if (conditions.includes("rain")) return rainyBg;
  if (conditions.includes("thunder") || conditions.includes("storm"))
    return stormBg;
  if (conditions.includes("cloudy") || conditions.includes("overcast"))
    return cloudyBg;
  if (conditions.includes("partly") || conditions.includes("partially"))
    return partlyCloudyBg;
  if (conditions.includes("clear") || conditions.includes("sunny"))
    return clearSkyBg;
  return partlyCloudyBg;
};

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h2`
  color: white;
  margin: 0;
  font-size: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ForecastButton = styled.button<ForecastButtonProps>`
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #4a90e2 0%, #357abd 100%)"
      : "transparent"};
  border: 1px solid
    ${(props) => (props.active ? "#4a90e2" : "rgba(255, 255, 255, 0.1)")};
  color: ${(props) => (props.active ? "white" : "#8e9eab")};
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.active
        ? "linear-gradient(135deg, #4a90e2 0%, #357abd 100%)"
        : "rgba(74, 144, 226, 0.1)"};
    color: white;
  }

  @media (max-width: 480px) {
    flex: 1;
    padding: 8px 8px;
    font-size: 0.9rem;
  }
`;

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  currentWeather,
  forecast,
  onDaySelect,
}) => {
  const [selectedDay, setSelectedDay] = React.useState(0);
  const [forecastType, setForecastType] = React.useState("7days");
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

  const handleDaySelect = (index: number): void => {
    setSelectedDay(index);
    if (typeof onDaySelect === "function") {
      onDaySelect(index);
    }
  };

  // Modify renderDayCard to handle visibility
  const renderDayCard = (
    day: WeatherData,
    index: number
  ): React.ReactElement | null => {
    // Hide other cards when showing today or tomorrow
    if (forecastType === "today" && index !== 0) return null;
    if (forecastType === "tomorrow" && index !== 1) return null;

    const isSelected =
      forecastType === "today"
        ? index === 0
        : forecastType === "tomorrow"
          ? index === 1
          : selectedDay === index;

    // Debug the weather data
    console.log(
      "Weather data:",
      day?.weather?.[0]?.description || day?.weather?.[0]?.main
    );

    // Get weather icon based on the weather description (more detailed) or main condition
    const weatherIcon = getWeatherIcon(
      day?.weather?.[0]?.description || day?.weather?.[0]?.main
    );
    const backgroundImage = getBackgroundImage(day?.weather?.[0]?.main);

    return (
      <Card
        key={index}
        selected={isSelected}
        onClick={() => handleDaySelect(index)}
        bgImage={backgroundImage}
      >
        {isSelected ? (
          <CurrentDayInfo>
            <TopRow>
              <Day current>{weekDays[(currentDate.getDay() + index) % 7]}</Day>
            </TopRow>
            <MiddleRow>
              <Temperature current>{Math.round(day.main.temp)}°</Temperature>
              <WeatherIconWrapper current>{weatherIcon}</WeatherIconWrapper>
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
            <WeatherIconWrapper>{weatherIcon}</WeatherIconWrapper>
            <Temperature>{Math.round(day.main.temp)}°</Temperature>
          </SmallCard>
        )}
      </Card>
    );
  };

  const ForecastWrapper = styled.div`
    width: 100%;
  `;

  return (
    <ForecastWrapper>
      <TitleBar>
        <Title>Weather Forecast</Title>
        <ButtonGroup>
          <ForecastButton
            active={forecastType === "today"}
            onClick={() => {
              setForecastType("today");
              setSelectedDay(0);
            }}
          >
            Today
          </ForecastButton>
          <ForecastButton
            active={forecastType === "tomorrow"}
            onClick={() => {
              setForecastType("tomorrow");
              setSelectedDay(1);
            }}
          >
            Tomorrow
          </ForecastButton>
          <ForecastButton
            active={forecastType === "7days"}
            onClick={() => setForecastType("7days")}
          >
            Next 7 Days
          </ForecastButton>
        </ButtonGroup>
      </TitleBar>
      <ForecastContainer
        singleDay={forecastType === "today" || forecastType === "tomorrow"}
      >
        {currentWeather ? (
          [currentWeather, ...forecast.slice(0, 6)].map((day, index) =>
            renderDayCard(day, index)
          )
        ) : (
          <div>No weather data available</div>
        )}
      </ForecastContainer>
    </ForecastWrapper>
  );
};

export default React.memo(WeatherForecast);
