"use client";

import React from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
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

interface AreaChartProps {
  data: DataPoint[];
  height?: number | string;
}

export function AreaChart({ data, height = 300 }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height as number}>
      <RechartsAreaChart
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
        <Area
          type="monotone"
          dataKey="value"
          stroke="#ff5b22"
          strokeWidth={1.8}
          fill="#ff5b22"
          fillOpacity={0.12}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
