import { MemberList } from "@/components/team/MemberList";
import { EmptyState } from "@/components/ui/EmptyState";
import { getTeamMembers } from "@/services/team";

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  const onlineMembers = teamMembers.filter(
    (user) => user.status === "online",
  ).length;

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Team
          </h2>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Manage the people working on your projects.
          </p>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          {onlineMembers} of {teamMembers.length} online
        </div>
      </div>

      {teamMembers.length === 0 ? (
        <EmptyState
          title="No team members"
          description="Team members will appear here."
        />
      ) : (
        <MemberList users={teamMembers} />
      )}
    </section>
  );
}
