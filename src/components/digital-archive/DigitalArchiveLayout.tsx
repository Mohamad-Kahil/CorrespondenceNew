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
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null,
  );

  return (
    <div className="p-6 space-y-6">
      <header className="p-6 border-b -mx-6 -mt-6 mb-6">
        <h1 className="text-2xl font-semibold">{t("digitalArchive")}</h1>
        <p className="text-muted-foreground mt-2">{t("digitalArchiveDesc")}</p>
      </header>

      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[600px] rounded-lg border"
      >
        <ResizablePanel defaultSize={25} minSize={20}>
          <RepositoryTree onDocumentSelect={setSelectedDocument} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <DocumentViewer document={selectedDocument} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
