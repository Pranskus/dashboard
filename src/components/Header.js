import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 20px;
`;

const Location = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SearchBar = styled.input`
  background-color: #2c2c2c;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  color: white;
  font-size: 1rem;
  width: 200px;
`;

function Header() {
  return (
    <HeaderContainer>
      <Location>Vilnius, Lithuania</Location>
      <SearchBar type="text" placeholder="Search city..." />
    </HeaderContainer>
  );
}

export default Header;
