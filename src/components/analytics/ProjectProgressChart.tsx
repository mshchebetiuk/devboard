"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { Project } from "@/types/project";

interface ProjectProgressChartProps {
  projects: Project[];
}

export const ProjectProgressChart = ({
  projects,
}: ProjectProgressChartProps) => {
  const data = projects.map((project) => ({
    name: project.name,
    progress: project.progress,
  }));

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-gray-900 dark:border-gray-800">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Project Performance
      </h2>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              stroke="#6b7280"
              strokeOpacity={0.25}
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#9ca3af",
                fontSize: 12,
              }}
            />

            <YAxis
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#9ca3af",
                fontSize: 12,
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #374151",
                backgroundColor: "#111827",
                color: "#f3f4f6",
              }}
              itemStyle={{
                color: "#f3f4f6",
              }}
              labelStyle={{
                color: "#f3f4f6",
              }}
            />

            <Bar dataKey="progress" fill="#9ca3af" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
