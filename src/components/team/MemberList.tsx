import { MemberCard } from "./MemberCard";
import type { User } from '@/types/user';

interface MemberListProps {
    users: User[];
}

export const MemberList = ({
    users,
}: MemberListProps) => {
    if (users.length === 0) {
        return (
            <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-800 dark:bg-gray-950">
                <h3 className="font-semibold text-gray-500 dark:text-gray-200">
                    No team members
                </h3>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Your team members will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {users.map((user) => (
                <MemberCard 
                    key={user.id}
                    user={user}
                />
            ))}
        </div>
    );
};