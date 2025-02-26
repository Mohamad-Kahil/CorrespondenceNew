import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface DocumentRedactorProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  document?: {
    name: string;
    content: string;
  };
}

export function DocumentRedactor({
  open = false,
  onOpenChange = () => {},
  document,
}: DocumentRedactorProps) {
  const { t } = useLanguage();
  const [redactedContent, setRedactedContent] = useState(
    document?.content || "",
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[1100px] h-[1100px] flex flex-col">
        <DialogHeader>
          <DialogTitle>{t("createVersion")}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex gap-4 p-4">
          {/* Original Document */}
          <div className="flex-1 border rounded-lg p-4">
            <h3 className="font-medium mb-4">{t("originalDocument")}</h3>
            <div className="h-full overflow-auto">{document?.content}</div>
          </div>

          {/* Redacted Version */}
          <div className="flex-1 border rounded-lg p-4">
            <h3 className="font-medium mb-4">{t("redactedVersion")}</h3>
            <div
              className="h-full overflow-auto"
              contentEditable
              suppressContentEditableWarning
              onInput={(e) =>
                setRedactedContent(e.currentTarget.textContent || "")
              }
            >
              {redactedContent}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button
            onClick={() => {
              // Here you would typically save the redacted version
              console.log("Saving redacted version:", redactedContent);
              onOpenChange(false);
            }}
          >
            {t("save")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
