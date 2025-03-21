import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { InboundDocumentWizard } from "./inbound/InboundDocumentWizard";
import { OutboundDocumentWizard } from "./outbound/OutboundDocumentWizard";

export function DocumentManagementLayout() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"inbound" | "outbound">("inbound");

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <header className="p-4 border-b flex-shrink-0">
        <h1 className="text-2xl font-semibold">
          {t("documentManagementProcess") || "Document Management Process"}
        </h1>
      </header>

      <div className="flex-1 overflow-hidden">
        <Tabs
          defaultValue="inbound"
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "inbound" | "outbound")
          }
          className="h-full flex flex-col"
          dir={t("direction") === "rtl" ? "rtl" : "ltr"}
        >
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto my-2 flex-shrink-0">
            <TabsTrigger value="inbound">
              {t("inboundDocuments") || "Inbound Documents"}
            </TabsTrigger>
            <TabsTrigger value="outbound">
              {t("outboundDocuments") || "Outbound Documents"}
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden px-4">
            <TabsContent value="inbound" className="h-full overflow-y-auto">
              <InboundDocumentWizard />
            </TabsContent>

            <TabsContent value="outbound" className="h-full overflow-y-auto">
              <OutboundDocumentWizard />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
