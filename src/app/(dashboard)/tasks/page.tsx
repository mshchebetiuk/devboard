import { TasksList } from '@/components/tasks/TasksList';
import { prisma } from '@/lib/prisma';

export default async function TasksPage() {
    const tasks = await prisma.task.findMany({
        select: {
            id: true,
            title: true,
            status: true,
            priority: true,
            dueDate: true,

            project: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },

        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <section>
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                    Tasks
                </h2>

                <p className="mt-2 text-gray-500 dark:text-gray-300">
                    Manage and track tasks across your projects.
                </p>
            </div>

            <div className="mt-8">
                <TasksList tasks={tasks} />
            </div>
        </section>
    );
}