import React from "react";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function StorageAddressList() {
  const storageAddresses = [
    { id: 1, location: "A1-B2", documentCount: 12, lastAccessed: "2024-03-15" },
    { id: 2, location: "C3-D4", documentCount: 8, lastAccessed: "2024-03-10" },
    { id: 3, location: "E5-F6", documentCount: 15, lastAccessed: "2024-03-18" },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Storage Addresses</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location</TableHead>
            <TableHead>Document Count</TableHead>
            <TableHead>Last Accessed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {storageAddresses.map((address) => (
            <TableRow key={address.id}>
              <TableCell>{address.location}</TableCell>
              <TableCell>{address.documentCount}</TableCell>
              <TableCell>{address.lastAccessed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
