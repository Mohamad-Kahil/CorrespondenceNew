import React, { useState } from "react";
import { Card } from "../ui/card";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { RepositoryTree } from "./RepositoryTree";
import { DocumentViewer } from "./DocumentViewer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";

interface Document {
  id: string;
  name: string;
  type: "document";
  documentType: "inbound" | "outbound";
  metadata: {
    date: string;
    sender?: string;
    recipient?: string;
    reference?: string;
  };
  imagePath?: string;
}

export function DigitalArchiveLayout() {
  const { t } = useLanguage();
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <header className="p-6 border-b flex-shrink-0">
        <h1 className="text-2xl font-semibold">{t("digitalArchive")}</h1>
      </header>

      <div className="flex-1 overflow-hidden p-6 pt-0">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full rounded-lg border"
        >
          <ResizablePanel defaultSize={25} minSize={20}>
            <div className="h-full overflow-hidden">
              <RepositoryTree onDocumentSelect={setSelectedDocument} />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <div className="h-full overflow-y-auto">
              <DocumentViewer document={selectedDocument} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
