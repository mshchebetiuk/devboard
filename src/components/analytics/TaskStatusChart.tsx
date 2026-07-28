'use client';

import { 
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

import type { Task } from '@/types/task';

interface TaskStatusChartProps {
    tasks: Task[];
}

const COLORS = ['#d1d5db', '#f59e0b', '#22c55e'];

export const TaskStatusChart = ({
    tasks,
}: TaskStatusChartProps) => {
    const data = [
        {
            name: 'Todo',
            value: tasks.filter(
                (task) => task.status === 'todo'
            ).length,
        },
        {
            name: 'In Progress',
            value: tasks.filter(
                (task) => task.status === 'in-progress'
            ).length,
        },
        {
            name: 'Done',
            value: tasks.filter(
                (task) => task.status === 'done'
            ).length,
        },
    ];

    return (
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
                Task Distribution
            </h2>

            <div className="mt-6 h-72">
                <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey='value'
                            nameKey='name'
                            cx='50%'
                            cy='50%'
                            innerRadius={55}
                            outerRadius={90}
                            paddingAngle={3}
                        >
                            {data.map((item, index) => (
                                <Cell 
                                    key={item.name}
                                    fill={COLORS[index]}
                                />
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