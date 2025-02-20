import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import debounce from "lodash/debounce";
import { MdLocationOn, MdSearch } from "react-icons/md";

const MaxWidthWrapper = styled.div`
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
  padding: 10px 0 0 0;

  @media (max-width: 768px) {
    padding: 10px 0 0 0;
  }
`;

const HeaderContainer = styled.header`
  display: flex;
  align-items: left;
  gap: 20px;
  background-color: transparent;
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
    gap: 10px;
    margin-bottom: 20px;
  }
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #fff;
  font-size: 0.8rem;
`;

const LocationIcon = styled(MdLocationOn)`
  font-size: 1.3rem;
`;

const SearchContainer = styled.div`
  position: relative;
  flex-grow: 1;
  max-width: 800px;

  @media (max-width: 768px) {
    max-width: auto;
    padding-right: 20px;
  }

  @media (max-width: 480px) {
    max-width: auto;
    padding-right: 20px;
  }
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
  padding: 10px 45px;
  color: white;
  font-size: 0.8rem;
  width: 100%;
  height: 10px;
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
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 1.1rem;
  pointer-events: none;
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background-color: rgba(44, 44, 44, 0.95);
  border-radius: 12px;
  list-style-type: none;
  padding: 8px 0;
  margin: 0;
  max-height: 250px;
  overflow-y: auto;
  z-index: 1000;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const SuggestionItem = styled.li`
  padding: 8px 15px;
  cursor: pointer;
  color: white;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

interface CityLocation {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
  currentCity: string;
}

function Header({ onSearch, currentCity }: HeaderProps): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<CityLocation[]>([]);

  const fetchSuggestions = useCallback(
    debounce(async (input: string) => {
      if (input.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
        const response = await axios.get<CityLocation[]>(
          `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${API_KEY}`
        );
        if (response.data.length > 0) {
          setSuggestions(response.data);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchSuggestions(searchTerm);
  }, [searchTerm, fetchSuggestions]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: CityLocation) => {
    const cityName = `${suggestion.name},${suggestion.country}`;
    onSearch(cityName);
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <MaxWidthWrapper>
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
    </MaxWidthWrapper>
  );
}

export default Header;
