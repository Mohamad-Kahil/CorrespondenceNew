import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Mail, Play, Eye, Info, History, ZoomIn, ZoomOut } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { cn } from "@/lib/utils";
import documentLogs from "@/data/document-logs.json";

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

interface DocumentViewerProps {
  document: Document | null;
}

export function DocumentViewer({ document }: DocumentViewerProps) {
  const [showMetadata, setShowMetadata] = useState(false);
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [zoom, setZoom] = useState(100);
  const { t, language } = useLanguage();

  return (
    <div className="h-full flex flex-col p-4">
      {document ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold">{document.name}</h2>
              <p className="text-sm text-muted-foreground">
                {document.documentType === "inbound"
                  ? t("receivedOn")
                  : t("sentOn")}
                :{document.metadata.date}
                {document.metadata.reference &&
                  ` • ${t("ref")}: ${document.metadata.reference}`}
              </p>
              <p className="text-sm text-muted-foreground">
                {document.documentType === "inbound"
                  ? `${t("from")}: ${document.metadata.sender}`
                  : `${t("to")}: ${document.metadata.recipient}`}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className={cn("gap-2", language === "ar" && "flex-row-reverse")}
                onClick={() => {}}
              >
                <Mail className="h-4 w-4" />
                {t("forward")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn(language === "ar" && "flex-row-reverse gap-2")}
              >
                <Play className="h-4 w-4" />
                {t("startWorkflow")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn(language === "ar" && "flex-row-reverse gap-2")}
              >
                <Eye className="h-4 w-4" />
                {t("createVersion")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMetadata(true)}
                className={cn(language === "ar" && "flex-row-reverse gap-2")}
              >
                <Info className="h-4 w-4" />
                {t("metadata")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowActivityLog(true)}
                className={cn(language === "ar" && "flex-row-reverse gap-2")}
              >
                <History className="h-4 w-4" />
                {t("activityLog")}
              </Button>
            </div>
          </div>

          <Card className="flex-1 p-4 relative overflow-hidden">
            <div className="sticky top-0 right-0 z-10 flex justify-end mb-4">
              <div className="bg-background/80 backdrop-blur-sm rounded-lg p-2 flex gap-2 shadow-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setZoom((prev) => Math.min(prev + 10, 200))}
                  disabled={zoom >= 200}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <span className="flex items-center px-2 text-sm font-medium">
                  {zoom}%
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setZoom((prev) => Math.max(prev - 10, 50))}
                  disabled={zoom <= 50}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="overflow-auto max-h-[calc(100vh-300px)] relative">
              {document.imagePath && (
                <img
                  src={document.imagePath}
                  alt={document.name}
                  className="rounded-lg shadow-lg mx-auto"
                  style={{
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: "center top",
                    transition: "transform 0.2s ease-in-out",
                  }}
                />
              )}
            </div>
          </Card>
        </>
      ) : (
        <Card className="flex-1 p-4 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>{t("selectDocument")}</p>
          </div>
        </Card>
      )}

      <Dialog open={showMetadata} onOpenChange={setShowMetadata}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("documentMetadata")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-1">{t("documentName")}</h3>
                <p className="text-sm text-muted-foreground">
                  {document?.name}
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">{t("documentType")}</h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {document?.documentType}
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">{t("date")}</h3>
                <p className="text-sm text-muted-foreground">
                  {document?.metadata.date}
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">{t("reference")}</h3>
                <p className="text-sm text-muted-foreground">
                  {document?.metadata.reference}
                </p>
              </div>
              {document?.documentType === "inbound" ? (
                <div>
                  <h3 className="font-medium mb-1">{t("sender")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {document?.metadata.sender}
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-medium mb-1">{t("recipient")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {document?.metadata.recipient}
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showActivityLog} onOpenChange={setShowActivityLog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("activityLog")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {document &&
              documentLogs[document.id]?.activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.userName}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.details}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
