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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const employees = [
  {
    id: "EMP001",
    name: "John Smith",
    position: "CEO",
    department: "Executive",
    securityLevel: "5",
    access: {
      executive: "Top Secret",
      finance: "Top Secret",
      technology: "Top Secret",
      humanResources: "Top Secret",
      operations: "Top Secret",
    },
  },
  {
    id: "EMP002",
    name: "Sarah Johnson",
    position: "CFO",
    department: "Finance",
    securityLevel: "4",
    access: {
      executive: "Secret",
      finance: "Top Secret",
      technology: "Secret",
      humanResources: "Secret",
      operations: "Secret",
    },
  },
  {
    id: "EMP003",
    name: "Michael Chen",
    position: "CTO",
    department: "Technology",
    securityLevel: "4",
    access: {
      executive: "Secret",
      finance: "Secret",
      technology: "Top Secret",
      humanResources: "Secret",
      operations: "Secret",
    },
  },
  {
    id: "EMP004",
    name: "Emily Brown",
    position: "HR Director",
    department: "Human Resources",
    securityLevel: "4",
    access: {
      executive: "Secret",
      finance: "Secret",
      technology: "Secret",
      humanResources: "Top Secret",
      operations: "Secret",
    },
  },
  {
    id: "EMP005",
    name: "David Wilson",
    position: "Finance Manager",
    department: "Finance",
    securityLevel: "3",
    access: {
      executive: "Confidential",
      finance: "Secret",
      technology: "Confidential",
      humanResources: "Confidential",
      operations: "Confidential",
    },
  },
  {
    id: "EMP006",
    name: "Lisa Anderson",
    position: "IT Manager",
    department: "Technology",
    securityLevel: "3",
    access: {
      executive: "Confidential",
      finance: "Confidential",
      technology: "Secret",
      humanResources: "Confidential",
      operations: "Confidential",
    },
  },
  {
    id: "EMP007",
    name: "Robert Taylor",
    position: "HR Manager",
    department: "Human Resources",
    securityLevel: "3",
    access: {
      executive: "Confidential",
      finance: "Confidential",
      technology: "Confidential",
      humanResources: "Secret",
      operations: "Confidential",
    },
  },
  {
    id: "EMP017",
    name: "William Davis",
    position: "Security Manager",
    department: "Operations",
    securityLevel: "3",
    access: {
      executive: "Confidential",
      finance: "Confidential",
      technology: "Confidential",
      humanResources: "Confidential",
      operations: "Confidential",
    },
  },
  {
    id: "EMP018",
    name: "Emma White",
    position: "Operations Manager",
    department: "Operations",
    securityLevel: "3",
    access: {
      executive: "Confidential",
      finance: "Confidential",
      technology: "Confidential",
      humanResources: "Confidential",
      operations: "Secret",
    },
  },
  {
    id: "EMP008",
    name: "Jennifer Martinez",
    position: "Senior Accountant",
    department: "Finance",
    securityLevel: "2",
    access: {
      executive: "Confidential",
      finance: "Confidential",
      technology: "Confidential",
      humanResources: "Confidential",
      operations: "Confidential",
    },
  },
  {
    id: "EMP009",
    name: "James Lee",
    position: "Senior Developer",
    department: "Technology",
    securityLevel: "2",
    access: {
      executive: "Confidential",
      finance: "Confidential",
      technology: "Confidential",
      humanResources: "Confidential",
      operations: "Confidential",
    },
  },
];

const departments = [
  "executive",
  "finance",
  "technology",
  "humanResources",
  "operations",
];

const accessLevels = [
  "Top Secret",
  "Secret",
  "Confidential",
  "Restricted",
  "Public",
];

export function AuthorizationMatrix() {
  const { t } = useLanguage();

  const handleAccessChange = (
    employeeId: string,
    department: string,
    level: string,
  ) => {
    console.log(
      `Changed access for ${employeeId} in ${department} to ${level}`,
    );
  };

  return (
    <Card className="p-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Security Level</TableHead>
              <TableHead>Executive</TableHead>
              <TableHead>Finance</TableHead>
              <TableHead>Technology</TableHead>
              <TableHead>Human Resources</TableHead>
              <TableHead>Operations</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.securityLevel}</TableCell>
                {departments.map((dept) => (
                  <TableCell key={dept}>
                    <Select
                      defaultValue={employee.access[dept]}
                      onValueChange={(value) =>
                        handleAccessChange(employee.id, dept, value)
                      }
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {accessLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
