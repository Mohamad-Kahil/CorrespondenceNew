import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export function DocumentRedactor() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Document Redactor</h2>
      <div className="h-[400px] border rounded-md flex items-center justify-center bg-muted/50 mb-4">
        <p className="text-muted-foreground">Document preview area</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">Redact Text</Button>
        <Button variant="outline">Redact Area</Button>
        <Button>Save Redacted Document</Button>
      </div>
    </Card>
  );
}
