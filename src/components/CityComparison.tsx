import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

// Type definitions
interface CityData {
  temp: number;
  conditions: string;
}

interface CitiesData {
  [key: string]: CityData;
}

interface CurrentTime {
  date: string;
  time: string;
}

interface CityComparisonProps {
  hideTitle?: boolean;
  currentCity?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h2`
  color: white;
  font-size: 1.2rem;
  margin: 0;
`;

const CityCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(30, 33, 48, 0.3) 0%,
    rgba(44, 62, 80, 0.2) 100%
  );
  backdrop-filter: blur(100px);
  border-radius: 20px;
  padding: 8px 12px;
  color: white;
  transition: transform 0.3s ease;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateX(5px);
  }

  width: 100%;
  box-sizing: border-box;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const CityInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CityName = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: white;
`;

const DateText = styled.span`
  font-size: 0.8rem;
  color: #8e9eab;
`;

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
`;

const Temperature = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
`;

const WeatherIcon = styled.div`
  font-size: 1.4rem;
  color: #4a90e2;
  margin-bottom: 2px;
`;

const LoadingText = styled.div`
  color: white;
  font-size: 1rem;
`;

const CITIES_BY_COUNTRY: { [key: string]: string[] } = {
  LT: ["Vilnius,LT", "Kaunas,LT", "Klaipėda,LT"],
  US: ["New York,US", "Los Angeles,US", "Chicago,US"],
  GB: ["London,GB", "Birmingham,GB", "Manchester,GB"],
  DE: ["Berlin,DE", "Hamburg,DE", "Munich,DE"],
  FR: ["Paris,FR", "Marseille,FR", "Lyon,FR"],
  ES: ["Madrid,ES", "Barcelona,ES", "Valencia,ES"],
  IT: ["Rome,IT", "Milan,IT", "Naples,IT"],
  CA: ["Toronto,CA", "Vancouver,CA", "Montreal,CA"],
  AU: ["Sydney,AU", "Melbourne,AU", "Brisbane,AU"],
  IN: ["Mumbai,IN", "Delhi,IN", "Bangalore,IN"],
  CN: ["Beijing,CN", "Shanghai,CN", "Shenzhen,CN"],
  JP: ["Tokyo,JP", "Osaka,JP", "Kyoto,JP"],
  BR: ["São Paulo,BR", "Rio de Janeiro,BR", "Brasília,BR"],
  RU: ["Moscow,RU", "Saint Petersburg,RU", "Novosibirsk,RU"],
  ZA: ["Cape Town,ZA", "Johannesburg,ZA", "Durban,ZA"],
  NL: ["Amsterdam,NL", "Rotterdam,NL", "The Hague,NL"],
  SE: ["Stockholm,SE", "Gothenburg,SE", "Malmö,SE"],
  NO: ["Oslo,NO", "Bergen,NO", "Trondheim,NO"],
  DK: ["Copenhagen,DK", "Aarhus,DK", "Odense,DK"],
  GR: ["Athens,GR", "Thessaloniki,GR", "Patras,GR"],
  TR: ["Istanbul,TR", "Ankara,TR", "Izmir,TR"],
  SA: ["Riyadh,SA", "Jeddah,SA", "Mecca,SA"],
  KR: ["Seoul,KR", "Busan,KR", "Incheon,KR"],
  MX: ["Mexico City,MX", "Guadalajara,MX", "Monterrey,MX"],
  AR: ["Buenos Aires,AR", "Córdoba,AR", "Rosario,AR"],
  PL: ["Warsaw,PL", "Krakow,PL", "Wrocław,PL"],
  CH: ["Zurich,CH", "Geneva,CH", "Basel,CH"],
  BE: ["Brussels,BE", "Antwerp,BE", "Ghent,BE"],
  AT: ["Vienna,AT", "Salzburg,AT", "Innsbruck,AT"],
  PT: ["Lisbon,PT", "Porto,PT", "Faro,PT"],
  NZ: ["Auckland,NZ", "Wellington,NZ", "Christchurch,NZ"],
  TH: ["Bangkok,TH", "Chiang Mai,TH", "Phuket,TH"],
  LV: ["Riga,LV", "Daugavpils,LV", "Liepāja,LV"],
};

const DEFAULT_COUNTRY = "LT";

const CityComparison: React.FC<CityComparisonProps> = ({
  hideTitle,
  currentCity,
}) => {
  const [citiesData, setCitiesData] = useState<CitiesData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<CurrentTime>({
    date: "",
    time: "",
  });
  const [selectedCountry, setSelectedCountry] =
    useState<string>(DEFAULT_COUNTRY);

  useEffect(() => {
    if (currentCity) {
      const countryCode = currentCity.split(",")[1]?.trim();
      if (countryCode && CITIES_BY_COUNTRY[countryCode]) {
        setSelectedCountry(countryCode);
      }
    }
  }, [currentCity]);

  const getCitiesToDisplay = (): string[] => {
    return (
      CITIES_BY_COUNTRY[selectedCountry] || CITIES_BY_COUNTRY[DEFAULT_COUNTRY]
    );
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      try {
        const API_KEY = "6PNY9WT9YSL482LUA525EZL8L";
        const citiesToFetch = getCitiesToDisplay();

        const requests = citiesToFetch.map((city) =>
          fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}&contentType=json`
          ).then((response) => response.json())
        );

        const responses = await Promise.all(requests);
        const data: CitiesData = {};
        responses.forEach((response, index) => {
          data[citiesToFetch[index]] = {
            temp: response.currentConditions.temp,
            conditions: response.currentConditions.conditions,
          };
        });

        setCitiesData(data);

        const now = new Date();
        setCurrentTime({
          date: now.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          time: now.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      } catch (error) {
        console.error("Error fetching cities data:", error);
        setError("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCountry]);

  const getWeatherIcon = (condition: string | undefined): string => {
    if (!condition) return "🌤";
    const conditions = condition.toLowerCase();
    if (conditions.includes("snow") || conditions.includes("flurries"))
      return "❄️";
    if (conditions.includes("rain")) return "🌧";
    if (conditions.includes("thunder") || conditions.includes("storm"))
      return "⚡️";
    if (conditions.includes("cloudy")) return "☁";
    if (conditions.includes("partly")) return "⛅";
    if (conditions.includes("clear") || conditions.includes("sunny"))
      return "☀";
    return "🌤";
  };

  if (loading) {
    return (
      <>
        <Title>Other largest cities</Title>
        <LoadingText>Loading cities data...</LoadingText>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Title>Other largest cities</Title>
        <LoadingText>{error}</LoadingText>
      </>
    );
  }

  return (
    <>
      {!hideTitle && <Title>Other largest cities</Title>}
      <Container>
        {getCitiesToDisplay().map((city) => {
          const cityName = city.split(",")[0];
          return (
            <CityCard key={city}>
              <CardContent>
                <CityInfo>
                  <CityName>{cityName}</CityName>
                  <DateText>{currentTime.date}</DateText>
                  <DateText>{currentTime.time}</DateText>
                </CityInfo>
                <WeatherInfo>
                  <WeatherIcon>
                    {getWeatherIcon(citiesData[city]?.conditions)}
                  </WeatherIcon>
                  <Temperature>
                    {Math.round(citiesData[city]?.temp || 0)}°
                  </Temperature>
                </WeatherInfo>
              </CardContent>
            </CityCard>
          );
        })}
      </Container>
    </>
  );
};

export default CityComparison;
