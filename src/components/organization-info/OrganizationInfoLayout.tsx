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
    <div className="p-6 space-y-6 bg-background h-full overflow-hidden">
      <header className="p-6 border-b -mx-6 -mt-6 mb-6">
        <h1 className="text-2xl font-semibold">
          {t("organizationInfo") || "Organization Info"}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t("organizationInfoDescription") ||
            "Manage your organization's profile and information"}
        </p>
      </header>

      <div className="overflow-auto h-[calc(100%-120px)]">
        <Tabs
          defaultValue="general"
          className="space-y-4"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <TabsList className="grid grid-cols-4 w-full max-w-3xl">
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

          <TabsContent value="general" className="space-y-4">
            <OrganizationGeneralInfo />
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <OrganizationContactInfo />
          </TabsContent>

          <TabsContent value="structure" className="space-y-4">
            <OrganizationStructure />
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <OrganizationDocuments />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
