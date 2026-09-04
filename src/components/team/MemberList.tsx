import { MemberCard } from "./MemberCard";
import type { User } from "@/types/user";

interface MemberListProps {
  users: User[];
}

export const MemberList = ({ users }: MemberListProps) => {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {users.map((user) => (
        <MemberCard key={user.id} user={user} />
      ))}
    </div>
  );
};
