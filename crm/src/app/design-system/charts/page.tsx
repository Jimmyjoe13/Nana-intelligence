"use client";

import { LineChart } from "@/components/charts/LineChart";
import { AreaChart } from "@/components/charts/AreaChart";
import { BarChart } from "@/components/charts/BarChart";
import { Ring } from "@/components/charts/Ring";
import { Box } from "@/components/ui/Box";

const dummyData = [
  { name: "01/05", value: 12 },
  { name: "05/05", value: 18 },
  { name: "10/05", value: 15 },
  { name: "15/05", value: 25 },
  { name: "20/05", value: 20 },
  { name: "25/05", value: 30 },
  { name: "30/05", value: 28 },
];

export default function ChartsPage() {
  return (
    <div className="flex flex-col gap-20 p-10 bg-cream min-h-screen">
      <h1 className="font-display text-[44px] font-medium leading-none text-ink border-b border-ink pb-4">
        Charts Design System
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="flex flex-col gap-6">
          <h2 className="font-mono text-[12px] uppercase text-ink-4">
            01. Line Chart
          </h2>
          <Box>
            <LineChart data={dummyData} />
          </Box>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-mono text-[12px] uppercase text-ink-4">
            02. Area Chart
          </h2>
          <Box>
            <AreaChart data={dummyData} />
          </Box>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-mono text-[12px] uppercase text-ink-4">
            03. Bar Chart
          </h2>
          <Box>
            <BarChart data={dummyData} />
          </Box>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-mono text-[12px] uppercase text-ink-4">
            04. Ring (Donut)
          </h2>
          <div className="flex gap-8">
            <Box className="flex-1 flex justify-center py-10">
              <Ring value={75} label="Ouverture" />
            </Box>
            <Box className="flex-1 flex justify-center py-10">
              <Ring value={12.4} label="Réponse" />
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
}
