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
      Executive: "Top Secret",
      Finance: "Top Secret",
      Technology: "Top Secret",
      "Human Resources": "Top Secret",
      Operations: "Top Secret",
    },
  },
  {
    id: "EMP002",
    name: "Sarah Johnson",
    position: "CFO",
    department: "Finance",
    securityLevel: "4",
    access: {
      Executive: "Secret",
      Finance: "Top Secret",
      Technology: "Secret",
      "Human Resources": "Secret",
      Operations: "Secret",
    },
  },
  {
    id: "EMP003",
    name: "Michael Chen",
    position: "CTO",
    department: "Technology",
    securityLevel: "4",
    access: {
      Executive: "Secret",
      Finance: "Secret",
      Technology: "Top Secret",
      "Human Resources": "Secret",
      Operations: "Secret",
    },
  },
  {
    id: "EMP004",
    name: "Emily Brown",
    position: "HR Director",
    department: "Human Resources",
    securityLevel: "4",
    access: {
      Executive: "Secret",
      Finance: "Secret",
      Technology: "Secret",
      "Human Resources": "Top Secret",
      Operations: "Secret",
    },
  },
  {
    id: "EMP005",
    name: "David Wilson",
    position: "Finance Manager",
    department: "Finance",
    securityLevel: "3",
    access: {
      Executive: "Confidential",
      Finance: "Secret",
      Technology: "Confidential",
      "Human Resources": "Confidential",
      Operations: "Confidential",
    },
  },
  {
    id: "EMP006",
    name: "Lisa Anderson",
    position: "IT Manager",
    department: "Technology",
    securityLevel: "3",
    access: {
      Executive: "Confidential",
      Finance: "Confidential",
      Technology: "Secret",
      "Human Resources": "Confidential",
      Operations: "Confidential",
    },
  },
  {
    id: "EMP007",
    name: "Robert Taylor",
    position: "HR Manager",
    department: "Human Resources",
    securityLevel: "3",
    access: {
      Executive: "Confidential",
      Finance: "Confidential",
      Technology: "Confidential",
      "Human Resources": "Secret",
      Operations: "Confidential",
    },
  },
  {
    id: "EMP017",
    name: "William Davis",
    position: "Security Manager",
    department: "Operations",
    securityLevel: "3",
    access: {
      Executive: "Confidential",
      Finance: "Confidential",
      Technology: "Confidential",
      "Human Resources": "Confidential",
      Operations: "Confidential",
    },
  },
  {
    id: "EMP018",
    name: "Emma White",
    position: "Operations Manager",
    department: "Operations",
    securityLevel: "3",
    access: {
      Executive: "Confidential",
      Finance: "Confidential",
      Technology: "Confidential",
      "Human Resources": "Confidential",
      Operations: "Secret",
    },
  },
  {
    id: "EMP008",
    name: "Jennifer Martinez",
    position: "Senior Accountant",
    department: "Finance",
    securityLevel: "2",
    access: {
      Executive: "Confidential",
      Finance: "Confidential",
      Technology: "Confidential",
      "Human Resources": "Confidential",
      Operations: "Confidential",
    },
  },
  {
    id: "EMP009",
    name: "James Lee",
    position: "Senior Developer",
    department: "Technology",
    securityLevel: "2",
    access: {
      Executive: "Confidential",
      Finance: "Confidential",
      Technology: "Confidential",
      "Human Resources": "Confidential",
      Operations: "Confidential",
    },
  },
];

const departments = [
  "Executive",
  "Finance",
  "Technology",
  "Human Resources",
  "Operations",
];

const accessLevels = [
  "Top Secret",
  "Secret",
  "Confidential",
  "Restricted",
  "Public",
];

export function AuthorizationMatrix() {
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
              {departments.map((dept) => (
                <TableHead key={dept}>{dept}</TableHead>
              ))}
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
