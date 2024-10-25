import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { debounce } from "lodash";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #2c2c2c;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const Location = styled.div`
  font-size: 1.2rem;
`;

const SearchContainer = styled.div`
  position: relative;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
`;

const SearchBar = styled.input`
  background-color: #444;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  color: white;
  font-size: 1rem;
  width: 200px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  background-color: #4a90e2;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #444;
  border-radius: 0 0 10px 10px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

const SuggestionItem = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;

function Header({ onSearch, currentCity }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = useCallback(
    debounce(async (input) => {
      if (input.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${API_KEY}`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchSuggestions(searchTerm);
  }, [searchTerm, fetchSuggestions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const cityName = `${suggestion.name},${suggestion.country}`;
    onSearch(cityName);
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <HeaderContainer>
      <Title>Weather Dashboard</Title>
      <Location>Current City: {currentCity}</Location>
      <SearchContainer>
        <SearchForm onSubmit={handleSubmit}>
          <SearchBar
            type="text"
            placeholder="Search city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton type="submit">Search</SearchButton>
        </SearchForm>
        {suggestions.length > 0 && (
          <SuggestionsList>
            {suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}, {suggestion.country}
              </SuggestionItem>
            ))}
          </SuggestionsList>
        )}
      </SearchContainer>
    </HeaderContainer>
  );
}

export default Header;
