import React from "react";
import { Card } from "../ui/card";
import { Building2, BoxIcon, Archive, Files } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const stats = [
  {
    name: "totalLocations",
    value: "12",
    icon: Building2,
    change: "+2 this month",
  },
  {
    name: "totalStores",
    value: "48",
    icon: BoxIcon,
    change: "+5 this month",
  },
  {
    name: "totalStorageUnits",
    value: "240",
    icon: Archive,
    change: "+15 this month",
  },
  {
    name: "totalDocuments",
    value: "1,234",
    icon: Files,
    change: "+123 this month",
  },
];

export function ArchiveStats() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.name} className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t(stat.name)}
              </p>
              <h3 className="text-2xl font-bold mt-2 text-foreground">
                {stat.value}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </div>
            <stat.icon className="h-5 w-5 text-primary" />
          </div>
        </Card>
      ))}
    </div>
  );
}
