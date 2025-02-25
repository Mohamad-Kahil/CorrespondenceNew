import React from "react";
import { Card } from "../ui/card";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import organizationData from "@/data/organization.json";

interface Employee {
  id: string;
  picture: string;
  name: string;
  position: string;
  department: string;
  reportingTo: string | null;
}

export function OrganizationalChart() {
  const { t } = useLanguage();

  const employees: Employee[] = organizationData.employees;

  // Function to get subordinates of an employee
  const getSubordinates = (employeeName: string) => {
    return employees.filter((emp) => emp.reportingTo === employeeName);
  };

  // Function to render an employee node with its subordinates
  const renderEmployeeNode = (employee: Employee, level: number = 0) => {
    const subordinates = getSubordinates(employee.name);

    return (
      <div key={employee.id} className="relative">
        <div
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg border border-border",
            "bg-card hover:bg-muted/50 transition-colors",
            "relative",
            level > 0 && "mt-2",
          )}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={employee.picture} alt={employee.name} />
            <AvatarFallback>
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{employee.name}</div>
            <div className="text-sm text-muted-foreground">
              {employee.position} • {employee.department}
            </div>
          </div>
        </div>
        {subordinates.length > 0 && (
          <div className="pl-8 mt-2 relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-4 w-px bg-border" />
            {subordinates.map((sub, index) => (
              <div key={sub.id} className="relative">
                {/* Horizontal line */}
                <div className="absolute left-0 top-6 w-4 h-px bg-border" />
                {renderEmployeeNode(sub, level + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Find the root employee (CEO)
  const rootEmployee = employees.find((emp) => emp.reportingTo === null);

  return (
    <Card className="p-6 overflow-auto">
      <h2 className="text-lg font-semibold mb-6">{t("organizationalChart")}</h2>
      <div className="min-w-[800px] p-4">
        {rootEmployee && renderEmployeeNode(rootEmployee)}
      </div>
    </Card>
  );
}
