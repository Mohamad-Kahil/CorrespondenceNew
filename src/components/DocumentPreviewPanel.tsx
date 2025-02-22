import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Card } from "./ui/card";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface DocumentPreviewPanelProps {
  documentImage?: string;
  ocrText?: string;
}

const DocumentPreviewPanel = ({
  documentImage = "https://images.unsplash.com/photo-1586941962765-d3896cc85ac8?w=800&auto=format&fit=crop",
  ocrText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
}: DocumentPreviewPanelProps) => {
  const { t, language } = useLanguage();
  return (
    <Card className="w-full h-[600px] bg-card p-4 border border-border">
      <div className="flex h-full gap-4">
        {/* Document Preview Side */}
        <div className="flex-1 h-full">
          <h3 className="text-lg font-semibold mb-2">{t("documentPreview")}</h3>
          <div className="h-[calc(100%-2rem)] rounded-lg overflow-hidden border border-gray-200">
            <img
              src={documentImage}
              alt="Scanned document preview"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <Separator orientation="vertical" />

        {/* OCR Text Side */}
        <div className="flex-1 h-full">
          <h3 className="text-lg font-semibold mb-2">{t("ocrText")}</h3>
          <ScrollArea className="h-[calc(100%-2rem)] w-full rounded-lg border border-gray-200 p-4">
            <div className="whitespace-pre-wrap font-mono text-sm">
              {ocrText}
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
};

export default DocumentPreviewPanel;
