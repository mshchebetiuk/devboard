import Link from 'next/link';

const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Projects', href: '/projects' },
    { name: 'Tasks', href: '/tasks' },
    { name: 'Kanban', href: '/kanban' },
    { name: 'Team', href: '/team'},
    { name: 'Analytics', href: '/analytics' },
    { name: 'Settings', href: '/settings'},
];

export const Sidebar = () => {
    return (
        <aside className="hidden min-h-screen w-64 border-r border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 lg:block">
            <Link href='/dashboard' className='text-2xl font-bold dark:text-gray-200'>
                DevBoard
            </Link>

            <nav className="mt-8">
                <ul className="space-y-2">
                    {navigation.map((item) => (
                        <li key={item.href}>
                            <Link 
                                href={item.href}
                                className='block rounded-lg px-3 py-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-400'
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};