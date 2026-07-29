'use client';

import { useMemo, useState } from 'react';

import { ProjectCard } from '@/components/projects/ProjectCard';
import type { Project } from '@/types/project';
import { EmptyState } from '../ui/EmptyState';

interface ProjectsListProps {
    projects: Project[];
}

export const ProjectsList = ({
    projects,
}: ProjectsListProps) => {
    const [search, setSearch] = useState('');

    const filteredProjects = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return projects;

        return projects.filter((project) => 
            project.name.toLowerCase().includes(query)
        );
    }, [projects, search]);

    return (
        <div className="mt-8">
            <div className="mb-6">
                <label 
                    htmlFor="project-search"
                    className='sr-only'
                >
                    Search projects
                </label>

                <input 
                    id="project-search" 
                    type="search" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search projects...'
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 sm:max-w-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300" 
                />
            </div>

            {filteredProjects.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredProjects.map((project) => (
                        <ProjectCard 
                            key={project.id}
                            project={project}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState 
                    title='No projects found'
                    description='Try searching for another project.'
                />
            )}
        </div>
    );
};
