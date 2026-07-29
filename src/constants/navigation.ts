export interface NavigationItem {
    name: string;
    href: string;
}

export const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Projects', href: '/projects' },
    { name: 'Tasks', href: '/tasks' },
    { name: 'Kanban', href: '/kanban' },
    { name: 'Team', href: '/team' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Settings', href: '/settings' },
];