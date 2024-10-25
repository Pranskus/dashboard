import React from "react";
import styled from "styled-components";

const MapContainer = styled.div`
  background-color: #2c2c2c;
  border-radius: 10px;
  padding: 20px;
  height: 100%;
`;

const Title = styled.h3`
  margin-bottom: 15px;
  font-size: 1.5rem;
`;

const MapPlaceholder = styled.div`
  background-color: #3c3c3c;
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

function GlobalMap() {
  return (
    <MapContainer>
      <Title>Global Map</Title>
      <MapPlaceholder>Map goes here</MapPlaceholder>
    </MapContainer>
  );
}

export default GlobalMap;
