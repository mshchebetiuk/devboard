import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { getKanbanTasks } from "@/services/kanban";

export const dynamic = "force-dynamic";

export default async function KanbanPage() {
  const tasks = await getKanbanTasks();

  return (
    <section>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Kanban Board
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Organize tasks across your workflow.
        </p>
      </div>

      <div className="mt-8">
        <KanbanBoard initialTasks={tasks} />
      </div>
    </section>
  );
}
