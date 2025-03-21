import React from "react";
import { Card } from "../ui/card";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArchiveStats } from "./ArchiveStats";
import { StorageAddressManager } from "./StorageAddressManager";
import { StorageAddressList } from "./StorageAddressList";

export function ArchiveLayout() {
  const { t } = useLanguage();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="p-6 border-b flex-shrink-0">
        <h1 className="text-2xl font-semibold">{t("archiveStorage")}</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <ArchiveStats />
        <StorageAddressManager />
        <StorageAddressList />
      </div>
    </div>
  );
}
