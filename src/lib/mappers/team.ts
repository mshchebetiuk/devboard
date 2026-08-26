import type { TeamMemberDto } from "@/types/dto";

interface UserRow {
  id: number;
  name: string;
  email: string;
  role: TeamMemberDto["role"];
  isOnline: boolean;
}

export const mapUserToTeamMemberDto = (user: UserRow): TeamMemberDto => ({
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
});
