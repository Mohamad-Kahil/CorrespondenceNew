import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { ExchangeSidebar } from "./ExchangeSidebar";
import { MessageList } from "./MessageList";
import { MessageView } from "./MessageView";
import { useParams, useNavigate } from "react-router-dom";
import { messages } from "./data";
import { Message } from "./types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function ExchangeLayout() {
  const { folder = "inbox", messageId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const folderMessages = messages.filter((m) => m.folder === folder);
  const selectedMessage = messageId
    ? messages.find((m) => m.id === parseInt(messageId))
    : null;

  const handleMessageSelect = (message: Message) => {
    navigate(`/exchange/${folder}/${message.id}`);
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <header className="p-6 border-b flex-shrink-0">
        <h1 className="text-2xl font-semibold">
          {t("documentExchangeSystem")}
        </h1>
      </header>
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 overflow-hidden"
      >
        <ResizablePanel defaultSize={20} minSize={15}>
          <ExchangeSidebar currentFolder={folder} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={30} minSize={20}>
          <MessageList
            messages={folderMessages}
            onMessageSelect={handleMessageSelect}
            selectedMessageId={messageId ? parseInt(messageId) : undefined}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <MessageView message={selectedMessage} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
