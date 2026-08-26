import { prisma } from "@/lib/prisma";
import type { TeamMemberDto } from "@/types/dto";
import { mapUserToTeamMemberDto } from "@/lib/mappers/team";

export const getTeamMembers = async (): Promise<TeamMemberDto[]> => {
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

  return users.map(mapUserToTeamMemberDto);
};
