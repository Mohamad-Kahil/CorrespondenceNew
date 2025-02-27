import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function StorageAddressManager() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Storage Address</h2>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location Code</Label>
          <Input id="location" placeholder="Enter location code (e.g. A1-B2)" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            placeholder="Enter storage capacity"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Input id="notes" placeholder="Additional notes" />
        </div>
        <Button type="submit">Save Storage Address</Button>
      </form>
    </Card>
  );
}
