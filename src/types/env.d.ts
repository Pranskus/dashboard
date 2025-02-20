declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_OPENWEATHERMAP_API_KEY: string;
    NODE_ENV: "development" | "production" | "test";
    // Add other environment variables here
  }
}
