import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #2c2c2c;
  border-radius: 40px;
  padding: 20px;
  color: white;
  width: 100%;
  height: 100%; // Make it full height of its container
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 40px;
  margin-top: 0px;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-grow: 1; // Allow it to grow and fill the container
  position: relative;
  margin-left: 40px;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Bar = styled.div`
  width: 8px;
  background-color: #4a90e2;
  height: 0;
  border-radius: 4px;
  transition: height 0.5s ease-out;
  animation: growBar 0.5s ease-out ${(props) => props.index * 0.1}s forwards;

  @keyframes growBar {
    to {
      height: ${(props) => Math.max(props.height, 1)}px;
    }
  }
`;

const Time = styled.span`
  font-size: 0.8rem;
  margin-top: 20px;
  color: #888;
`;

const LabelContainer = styled.div`
  position: absolute;
  left: -40px;
  top: 0;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Label = styled.span`
  font-size: 0.8rem;
  color: #888;
`;

const GridLine = styled.div`
  position: absolute;
  left: 10px;
  right: 0;
  border-top: 1px dashed #444;
  top: ${(props) => props.$top}px;
`;

const NoRainMessage = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #888;
  font-size: 0.9rem;
`;

const ChanceOfRain = ({ selectedDayData }) => {
  console.log("ChanceOfRain rendering", selectedDayData);
  const [key, setKey] = useState(0);

  const maxHeight = 150;

  // Generate rain data based on the selected day's forecast
  const rainData = useMemo(() => {
    if (!selectedDayData) {
      return Array(6).fill({ time: "00:00", chance: 0 });
    }

    const baseTime = new Date(selectedDayData.dt * 1000);
    return Array(6)
      .fill()
      .map((_, index) => {
        const time = new Date(baseTime.getTime() + index * 3600000);
        return {
          time: time.getHours().toString().padStart(2, "0") + ":00",
          chance: Math.round((selectedDayData.pop || 0) * 100),
        };
      });
  }, [selectedDayData]);

  // Add this useEffect
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [selectedDayData]);

  const noChanceOfRain = rainData.every((data) => data.chance === 0);

  return (
    <Container data-testid="chance-of-rain-component">
      <Title>Chance of rain</Title>
      <ChartContainer>
        <LabelContainer>
          <Label>High</Label>
          <Label>Medium</Label>
          <Label>Low</Label>
        </LabelContainer>
        <GridLine $top={0} />
        <GridLine $top={maxHeight / 2} />
        <GridLine $top={maxHeight} />
        {rainData.map((data, index) => (
          <BarContainer key={`${key}-${index}`}>
            <Bar
              height={Math.max((data.chance / 100) * maxHeight, 1)}
              index={index}
            />
            <Time>{data.time}</Time>
          </BarContainer>
        ))}
        {noChanceOfRain && (
          <NoRainMessage>No chance of rain for the selected day.</NoRainMessage>
        )}
      </ChartContainer>
    </Container>
  );
};

export default React.memo(ChanceOfRain);
