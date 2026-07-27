import { TasksList } from '@/components/tasks/TasksList';
import { projects, tasks } from '@/data/mockData';

export default function TasksPage() {
    return (
        <section>
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Tasks
                </h2>

                <p className="mt-2 text-gray-500">
                    Manage and track tasks across your projects.
                </p>
            </div>

            <TasksList 
                tasks={tasks}
                projects={projects}
            />
        </section>
    )
}