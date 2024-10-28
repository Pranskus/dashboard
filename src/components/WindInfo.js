import React from "react";
import styled, { keyframes } from "styled-components";
import { WiStrongWind, WiWindDeg } from "react-icons/wi";
import { FaLocationArrow } from "react-icons/fa";

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(74, 144, 226, 0.3); }
  50% { box-shadow: 0 0 20px rgba(74, 144, 226, 0.6); }
  100% { box-shadow: 0 0 5px rgba(74, 144, 226, 0.3); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Container = styled.div`
  background: linear-gradient(135deg, #1e2130 0%, #2c3e50 100%);
  border-radius: 25px;
  padding: 20px;
  color: white;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  animation: ${glow} 3s infinite;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition:
    transform 0.3s ease,
    background 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CompassCard = styled(InfoCard)`
  grid-column: span 2;
  position: relative;
  height: 100px;
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #4a90e2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(74, 144, 226, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(360deg);
  }
`;

const CompassWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(74, 144, 226, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const CompassArrow = styled(FaLocationArrow)`
  font-size: 2rem;
  color: #4a90e2;
  transform: rotate(${(props) => props.degree}deg);
  transition: transform 0.5s ease;
`;

const Label = styled.span`
  font-size: 0.9rem;
  color: #8e9eab;
  margin-bottom: 5px;
`;

const Value = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const DirectionLabel = styled.div`
  position: absolute;
  font-size: 0.8rem;
  color: #8e9eab;

  &.north {
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
  &.south {
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
  &.east {
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  &.west {
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const WindInfo = ({ data }) => {
  if (!data) {
    return <Container>Loading...</Container>;
  }

  // Add debug logging
  console.log("Wind data:", data.wind);

  // Safe access to wind data with defaults
  const windSpeed = data.wind?.speed || 0;
  const windDirection = data.wind?.deg || 0;

  // Get wind direction based on degrees
  const getWindDirection = (degrees) => {
    if (degrees === undefined || degrees === null) return "N/A";
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((degrees % 360) / 45) % 8;
    return directions[index];
  };

  return (
    <Container>
      <InfoCard>
        <IconWrapper>
          <WiStrongWind />
        </IconWrapper>
        <Label>Wind Speed</Label>
        <Value>{windSpeed.toFixed(1)} km/h</Value>
      </InfoCard>

      <InfoCard>
        <IconWrapper>
          <WiWindDeg />
        </IconWrapper>
        <Label>Wind Direction</Label>
        <Value>{getWindDirection(windDirection)}</Value>
      </InfoCard>

      <CompassCard>
        <CompassWrapper>
          <CompassArrow degree={windDirection} />
          <DirectionLabel className="north">N</DirectionLabel>
          <DirectionLabel className="south">S</DirectionLabel>
          <DirectionLabel className="east">E</DirectionLabel>
          <DirectionLabel className="west">W</DirectionLabel>
        </CompassWrapper>
      </CompassCard>
    </Container>
  );
};

export default WindInfo;
