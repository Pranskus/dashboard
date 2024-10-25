import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #2c2c2c;
  border-radius: 10px;
  padding: 20px;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-grow: 1;
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
  width: 12px;
  background-color: #4a90e2;
  height: ${(props) => props.height}px;
  border-radius: 6px;
`;

const Time = styled.span`
  font-size: 0.9rem;
  margin-top: 8px;
  color: #888;
`;

const LabelContainer = styled.div`
  position: absolute;
  left: -40px;
  top: 0;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Label = styled.span`
  font-size: 0.9rem;
  color: #888;
`;

const GridLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  border-top: 1px dashed #444;
  top: ${(props) => props.top}px;
`;

const rainData = [
  { time: "10AM", chance: 60 },
  { time: "11AM", chance: 40 },
  { time: "12PM", chance: 80 },
  { time: "01PM", chance: 30 },
  { time: "02PM", chance: 70 },
  { time: "03PM", chance: 20 },
];

function ChanceOfRain() {
  const maxHeight = 150; // Maximum height for the bars

  return (
    <Container>
      <Title>Chance of rain</Title>
      <ChartContainer>
        <LabelContainer>
          <Label>Rainy</Label>
          <Label>Sunny</Label>
          <Label>Heavy</Label>
        </LabelContainer>
        <GridLine top={0} />
        <GridLine top={maxHeight / 2} />
        <GridLine top={maxHeight} />
        {rainData.map((data, index) => (
          <BarContainer key={index}>
            <Bar height={(data.chance / 100) * maxHeight} />
            <Time>{data.time}</Time>
          </BarContainer>
        ))}
      </ChartContainer>
    </Container>
  );
}

export default ChanceOfRain;
