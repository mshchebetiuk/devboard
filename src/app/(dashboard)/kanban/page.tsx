import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { prisma } from '@/lib/prisma';

export default async function KanbanPage() {
    const tasks = await prisma.task.findMany({
        select: {
            id: true,
            title: true,
            status: true,
            priority: true,

            project: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },

        orderBy: {
            createdAt: 'asc',
        },
    });

    return (
        <section>
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                    Kanban Board
                </h2>

                <p className="mt-2 text-gray-500 dark:text-gray-300">
                    Organize tasks across your workflow.
                </p>
            </div>

            <div className="mt-8">
                <KanbanBoard initialTasks={tasks} />
            </div>
        </section>
    )
}