import { CreateTaskForm } from '@/components/tasks/CreateTaskForm';
import { TasksList } from '@/components/tasks/TasksList';
import { prisma } from '@/lib/prisma';

export default async function TasksPage() {
    const [tasks, projects] = await Promise.all([
        await prisma.task.findMany({
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
        }),  

        prisma.project.findMany({
            select: {
                id: true,
                name: true,
            },

            orderBy: {
                name: 'asc',
            },
        }),
    ]);

    const serializedTasks = tasks.map((task) => ({
        ...task,
        dueDate: task.dueDate?.toISOString() ?? null,
    }));

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
                <CreateTaskForm projects={projects} />
            </div>

            <div className="mt-8">
                <TasksList tasks={serializedTasks} />
            </div>
        </section>
    );
}