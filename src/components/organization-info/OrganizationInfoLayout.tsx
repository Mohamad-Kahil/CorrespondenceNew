import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { OrganizationGeneralInfo } from "./OrganizationGeneralInfo";
import { OrganizationContactInfo } from "./OrganizationContactInfo";
import { OrganizationStructure } from "./OrganizationStructure";
import { OrganizationDocuments } from "./OrganizationDocuments";

export function OrganizationInfoLayout() {
  const { t, language } = useLanguage();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <header className="p-6 border-b flex-shrink-0">
        <h1 className="text-2xl font-semibold">
          {t("organizationInformation") || "Organization Information"}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t("organizationInfoDescription") ||
            "Manage your organization's profile and information"}
        </p>
      </header>

      <div className="flex-1 overflow-hidden p-6 pt-0">
        <Tabs
          defaultValue="general"
          className="h-full flex flex-col"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <TabsList className="grid grid-cols-4 w-full max-w-3xl flex-shrink-0 mb-4">
            <TabsTrigger value="general">
              {t("generalInfo") || "General Info"}
            </TabsTrigger>
            <TabsTrigger value="contact">
              {t("contactInfo") || "Contact Info"}
            </TabsTrigger>
            <TabsTrigger value="structure">
              {t("structure") || "Structure"}
            </TabsTrigger>
            <TabsTrigger value="documents">
              {t("documents") || "Documents"}
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <div className="overflow-y-auto h-full">
              <TabsContent value="general" className="space-y-4 min-h-full">
                <OrganizationGeneralInfo />
              </TabsContent>

              <TabsContent value="contact" className="space-y-4 min-h-full">
                <OrganizationContactInfo />
              </TabsContent>

              <TabsContent value="structure" className="space-y-4 min-h-full">
                <OrganizationStructure />
              </TabsContent>

              <TabsContent value="documents" className="space-y-4 min-h-full">
                <OrganizationDocuments />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
