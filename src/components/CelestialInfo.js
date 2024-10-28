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
  background: linear-gradient(135deg, #1e2130 0%, #2c3e50 100%);
  border-radius: 25px;
  padding: 20px;
  color: white;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 20px;
  height: 100%;
`;

const InfoCard = styled.div`
  border-radius: 20px;
  padding: 20px 10px; // Increased vertical padding
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; // Add this to center content vertically
  transition:
    transform 0.3s ease,
    background 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
  }
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
  transition: all 0.3s ease;

  &:hover {
    transform: rotate(360deg);
    background: rgba(74, 144, 226, 0.2);
  }
`;

const Label = styled.span`
  font-size: 0.9rem;
  color: #8e9eab;
  margin-bottom: 5px;
`;

const Value = styled.span`
  font-size: 1.2rem;
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
  margin: 0 0 0 0;
  font-size: 1.5rem;
`;

const CompassCard = styled(InfoCard)`
  grid-column: span 2;
  position: relative;
  height: 100px;
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
