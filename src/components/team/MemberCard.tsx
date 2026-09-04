import type { User } from "@/types/user";

interface MemberCardProps {
  user: User;
}

const roleLabels = {
  OWNER: "Owner",
  DEVELOPER: "Developer",
  DESIGNER: "Designer",
};

const statusStyles = {
  online: "bg-green-500",
  offline: "bg-gray-300 dark:bg-gray-600",
};

export const MemberCard = ({ user }: MemberCardProps) => {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 font-semibold text-white dark:bg-gray-100 dark:text-gray-900">
            {user.initials}
          </div>

          <span
            className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-900 ${statusStyles[user.status]}`}
            aria-label={user.status}
          />
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {user.name}
          </h3>

          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-200">
          {roleLabels[user.role]}
        </span>

        <span className="text-xs capitalize text-gray-500 dark:text-gray-400">
          {user.status}
        </span>
      </div>
    </article>
  );
};
