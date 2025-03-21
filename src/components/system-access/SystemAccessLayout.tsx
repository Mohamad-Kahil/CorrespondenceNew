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
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <header className="p-6 border-b flex-shrink-0">
        <h1 className="text-2xl font-semibold">{t("systemAccess")}</h1>
      </header>

      <div className="flex-1 overflow-hidden p-6 pt-0">
        <Tabs
          defaultValue="org-chart"
          className="h-full flex flex-col"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <TabsList className="flex-shrink-0 mb-4">
            <TabsTrigger value="org-chart">
              {t("organizationalChart")}
            </TabsTrigger>
            <TabsTrigger value="employees">{t("employeeSecurity")}</TabsTrigger>
            <TabsTrigger value="authorization">
              {t("authorization")}
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="org-chart" className="h-full overflow-y-auto">
              <div className="space-y-4 pb-6">
                <OrganizationalChart />
              </div>
            </TabsContent>

            <TabsContent value="employees" className="h-full overflow-y-auto">
              <div className="space-y-4 pb-6">
                <EmployeeTable />
              </div>
            </TabsContent>

            <TabsContent
              value="authorization"
              className="h-full overflow-y-auto"
            >
              <div className="space-y-4 pb-6">
                <AuthorizationMatrix />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
