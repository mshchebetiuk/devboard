import { MemberList } from '@/components/team/MemberList';
import { users } from '@/data/mockData';

export default function TeamPage() {
    const onlineMembers = users.filter(
        (user) => user.status === 'online'
    ).length;

    return (
        <section>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Team
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Manage the people working on your projects.
                    </p>
                </div>

                <div className="text-sm text-gray-500">
                    {onlineMembers} of {users.length} online
                </div>
            </div>

            <MemberList users={users} />
        </section>
    );
}