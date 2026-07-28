'use client';

import { 
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import type { Project } from '@/types/project';

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
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-gray-950 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                Project Performance
            </h2>

            <div className="mt-6 h-72">
                <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={data}>
                        <CartesianGrid 
                            strokeDasharray='3 3'
                            vertical={false}
                        />

                        <XAxis 
                            dataKey='name'
                            tickLine={false}
                        />

                        <YAxis 
                            domain={[0, 100]}
                            tickLine={false}
                        />

                        <Tooltip />

                        <Bar 
                            dataKey='progress'
                            fill='#111827'
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};