"use client";

import { useTheme } from "@/context/ThemeContext";

export const AppearanceSettings = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between gap-6">
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white">
            Dark Mode
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Switch between light and dark appearance.
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={isDark}
          onClick={toggleTheme}
          className={`relative h-7 w-12 rounded-full transition ${
            isDark ? "bg-white" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full transition-all ${
              isDark ? "left-6 bg-gray-900" : "left-1 bg-white"
            }`}
          />
        </button>
      </div>
    </section>
  );
};
