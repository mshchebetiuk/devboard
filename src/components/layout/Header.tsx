import { PageTitle } from "./PageTitle";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 lg:hidden"
        >
          <span className="m-1 block h-0.5 w-5 bg-current" />
          <span className="m-1 block h-0.5 w-5 bg-current" />
          <span className="m-1 block h-0.5 w-5 bg-current" />
        </button>

        <PageTitle />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-medium text-white dark:bg-white dark:text-gray-900">
          MS
        </div>

        <span className="hidden font-medium text-gray-700 dark:text-gray-300 sm:block">
          Maksym
        </span>
      </div>
    </header>
  );
};
