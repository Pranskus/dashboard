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
  height: 330px;
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
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4a90e2" stopOpacity={0.8} />
              <stop offset="50%" stopColor="#64b5f6" stopOpacity={1} />
              <stop offset="100%" stopColor="#4a90e2" stopOpacity={0.8} />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

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
            fill="url(#temperatureGradient)"
            fillOpacity={0.2}
            baseLine={0}
          />
          <Line
            type="natural"
            dataKey="temperature"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
              fill: "#64b5f6",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            filter="url(#glow)"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TemperatureChart;
