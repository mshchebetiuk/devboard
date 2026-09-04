import Link from "next/link";

import { Navigation } from "./Navigation";

export const Sidebar = () => {
  return (
    <aside className="hidden min-h-screen w-64 border-r border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 lg:block">
      <Link
        href="/dashboard"
        className="text-2xl font-bold text-gray-900 dark:text-gray-100"
      >
        DevBoard
      </Link>

      <nav className="mt-8">
        <Navigation />
      </nav>
    </aside>
  );
};
