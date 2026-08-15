import { MemberList } from "@/components/team/MemberList";
import { prisma } from "@/lib/prisma";
import type { User } from "@/types/user";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function TeamPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isOnline: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const teamMembers: User[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.isOnline ? "online" : "offline",
    initials: user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
  }));

  const onlineMembers = teamMembers.filter(
    (user) => user.status === "online",
  ).length;

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
            Team
          </h2>

          <p className="mt-2 text-gray-500 dark:text-gray-200">
            Manage the people working on your projects.
          </p>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-200">
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
