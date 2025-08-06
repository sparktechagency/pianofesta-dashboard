/* eslint-disable no-unused-vars */
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Area_Chart = ({ chartData }) => {
  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value) => Math.floor(value);

  // Custom tick style
  const tickStyle = { fill: "#222222" };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="monthName"
            tick={{ ...tickStyle }}
            tickMargin={6}
            interval={0}
            tickFormatter={(month) => month.substring(0, 3)} // Show first 3 letters
          />
          <YAxis
            domain={[1, "dataMax"]} // Start from 1, go up to max value in your data
            allowDecimals={false} // Only whole numbers
            tick={{ ...tickStyle }}
            tickMargin={16}
            axisLine={{
              stroke: "#02294000",
              strokeWidth: 2,
              strokeDasharray: "7 7",
            }}
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6A0DAD" stopOpacity={1} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Tooltip
            formatter={(value, name, props) => [`${value}`, "count"]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke=""
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Area_Chart;
