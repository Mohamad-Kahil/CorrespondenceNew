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
import { Checkbox } from "../ui/checkbox";

export function AuthorizationMatrix() {
  const roles = ["Admin", "Manager", "User", "Guest"];
  const permissions = [
    "View Documents",
    "Edit Documents",
    "Delete Documents",
    "Create Templates",
    "Manage Users",
    "System Settings",
  ];

  // Sample permission matrix
  const permissionMatrix = {
    Admin: [true, true, true, true, true, true],
    Manager: [true, true, false, true, false, false],
    User: [true, true, false, false, false, false],
    Guest: [true, false, false, false, false, false],
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Authorization Matrix</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Permission / Role</TableHead>
              {roles.map((role) => (
                <TableHead key={role}>{role}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission, index) => (
              <TableRow key={permission}>
                <TableCell className="font-medium">{permission}</TableCell>
                {roles.map((role) => (
                  <TableCell key={`${role}-${permission}`}>
                    <Checkbox checked={permissionMatrix[role][index]} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
