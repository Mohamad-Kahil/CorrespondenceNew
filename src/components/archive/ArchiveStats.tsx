import React from "react";
import { Card } from "../ui/card";

export function ArchiveStats() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Archive Statistics</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold">245</div>
          <div className="text-sm text-muted-foreground">Total Documents</div>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold">18</div>
          <div className="text-sm text-muted-foreground">Recent Additions</div>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold">85%</div>
          <div className="text-sm text-muted-foreground">Storage Capacity</div>
        </div>
      </div>
    </Card>
  );
}
