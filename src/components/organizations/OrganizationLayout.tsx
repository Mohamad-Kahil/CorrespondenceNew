import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { OrganizationTable } from "./OrganizationTable";
import { OrganizationProfile } from "./OrganizationProfile";

export function OrganizationLayout() {
  const { t } = useLanguage();
  const [selectedOrganizationId, setSelectedOrganizationId] = React.useState<
    string | null
  >(null);

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      dir={t("direction")}
    >
      <header className="p-6 border-b flex-shrink-0">
        <h1 className="text-2xl font-semibold">
          {t("organizations") || "Organizations"}
        </h1>
      </header>

      <div className="flex-1 overflow-hidden p-6">
        {selectedOrganizationId ? (
          <div className="h-full flex flex-col">
            <button
              onClick={() => setSelectedOrganizationId(null)}
              className="text-primary hover:underline flex items-center gap-1 flex-shrink-0 mb-4"
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
              {t("organizationDirectory") || "Organization List"}
            </button>
            <div className="flex-1 overflow-y-auto">
              <OrganizationProfile organizationId={selectedOrganizationId} />
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <OrganizationTable
              onSelectOrganization={setSelectedOrganizationId}
            />
          </div>
        )}
      </div>
    </div>
  );
}
