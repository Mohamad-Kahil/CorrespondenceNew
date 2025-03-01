import React from "react";
import { Card } from "../ui/card";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArchiveStats } from "./ArchiveStats";
import { StorageAddressManager } from "./StorageAddressManager";
import { StorageAddressList } from "./StorageAddressList";

export function ArchiveLayout() {
  const { t } = useLanguage();

  return (
    <div className="p-6 space-y-6">
      <header className="p-6 border-b -mx-6 -mt-6 mb-6">
        <h1 className="text-2xl font-semibold">{t("archiveStorage")}</h1>
      </header>

      <ArchiveStats />
      <StorageAddressManager />
      <StorageAddressList />
    </div>
  );
}
