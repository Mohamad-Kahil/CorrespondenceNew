import React from "react";
import { Card } from "../ui/card";

export function OrganizationalChart() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Organizational Chart</h2>
      <div className="flex flex-col items-center">
        <div className="p-4 border rounded-md bg-primary/10 mb-4 w-48 text-center">
          <div className="font-bold">CEO</div>
          <div className="text-sm">John Smith</div>
        </div>

        <div className="w-0.5 h-8 bg-border"></div>

        <div className="flex gap-16 mb-4">
          <div className="flex flex-col items-center">
            <div className="p-4 border rounded-md bg-muted/50 w-40 text-center">
              <div className="font-bold">CTO</div>
              <div className="text-sm">Jane Doe</div>
            </div>
            <div className="w-0.5 h-8 bg-border"></div>
            <div className="flex gap-4">
              <div className="p-3 border rounded-md bg-muted/30 w-32 text-center">
                <div className="font-bold">Dev Lead</div>
                <div className="text-sm">Bob Johnson</div>
              </div>
              <div className="p-3 border rounded-md bg-muted/30 w-32 text-center">
                <div className="font-bold">QA Lead</div>
                <div className="text-sm">Alice Williams</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-4 border rounded-md bg-muted/50 w-40 text-center">
              <div className="font-bold">CFO</div>
              <div className="text-sm">Mike Brown</div>
            </div>
            <div className="w-0.5 h-8 bg-border"></div>
            <div className="flex gap-4">
              <div className="p-3 border rounded-md bg-muted/30 w-32 text-center">
                <div className="font-bold">Finance</div>
                <div className="text-sm">Sarah Davis</div>
              </div>
              <div className="p-3 border rounded-md bg-muted/30 w-32 text-center">
                <div className="font-bold">HR</div>
                <div className="text-sm">Tom Wilson</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
