import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { InboundDocumentWizard } from "./inbound/InboundDocumentWizard";
import { OutboundDocumentWizard } from "./outbound/OutboundDocumentWizard";

export function DocumentManagementLayout() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"inbound" | "outbound">("inbound");

  return (
    <div className="p-6 space-y-6" dir={t("direction")}>
      <header className="p-6 border-b -mx-6 -mt-6 mb-6">
        <h1 className="text-2xl font-semibold">
          {t("documentManagementProcess") || "Document Management Process"}
        </h1>
      </header>

      <Tabs
        defaultValue="inbound"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "inbound" | "outbound")}
        className="w-full"
        dir={t("direction") === "rtl" ? "rtl" : "ltr"}
      >
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="inbound">
            {t("inboundDocuments") || "Inbound Documents"}
          </TabsTrigger>
          <TabsTrigger value="outbound">
            {t("outboundDocuments") || "Outbound Documents"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbound" className="mt-6">
          <InboundDocumentWizard />
        </TabsContent>

        <TabsContent value="outbound" className="mt-6">
          <OutboundDocumentWizard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
