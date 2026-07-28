import type { Project } from '@/types/project';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                    {project.name}
                </h3>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                    {project.description}
                </p>
            </div>

            <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Progress
                    </span>

                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-300">
                        {project.progress}%
                    </span>
                </div>

                <div
                    className='h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800'
                    role='progressbar'
                    aria-label={`${project.name} progress`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={project.progress}
                >
                    <div 
                        className="h-full rounded-full bg-gray-900 transition-all dark:bg-gray-500" 
                        style={{ width: `${project.progress}%`}}    
                    />
                </div>
            </div>
        </article>
    );
};