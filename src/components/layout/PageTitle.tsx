"use client";

import { usePathname } from "next/navigation";

import { navigation } from "@/constants/navigation";

export const PageTitle = () => {
  const pathname = usePathname();

  const currentItem = navigation.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  return (
    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
      {currentItem?.name ?? "DevBoard"}
    </h1>
  );
};
