import Link from 'next/link';

import { ProjectCard } from '@/components/projects/ProjectCard';
import type { Project } from '@/types/project';

interface RecentProjectsProps {
    projects: Project[];
}

export const RecentProjects = ({
    projects,
}: RecentProjectsProps) => {
    return (
        <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
                        Recent Projects
                    </h2>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        Track the progress of your projects.
                    </p>
                </div>

                <Link
                    href='/projects'
                    className='text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-600'
                >
                    View all
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCard 
                        key={project.id}
                        project={project}
                    />
                ))}
            </div>
        </section>
    );
};