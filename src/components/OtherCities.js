import React from "react";
import styled from "styled-components";
import { WiDaySunny, WiCloudy, WiRain } from "react-icons/wi";

const Container = styled.div`
  background-color: #2c2c2c;
  border-radius: 10px;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 15px;
  font-size: 1.5rem;
`;

const CityList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CityItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const CityName = styled.span`
  font-size: 1.1rem;
`;

const WeatherInfo = styled.div`
  display: flex;
  align-items: center;
`;

const WeatherIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 10px;
`;

const Temperature = styled.span`
  font-size: 1.1rem;
`;

function OtherCities() {
  const cities = [
    { name: "Kaunas", weather: "Cloudy", temp: 18 },
    { name: "Riga", weather: "Sunny", temp: 20 },
    { name: "Tallinn", weather: "Rainy", temp: 17 },
  ];

  const getWeatherIcon = (weather) => {
    switch (weather.toLowerCase()) {
      case "sunny":
        return <WiDaySunny />;
      case "cloudy":
        return <WiCloudy />;
      case "rainy":
        return <WiRain />;
      default:
        return <WiDaySunny />;
    }
  };

  return (
    <Container>
      <Title>Other Large Cities</Title>
      <CityList>
        {cities.map((city, index) => (
          <CityItem key={index}>
            <CityName>{city.name}</CityName>
            <WeatherInfo>
              <WeatherIcon>{getWeatherIcon(city.weather)}</WeatherIcon>
              <Temperature>{city.temp}°</Temperature>
            </WeatherInfo>
          </CityItem>
        ))}
      </CityList>
    </Container>
  );
}

export default OtherCities;
