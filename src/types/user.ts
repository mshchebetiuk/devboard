export type UserRole = 'owner' | 'developer' | 'designer';
export type UserStatus = 'online' | 'offline';

export interface User {
    readonly id: number;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    initials: string;
}

