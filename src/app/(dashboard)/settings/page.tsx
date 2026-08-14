import { AppearanceSettings } from "@/components/settings/AppearanceSettings";

export default function SettingsPage() {
  return (
    <section>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Manage your workspace preferences.
        </p>
      </div>

      <div className="mt-8">
        <AppearanceSettings />
      </div>
    </section>
  );
}
