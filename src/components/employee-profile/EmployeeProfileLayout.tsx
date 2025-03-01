import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { EmployeeTable } from "./EmployeeTable";
import { EmployeeProfile } from "./EmployeeProfile";

export function EmployeeProfileLayout() {
  const { t } = useLanguage();
  const [selectedEmployeeId, setSelectedEmployeeId] = React.useState<
    string | null
  >(null);

  return (
    <div className="p-6 space-y-6" dir={t("direction")}>
      <header className="p-6 border-b -mx-6 -mt-6 mb-6">
        <h1 className="text-2xl font-semibold">
          {t("employeeProfiles") || "Employee Profiles"}
        </h1>
      </header>

      {selectedEmployeeId ? (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedEmployeeId(null)}
            className="text-primary hover:underline flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t("back") || "Back"} {t("to") || "to"}{" "}
            {t("employeeDirectory") || "Employee List"}
          </button>
          <EmployeeProfile employeeId={selectedEmployeeId} />
        </div>
      ) : (
        <EmployeeTable onSelectEmployee={setSelectedEmployeeId} />
      )}
    </div>
  );
}
