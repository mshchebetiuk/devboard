import { MemberCard } from "./MemberCard";
import type { User } from "@/types/user";
import { EmptyState } from "../ui/EmptyState";

interface MemberListProps {
  users: User[];
}

export const MemberList = ({ users }: MemberListProps) => {
  if (users.length === 0) {
    return (
      <EmptyState
        title="No team members"
        description="Your team members will appear here."
      />
    );
  }

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {users.map((user) => (
        <MemberCard key={user.id} user={user} />
      ))}
    </div>
  );
};
