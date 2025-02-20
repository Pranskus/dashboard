import React from "react";
import styled from "styled-components";

interface NavigationProps {}

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  color: white;
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LocationIcon = styled.span`
  font-size: 20px;
  color: #4a90e2;
`;

const CityName = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const SearchBar = styled.div`
  position: relative;
  width: 300px;

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border-radius: 20px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Navigation = ({}: NavigationProps): React.ReactElement => {
  return (
    <NavContainer>
      <LocationInfo>
        <LocationIcon>📍</LocationIcon>
        <CityName>Vilnius,LT</CityName>
      </LocationInfo>
      <SearchBar>
        <SearchInput type="text" placeholder="Search city..." />
      </SearchBar>
    </NavContainer>
  );
};

export default Navigation;
