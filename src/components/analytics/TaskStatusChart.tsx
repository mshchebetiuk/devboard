"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface TaskStats {
  todo: number;
  inProgress: number;
  done: number;
  total: number;
}

interface TaskStatusChartProps {
  stats: TaskStats;
}

const COLORS = ["#d1d5db", "#f59e0b", "#22c55e"];

export const TaskStatusChart = ({ stats }: TaskStatusChartProps) => {
  const data = [
    {
      name: "Todo",
      value: stats.todo,
    },
    {
      name: "In Progress",
      value: stats.inProgress,
    },
    {
      name: "Done",
      value: stats.done,
    },
  ];

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-gray-950 dark:border-gray-800">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
        Task Distribution
      </h2>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
            >
              {data.map((item, index) => (
                <Cell key={item.name} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
