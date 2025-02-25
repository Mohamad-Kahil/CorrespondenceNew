import React from "react";
import { Card } from "../ui/card";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import organizationData from "@/data/organization.json";

export function EmployeeTable() {
  const { t } = useLanguage();

  // Sort employees by security level (highest to lowest)
  const employees = [...organizationData.employees].sort(
    (a, b) => b.securityLevel - a.securityLevel,
  );

  const handleSecurityLevelChange = (employeeId: string, newLevel: string) => {
    // In a real app, this would update the backend
    console.log(`Updated security level for ${employeeId} to ${newLevel}`);
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">{t("employeeSecurity")}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("picture")}</TableHead>
            <TableHead>{t("employeeId")}</TableHead>
            <TableHead>{t("name")}</TableHead>
            <TableHead>{t("position")}</TableHead>
            <TableHead>{t("department")}</TableHead>
            <TableHead>{t("email")}</TableHead>
            <TableHead>{t("securityLevel")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={employee.picture} alt={employee.name} />
                  <AvatarFallback>
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>
                <Select
                  defaultValue={employee.securityLevel.toString()}
                  onValueChange={(value) =>
                    handleSecurityLevelChange(employee.id, value)
                  }
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Level 5</SelectItem>
                    <SelectItem value="4">Level 4</SelectItem>
                    <SelectItem value="3">Level 3</SelectItem>
                    <SelectItem value="2">Level 2</SelectItem>
                    <SelectItem value="1">Level 1</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
