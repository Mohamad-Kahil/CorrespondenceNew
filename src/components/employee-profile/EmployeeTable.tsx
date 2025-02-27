import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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
import { Search, UserPlus } from "lucide-react";
import employeeData from "@/data/employees.json";
import { AddEmployeeDialog } from "./AddEmployeeDialog";

interface EmployeeTableProps {
  onSelectEmployee: (employeeId: string) => void;
}

type Employee = (typeof employeeData.employees)[0];

export function EmployeeTable({ onSelectEmployee }: EmployeeTableProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [groupedEmployees, setGroupedEmployees] = useState<
    Record<string, Employee[]>
  >({});
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);

  useEffect(() => {
    // Load employees from the JSON file
    setEmployees(employeeData.employees);

    // Group employees by department
    const grouped = employeeData.employees.reduce(
      (acc, employee) => {
        const department = employee.experience.department;
        if (!acc[department]) {
          acc[department] = [];
        }
        acc[department].push(employee);
        return acc;
      },
      {} as Record<string, Employee[]>,
    );

    setGroupedEmployees(grouped);
  }, []);

  const handleAddEmployee = (newEmployee: Employee) => {
    // In a real application, this would make an API call to add the employee
    // For now, we'll just update the local state
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);

    // Update grouped employees
    const department = newEmployee.experience.department;
    const updatedGrouped = { ...groupedEmployees };
    if (!updatedGrouped[department]) {
      updatedGrouped[department] = [];
    }
    updatedGrouped[department].push(newEmployee);
    setGroupedEmployees(updatedGrouped);
  };

  // Filter employees based on search query
  const filteredEmployees =
    searchQuery.trim() === ""
      ? employees
      : employees.filter(
          (employee) =>
            employee.personalInfo.fullName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            employee.personalInfo.preferredName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            employee.id.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  return (
    <Card className="p-6" dir={t("direction")}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {t("employeeDirectory") || "Employee Directory"}
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchEmployees") || "Search employees..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={() => setIsAddEmployeeOpen(true)} className="gap-2">
            <UserPlus className="h-4 w-4" />
            {t("addEmployee") || "Add Employee"}
          </Button>
        </div>
      </div>

      {searchQuery.trim() !== "" ? (
        // Show flat list when searching
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("employeeId") || "Employee ID"}</TableHead>
              <TableHead>{t("name") || "Name"}</TableHead>
              <TableHead>{t("department") || "Department"}</TableHead>
              <TableHead>{t("position") || "Position"}</TableHead>
              <TableHead>{t("actions") || "Actions"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={employee.personalInfo.profilePhoto}
                        alt={employee.personalInfo.fullName}
                      />
                      <AvatarFallback>
                        {employee.personalInfo.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {employee.personalInfo.fullName}
                      </div>
                      {employee.personalInfo.preferredName !==
                        employee.personalInfo.fullName && (
                        <div className="text-sm text-muted-foreground">
                          {t("preferredName") || "Preferred"}:{" "}
                          {employee.personalInfo.preferredName}
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{employee.experience.department}</TableCell>
                <TableCell>{employee.experience.currentPosition}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectEmployee(employee.id)}
                  >
                    {t("viewDetails") || "View Profile"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        // Show grouped by department when not searching
        <div className="space-y-8">
          {Object.entries(groupedEmployees).map(
            ([department, departmentEmployees]) => (
              <div key={department} className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">
                  {t(department) || department}{" "}
                  {t("department") || "Department"}
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("employeeId") || "Employee ID"}</TableHead>
                      <TableHead>{t("name") || "Name"}</TableHead>
                      <TableHead>{t("position") || "Position"}</TableHead>
                      <TableHead>{t("actions") || "Actions"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>{employee.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={employee.personalInfo.profilePhoto}
                                alt={employee.personalInfo.fullName}
                              />
                              <AvatarFallback>
                                {employee.personalInfo.fullName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {employee.personalInfo.fullName}
                              </div>
                              {employee.personalInfo.preferredName !==
                                employee.personalInfo.fullName && (
                                <div className="text-sm text-muted-foreground">
                                  {t("preferredName") || "Preferred"}:{" "}
                                  {employee.personalInfo.preferredName}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {employee.experience.currentPosition}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onSelectEmployee(employee.id)}
                          >
                            {t("viewDetails") || "View Profile"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ),
          )}
        </div>
      )}

      <AddEmployeeDialog
        open={isAddEmployeeOpen}
        onOpenChange={setIsAddEmployeeOpen}
        onAddEmployee={handleAddEmployee}
      />
    </Card>
  );
}
