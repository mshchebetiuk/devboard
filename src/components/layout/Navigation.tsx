'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigation } from '@/constants/navigation';

interface NavigationProps {
    onNavigate?: () => void;
}

export const Navigation = ({
    onNavigate,
}: NavigationProps) => {
    const pathname = usePathname();

    return (
        <nav aria-label='Main navigation'>
            <ul className="space-y-2">
                {navigation.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);

                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={onNavigate}
                                aria-current={isActive ? 'page' : undefined}
                                className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                                    isActive 
                                        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                                }`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};