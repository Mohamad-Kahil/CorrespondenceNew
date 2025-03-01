import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { OrganizationalChart } from "./OrganizationalChart";
import { EmployeeTable } from "./EmployeeTable";
import { AuthorizationMatrix } from "./AuthorizationMatrix";

export function SystemAccessLayout() {
  const { t, language } = useLanguage();

  return (
    <div className="p-6 space-y-6">
      <header className="p-6 border-b -mx-6 -mt-6 mb-6">
        <h1 className="text-2xl font-semibold">{t("systemAccess")}</h1>
      </header>

      <Tabs
        defaultValue="org-chart"
        className="space-y-4"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <TabsList>
          <TabsTrigger value="org-chart">
            {t("organizationalChart")}
          </TabsTrigger>
          <TabsTrigger value="employees">{t("employeeSecurity")}</TabsTrigger>
          <TabsTrigger value="authorization">{t("authorization")}</TabsTrigger>
        </TabsList>

        <TabsContent value="org-chart" className="space-y-4">
          <OrganizationalChart />
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          <EmployeeTable />
        </TabsContent>

        <TabsContent value="authorization" className="space-y-4">
          <AuthorizationMatrix />
        </TabsContent>
      </Tabs>
    </div>
  );
}
