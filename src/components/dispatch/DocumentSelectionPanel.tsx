import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Search } from "lucide-react";

interface DocumentSelectionPanelProps {
  onSelect?: (documentId: string) => void;
}

const DocumentSelectionPanel = ({
  onSelect = () => {},
}: DocumentSelectionPanelProps) => {
  const documents = [
    { id: "DOC-001", name: "Contract Agreement.pdf", date: "2024-03-15" },
    { id: "DOC-002", name: "Invoice #12345.pdf", date: "2024-03-10" },
    { id: "DOC-003", name: "Meeting Notes.docx", date: "2024-03-05" },
  ];

  return (
    <Card className="p-6 bg-card border border-border">
      <h2 className="text-2xl font-semibold mb-4 text-foreground">
        Select Document
      </h2>

      <div className="mb-6">
        <Label htmlFor="search" className="sr-only">
          Search Documents
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search documents..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-4 border rounded-md hover:bg-muted/50 cursor-pointer"
            onClick={() => onSelect(doc.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{doc.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Added: {doc.date}
                </p>
              </div>
              <Button variant="ghost" size="sm">
                Select
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DocumentSelectionPanel;
