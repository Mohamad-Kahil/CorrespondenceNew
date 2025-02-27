import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export function RepositoryTree() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Repository Structure</h2>
      <div className="h-[400px] border rounded-md p-4 overflow-auto mb-4">
        <ul className="space-y-2">
          <li className="font-medium">
            Root
            <ul className="pl-4 pt-2 space-y-2">
              <li className="font-medium">
                Contracts
                <ul className="pl-4 pt-2 space-y-2">
                  <li>2024 Agreements</li>
                  <li>2023 Agreements</li>
                </ul>
              </li>
              <li className="font-medium">
                Invoices
                <ul className="pl-4 pt-2 space-y-2">
                  <li>Q1 2024</li>
                  <li>Q4 2023</li>
                </ul>
              </li>
              <li className="font-medium">
                Reports
                <ul className="pl-4 pt-2 space-y-2">
                  <li>Annual Reports</li>
                  <li>Monthly Reports</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">New Folder</Button>
        <Button>Upload Document</Button>
      </div>
    </Card>
  );
}
