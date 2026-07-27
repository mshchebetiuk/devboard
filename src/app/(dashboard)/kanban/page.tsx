import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { projects, tasks } from '@/data/mockData';

export default function KanbanPage() {
    return (
        <section>
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Kanban Board
                </h2>

                <p className="mt-2 text-gray-500">
                    Track tasks through each stage of development.
                </p>
            </div>

            <KanbanBoard 
                tasks={tasks}
                projects={projects}
            />
        </section>
    )
}