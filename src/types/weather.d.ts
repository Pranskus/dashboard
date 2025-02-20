export interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  name?: string;
  sunrise?: string;
  sunset?: string;
  moonphase?: number;
  uvindex?: number;
  dt_txt?: string;
  dt?: number;
}

export interface CityData {
  name: string;
  weather: string;
  temp: number;
}

export interface CityLocation {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface WeatherForecastProps {
  currentWeather: WeatherData | null;
  forecast: WeatherData[];
  onDaySelect: (index: number) => void;
}
