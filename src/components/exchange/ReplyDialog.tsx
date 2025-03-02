import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Message } from "./types";

interface ReplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: Message | null;
  replyType: "reply" | "replyAll" | "forward";
}

export function ReplyDialog({
  open,
  onOpenChange,
  message,
  replyType,
}: ReplyDialogProps) {
  const { t, language } = useLanguage();
  const [subject, setSubject] = useState(
    message
      ? `${replyType === "forward" ? "Fwd: " : "Re: "}${message.subject}`
      : "",
  );
  const [recipient, setRecipient] = useState(
    replyType === "forward" ? "" : message?.sender || "",
  );
  const [cc, setCc] = useState("");
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSend = () => {
    // In a real app, this would send the message
    console.log("Sending message:", {
      subject,
      recipient,
      cc,
      content,
      attachments,
    });
    onOpenChange(false);
  };

  const getDialogTitle = () => {
    switch (replyType) {
      case "reply":
        return t("reply");
      case "replyAll":
        return t("replyAll");
      case "forward":
        return t("forward");
      default:
        return t("newMessage");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-3xl"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-[auto_1fr] items-center gap-4">
            <span className="text-right font-medium">{t("to")}:</span>
            <Input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder={t("enterRecipientEmail") || "Enter recipient email"}
            />
          </div>

          <div className="grid grid-cols-[auto_1fr] items-center gap-4">
            <span className="text-right font-medium">{t("cc")}:</span>
            <Input
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              placeholder={t("enterCcEmail") || "Enter CC email addresses"}
            />
          </div>

          <div className="grid grid-cols-[auto_1fr] items-center gap-4">
            <span className="text-right font-medium">{t("subject")}:</span>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={t("enterSubject")}
            />
          </div>

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("typeMessage")}
            className="min-h-[200px]"
          />

          <div className="flex items-center gap-4">
            <Button variant="outline" type="button" className="gap-2">
              <span>{t("attachDocument")}</span>
            </Button>
            <div className="text-sm text-muted-foreground">
              {attachments.length > 0
                ? `${attachments.length} ${t("filesAttached")}`
                : t("noFilesAttached") || "No files attached"}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={handleSend}>{t("send")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
