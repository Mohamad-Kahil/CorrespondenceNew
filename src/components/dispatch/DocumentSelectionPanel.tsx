import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Camera, Upload } from "lucide-react";
import DocumentPreviewPanel from "../DocumentPreviewPanel";

interface DocumentSelectionPanelProps {
  onDocumentSelect: (document: any) => void;
}

const DocumentSelectionPanel = ({
  onDocumentSelect,
}: DocumentSelectionPanelProps) => {
  const { t } = useLanguage();

  const handleScan = () => {
    // Simulate scanning a document
    onDocumentSelect({
      image:
        "https://images.unsplash.com/photo-1586941962765-d3896cc85ac8?w=800&auto=format&fit=crop",
      content: "Sample document content will appear here.",
    });
  };

  return (
    <Card className="p-6 bg-card border border-border">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{t("documentSelection")}</h3>
          <div className="flex gap-2">
            <Button onClick={handleScan} variant="outline">
              <Camera className="w-4 h-4 mr-2" />
              {t("scanDocument")}
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              {t("uploadDocument")}
            </Button>
          </div>
        </div>

        <DocumentPreviewPanel
          documentImage="https://images.unsplash.com/photo-1586941962765-d3896cc85ac8?w=800&auto=format&fit=crop"
          ocrText={t("documentPreviewText")}
        />
      </div>
    </Card>
  );
};

export default DocumentSelectionPanel;
