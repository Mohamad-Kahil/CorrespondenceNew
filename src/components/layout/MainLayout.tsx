import React from "react";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

export function MainLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-screen bg-background overflow-hidden",
        className,
      )}
    >
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
