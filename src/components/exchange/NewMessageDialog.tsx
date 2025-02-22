import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { FileText, Paperclip, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface NewMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewMessageDialog({
  open,
  onOpenChange,
}: NewMessageDialogProps) {
  const [attachedDocument, setAttachedDocument] = useState<File | null>(null);
  const { t } = useLanguage();

  const handleDocumentAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedDocument(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden grid grid-rows-[auto,1fr,auto] gap-4">
        <DialogHeader>
          <DialogTitle>{t("newMessage")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto pr-2">
          <div className="space-y-2">
            <Label htmlFor="to">{t("to")}</Label>
            <Input
              id="to"
              placeholder="recipient@example.com"
              className="text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cc">{t("cc")}</Label>
            <Input
              id="cc"
              placeholder="cc@example.com"
              className="text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">{t("subject")}</Label>
            <Input
              id="subject"
              placeholder={t("enterSubject")}
              className="text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label>{t("attachDocument")}</Label>
            {attachedDocument ? (
              <div className="flex items-center justify-between p-2 border rounded-md bg-muted/50">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">
                    {attachedDocument.name}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setAttachedDocument(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-md">
                <div className="text-center">
                  <Paperclip className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
                  <label
                    htmlFor="document-upload"
                    className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                  >
                    <span>{t("attachDocument")}</span>
                    <input
                      id="document-upload"
                      name="document-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                      onChange={handleDocumentAttach}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t("message")}</Label>
            <Textarea
              id="message"
              placeholder={t("typeMessage")}
              className="h-24 resize-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button>{t("send")}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
