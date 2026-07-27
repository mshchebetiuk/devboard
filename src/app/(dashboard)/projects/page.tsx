import { ProjectsList } from '@/components/projects/ProjectsList';
import { projects } from '@/data/mockData';

export default function ProjectsPage() {
    return (
        <section>
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Projects
                </h2>

                <p className="mt-2 text-gray-500">
                    Manage and track all your projects.
                </p>
            </div>

            <ProjectsList projects={projects} />
        </section>
    );
}