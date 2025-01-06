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

const getSafeValue = (value, defaultValue = "N/A") => {
  return value !== undefined && value !== null ? value : defaultValue;
};

const Container = styled.div`
  background: linear-gradient(
    135deg,
    rgba(30, 33, 48, 0.3) 0%,
    rgba(44, 62, 80, 0.2) 100%
  );
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 25px 20px;
  color: white;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0px 0 100px 0;
  order: 999;
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    padding: 30px 20px;
    gap: 30px;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    padding: 30px 15px;
    gap: 25px;
  }
`;

const InfoCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: transform 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 120%;
    background: linear-gradient(
      135deg,
      rgba(30, 33, 48, 0.3) 0%,
      rgba(44, 62, 80, 0.2) 100%
    );
    backdrop-filter: blur(100px);
    border-radius: 15px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-3px);

    &::before {
      opacity: 1;
    }
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 1024px) {
    &::before {
      width: 100%;
      height: 120%;
    }
  }

  @media (max-width: 600px) {
    &::before {
      width: 100%;
      height: 120%;
    }
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  color: #4a90e2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(74, 144, 226, 0.1);
  transition: all 0.3s ease;
  aspect-ratio: 1;
  object-fit: contain;

  svg,
  img {
    width: 60%;
    height: 60%;
    object-fit: contain;
  }

  &:hover {
    transform: rotate(360deg);
    background: rgba(74, 144, 226, 0.2);
  }

  @media (max-width: 600px) {
    width: 60px;
    height: 60px;
    font-size: 2.2rem;
  }
`;

const Label = styled.span`
  font-size: 0.85rem;
  color: #8e9eab;
  margin-bottom: 4px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const Value = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffffff;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
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
      </Container>
    </>
  );
};

export default CelestialInfo;
