import { Message } from "./types";

export const messages: Message[] = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  subject: `Document Review Request #${i + 1}`,
  sender: `user${i + 1}@example.com`,
  recipient: "me@company.com",
  preview: "Please review the attached document...",
  content: `Please review the attached document for the upcoming meeting #${i + 1}. This is important.`,
  date: "2024-02-20",
  hasDocument: true,
  isUnread: i < 5,
  department:
    i % 5 === 0
      ? "hr"
      : i % 4 === 0
        ? "it"
        : i % 3 === 0
          ? "sales"
          : i % 2 === 0
            ? "marketing"
            : "finance",
  priority: i % 3 === 0 ? "high" : i % 2 === 0 ? "medium" : "low",
  folder:
    i % 5 === 0
      ? "sent"
      : i % 4 === 0
        ? "drafts"
        : i % 3 === 0
          ? "archive"
          : i % 2 === 0
            ? "trash"
            : "inbox",
  documentName: `Meeting-Notes-2024-${i + 1}.pdf`,
  documentSize: "2.4MB",
}));
