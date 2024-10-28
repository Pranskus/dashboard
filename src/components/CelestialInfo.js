import React from "react";
import styled, { keyframes } from "styled-components";
import { WiSunrise, WiSunset, WiMoonAltNew, WiDaySunny } from "react-icons/wi";

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(74, 144, 226, 0.3); }
  50% { box-shadow: 0 0 20px rgba(74, 144, 226, 0.6); }
  100% { box-shadow: 0 0 5px rgba(74, 144, 226, 0.3); }
`;

const Container = styled.div`
  background: linear-gradient(135deg, #1e2130 0%, #2c3e50 100%);
  border-radius: 25px;
  padding: 25px;
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

const CelestialInfo = ({ data }) => {
  // Add data validation
  if (!data) {
    return <Container>Loading...</Container>;
  }

  console.log("Celestial data:", data); // Add this to debug

  // Safe value getter with default
  const getSafeValue = (value, defaultValue = "N/A") => {
    return value ?? defaultValue;
  };

  return (
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
    </Container>
  );
};

export default CelestialInfo;
