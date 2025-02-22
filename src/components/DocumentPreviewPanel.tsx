import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Card } from "./ui/card";

interface DocumentPreviewPanelProps {
  documentImage?: string;
  ocrText?: string;
}

const DocumentPreviewPanel = ({
  documentImage = "https://images.unsplash.com/photo-1586941962765-d3896cc85ac8?w=800&auto=format&fit=crop",
  ocrText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
}: DocumentPreviewPanelProps) => {
  return (
    <Card className="w-full h-[600px] bg-card p-4 border border-border">
      <div className="flex h-full gap-4">
        {/* Document Preview Side */}
        <div className="flex-1 h-full">
          <h3 className="text-lg font-semibold mb-2">Document Preview</h3>
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
          <h3 className="text-lg font-semibold mb-2">OCR Text</h3>
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
