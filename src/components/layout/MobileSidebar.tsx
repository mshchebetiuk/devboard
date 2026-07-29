'use client';

import Link from 'next/link';

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Projects', href: '/projects' },
    { name: 'Tasks', href: '/tasks' },
    { name: 'Kanban', href: '/kanban' },
    { name: 'Team', href: '/team' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Settings', href: '/settings' },
];

export const MobileSidebar = ({
    isOpen, 
    onClose,
}: MobileSidebarProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            <button
                type='button'
                aria-label='Close navigation'
                onClick={onClose}
                className='absolute inset-0 bg-black/40'
            />

            <aside className="relative h-full w-72 border-r border-gray-200 bg-white p-6 shadow-xl dark:broder-gray-800 dark:bg-gray-900">
                <div className="flex items-center justify-between">
                    <Link
                        href='/dashboard'
                        onClick={onClose}
                        className='text-2xl font-bold text-gray-900 dark:text-white'
                    >
                        DevBoard
                    </Link>

                    <button 
                        type="button" 
                        onClick={onClose}
                        aria-label='Close sidebar'
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                        ✕
                    </button>
                </div>

                <nav className="mt-8">
                    <ul className="space-y-2">
                        {navigation.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className='block rounded-lg px-3 py-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </div>
    );
};