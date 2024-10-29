import React from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Area,
} from "recharts";

const ChartContainer = styled.div`
  background: linear-gradient(
    135deg,
    rgba(30, 33, 48, 0.3) 0%,
    rgba(44, 62, 80, 0.2) 100%
  );
  backdrop-filter: blur(100px);
  border-radius: 25px;
  padding: 10px 20px 10px 20px;
  color: white;
  width: 100%;
  box-sizing: border-box;
  height: 335px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Added drop shadow
`;

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          padding: "8px",
          borderRadius: "4px",
          color: "#1e2130",
        }}
      >
        <p>{`${payload[0].value.toFixed(1)}°`}</p>
      </div>
    );
  }
  return null;
};

const TemperatureChart = ({ forecast }) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date();

  // Format data for Recharts
  const data = forecast.map((day, index) => ({
    day: weekDays[(currentDate.getDay() + index) % 7],
    temperature: day.main.temp,
  }));

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
          options={options}
          height="100%"
        >
          <defs>
            <linearGradient
              id="temperatureGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#4a90e2" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#4a90e2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="day" stroke="#8e9eab" tick={{ fill: "#8e9eab" }} />
          <YAxis
            stroke="#8e9eab"
            tick={{ fill: "#8e9eab" }}
            unit="°"
            domain={["dataMin - 1", "dataMax + 1"]}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "rgba(255,255,255,0.2)" }}
          />
          <Area
            type="natural"
            dataKey="temperature"
            stroke="none"
            fill="#4a90e2"
            fillOpacity={0.2}
            baseLine={0}
          />
          <Line
            type="natural"
            dataKey="temperature"
            stroke="#4a90e2"
            strokeWidth={3}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TemperatureChart;
