export interface Message {
  id: number;
  subject: string;
  sender: string;
  recipient: string;
  preview: string;
  content: string;
  date: string;
  hasDocument: boolean;
  isUnread: boolean;
  folder: "inbox" | "sent" | "drafts" | "archive" | "trash";
  department?: string;
  priority?: string;
  documentName?: string;
  documentSize?: string;
}

export type Folder = "inbox" | "sent" | "drafts" | "archive" | "trash";
