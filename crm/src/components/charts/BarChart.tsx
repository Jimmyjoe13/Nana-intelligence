"use client";

import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface DataPoint {
  name: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
  height?: number | string;
}

export function BarChart({ data, height = 300 }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height as number}>
      <RechartsBarChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        barGap={4}
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
          cursor={{ fill: "rgba(26, 26, 26, 0.05)" }}
          contentStyle={{
            backgroundColor: "#f4f1ea",
            border: "1.5px solid #1a1a1a",
            borderRadius: 0,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
          }}
        />
        <Bar dataKey="value">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === data.length - 1 ? "#ff5b22" : "#1a1a1a"}
            />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
