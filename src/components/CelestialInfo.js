import React from "react";
import styled, { keyframes } from "styled-components";
import {
  WiSunrise,
  WiSunset,
  WiMoonAltNew,
  WiDaySunny,
  WiStrongWind,
  WiWindDeg,
} from "react-icons/wi";
import { FaLocationArrow } from "react-icons/fa";

const getSafeValue = (value, defaultValue = "N/A") => {
  return value !== undefined && value !== null ? value : defaultValue;
};

const Container = styled.div`
  background: linear-gradient(
    135deg,
    rgba(30, 33, 48, 0.2) 0%,
    rgba(44, 62, 80, 0.1) 100%
  );
  backdrop-filter: blur(100px);
  border-radius: 20px;
  padding: 10px;
  color: white;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1280px) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: auto;
    height: auto;
    min-height: 120px;
    margin-bottom: 20px;
    backdrop-filter: blur(60px);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    backdrop-filter: blur(40px);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    margin-bottom: 30px;
    backdrop-filter: blur(40px);
  }
`;

const InfoCard = styled.div`
  border-radius: 15px;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.3s ease,
    background 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const IconWrapper = styled.div`
  font-size: 1.8rem;
  margin-bottom: 6px;
  color: #4a90e2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(74, 144, 226, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: rotate(360deg);
    background: rgba(74, 144, 226, 0.2);
  }
`;

const Label = styled.span`
  font-size: 0.8rem;
  color: #8e9eab;
  margin-bottom: 3px;
`;

const Value = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
`;

const getMoonPhaseIcon = (phase) => {
  // Moon phase is a value between 0 and 1
  if (phase === 0 || phase === 1) return "🌑"; // New Moon
  if (phase < 0.25) return "🌒"; // Waxing Crescent
  if (phase === 0.25) return "🌓"; // First Quarter
  if (phase < 0.5) return "🌔"; // Waxing Gibbous
  if (phase === 0.5) return "🌕"; // Full Moon
  if (phase < 0.75) return "🌖"; // Waning Gibbous
  if (phase === 0.75) return "🌗"; // Last Quarter
  return "🌘"; // Waning Crescent
};

// Update the formatTime function
const formatTime = (timeStr) => {
  if (!timeStr) return "N/A";
  try {
    // Visual Crossing provides time in "HH:MM:SS" format
    const [hours, minutes] = timeStr.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    console.error("Error formatting time:", error);
    return "N/A";
  }
};

const Title = styled.h2`
  color: white;
  margin: 0;
  font-size: 1.2rem;
  padding: 0 10px; // Remove this padding
`;

const CompassCard = styled(InfoCard)`
  grid-column: span 2;
  position: relative;
  height: 80px;

  @media (max-width: 1280px) {
    display: none; // Hide compass on smaller screens
  }
`;

const CompassWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(74, 144, 226, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const CompassArrow = styled(FaLocationArrow)`
  font-size: 1.5rem;
  color: #4a90e2;
  transform: rotate(${(props) => props.degree}deg);
  transition: transform 0.5s ease;
`;

const DirectionLabel = styled.div`
  position: absolute;
  font-size: 0.7rem;
  color: #8e9eab;

  &.north {
    top: 8px;
  }
  &.south {
    bottom: 8px;
  }
  &.east {
    right: 8px;
  }
  &.west {
    left: 8px;
  }
`;

const CelestialInfo = ({ data }) => {
  if (!data) {
    return (
      <>
        <Title>Sun and Night</Title>
        <Container>Loading...</Container>
      </>
    );
  }

  const windSpeed = data.wind?.speed || 0;
  const windDirection = data.wind?.deg || 0;

  const getWindDirection = (degrees) => {
    if (degrees === undefined || degrees === null) return "N/A";
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((degrees % 360) / 45) % 8;
    return directions[index];
  };

  return (
    <>
      <Title>Weather Details</Title>
      <Container>
        <InfoCard>
          <IconWrapper>
            <WiSunrise />
          </IconWrapper>
          <Label>Sunrise</Label>
          <Value>{formatTime(data.sunrise)}</Value>
        </InfoCard>

        <InfoCard>
          <IconWrapper>
            <WiSunset />
          </IconWrapper>
          <Label>Sunset</Label>
          <Value>{formatTime(data.sunset)}</Value>
        </InfoCard>

        <InfoCard>
          <IconWrapper style={{ fontSize: "2rem" }}>
            {getMoonPhaseIcon(getSafeValue(data.moonphase, 0))}
          </IconWrapper>
          <Label>Moon Phase</Label>
          <Value>
            {data.moonphase ? `${(data.moonphase * 100).toFixed(0)}%` : "N/A"}
          </Value>
        </InfoCard>

        <InfoCard>
          <IconWrapper>
            <WiDaySunny />
          </IconWrapper>
          <Label>UV Index</Label>
          <Value>{getSafeValue(data.uvindex)}</Value>
        </InfoCard>

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
    </>
  );
};

export default CelestialInfo;
