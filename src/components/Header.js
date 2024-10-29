import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { debounce } from "lodash";
import { MdLocationOn, MdSearch } from "react-icons/md";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px;
`;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: transparent;
  width: 100%;
  max-width: 1200px;
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-size: 1.2rem;
`;

const LocationIcon = styled(MdLocationOn)`
  font-size: 1.5rem;
`;

const SearchContainer = styled.div`
  position: relative;
  flex-grow: 1;
  max-width: 800px;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchBar = styled.input`
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50px;
  padding: 15px 50px;
  color: white;
  font-size: 1rem;
  width: 100%;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const SearchIcon = styled(MdSearch)`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 1.2rem;
  pointer-events: none;
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  background-color: rgba(44, 44, 44, 0.95);
  border-radius: 15px;
  list-style-type: none;
  padding: 10px 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const SuggestionItem = styled.li`
  padding: 12px 20px;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
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
    <HeaderWrapper>
      <HeaderContainer>
        <LocationContainer>
          <LocationIcon />
          {currentCity || "Seattle, Australia"}
        </LocationContainer>
        <SearchContainer>
          <SearchForm onSubmit={handleSubmit}>
            <SearchIcon />
            <SearchBar
              type="text"
              placeholder="Search city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
    </HeaderWrapper>
  );
}

export default Header;
