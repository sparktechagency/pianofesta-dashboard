import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

const Bar_Chart = ({ chartData = [] }) => {
  // Formatter function to add 'K' suffix to Y-axis values
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md p-2 rounded-md border border-gray-300">
          <p className="text-sm font-semibold text-gray-800">
            {payload[0]?.payload?.monthName}
          </p>
          <p className="text-xs text-gray-600">
            Total Income:{" "}
            <span className="font-semibold">
              ${payload[0]?.payload?.totalRevenue}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const maxRevenue = Math.max(...chartData.map((d) => d.totalRevenue));
  const interval = 100;
  const referenceLines = [];

  for (let i = interval; i <= maxRevenue + interval; i += interval) {
    referenceLines.push(i);
  }

  // Custom tick style

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          barCategoryGap={30}
        >
          <RechartsTooltip content={<CustomTooltip />} />
          <XAxis
            dataKey="monthName"
            tick={{ fill: "#222222" }}
            tickMargin={6}
          />
          <YAxis
            tick={{ fill: "#222222" }}
            axisLine={{
              stroke: "#0861C500",
              strokeWidth: 2,
              strokeDasharray: "7 7",
            }}
            tickMargin={16}
          />

          {/* Dynamic Reference Lines */}
          {referenceLines.map((value) => (
            <ReferenceLine key={value} y={value} stroke="#E5E5EF" />
          ))}

          <Bar
            dataKey="totalRevenue"
            fill="url(#incomeGradient)"
            barSize={20}
            radius={[10, 10, 10, 10]}
          />
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6A0DAD" />
              <stop offset="100%" stopColor="#8F59F9" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bar_Chart;
