"use client";

import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  name: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  height?: number | string;
}

const CustomDot = (props: { cx?: number; cy?: number; index?: number; data: DataPoint[] }) => {
  const { cx, cy, index, data } = props;
  if (index === data.length - 1 && cx !== undefined && cy !== undefined) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        stroke="#1a1a1a"
        strokeWidth={1.2}
        fill="#ff5b22"
      />
    );
  }
  return null;
};

export function LineChart({ data, height = 300 }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height as number}>
      <RechartsLineChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="2 4"
          stroke="#1a1a1a"
          vertical={false}
          strokeOpacity={0.08}
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "#6b6660",
            fontSize: 11,
            fontFamily: "var(--font-mono)",
          }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "#6b6660",
            fontSize: 11,
            fontFamily: "var(--font-mono)",
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#f4f1ea",
            border: "1.5px solid #1a1a1a",
            borderRadius: 0,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#1a1a1a"
          strokeWidth={1.8}
          dot={<CustomDot data={data} />}
          activeDot={{ r: 6, stroke: "#1a1a1a", strokeWidth: 1.5, fill: "#ff5b22" }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
