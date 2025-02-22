import React from "react";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function MainLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { language } = useLanguage();

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className={cn(
        "min-h-screen bg-background overflow-hidden flex",
        className,
      )}
    >
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
