"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface RingProps {
  value: number; // 0 to 100
  label?: string;
  size?: number;
}

export function Ring({ value, label, size = 200 }: RingProps) {
  const data = [
    { name: "Value", value: value },
    { name: "Remainder", value: 100 - value },
  ];

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="90%"
            paddingAngle={0}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            <Cell fill="#ff5b22" />
            <Cell fill="rgba(26, 26, 26, 0.15)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-[32px] font-medium leading-none text-ink">
          {value}%
        </span>
        {label && (
          <span className="font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-ink-3 mt-1">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
