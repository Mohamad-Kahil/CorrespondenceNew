import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PersonalInfoTab } from "./tabs/PersonalInfoTab";
import { EducationTab } from "./tabs/EducationTab";
import { ExperienceTab } from "./tabs/ExperienceTab";
import { AccessLevelTab } from "./tabs/AccessLevelTab";
import { PerformanceSkillsTab } from "./tabs/PerformanceSkillsTab";
import { HrAdministrativeTab } from "./tabs/HrAdministrativeTab";
import employeeData from "@/data/employees.json";

interface EmployeeProfileProps {
  employeeId: string;
}

export function EmployeeProfile({ employeeId }: EmployeeProfileProps) {
  const { t } = useLanguage();
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the employee with the matching ID
    const foundEmployee = employeeData.employees.find(
      (emp) => emp.id === employeeId,
    );
    setEmployee(foundEmployee);
    setLoading(false);
  }, [employeeId]);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  if (!employee) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold mb-2">Employee Not Found</h2>
          <p className="text-muted-foreground">
            The employee with ID {employeeId} could not be found.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6" dir={t("direction")}>
      <Card className="p-6">
        <div className="flex items-start gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={employee.personalInfo.profilePhoto}
              alt={employee.personalInfo.fullName}
            />
            <AvatarFallback className="text-2xl">
              {employee.personalInfo.fullName
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">
                  {employee.personalInfo.fullName}
                </h2>
                <p className="text-muted-foreground">
                  {employee.experience.currentPosition}
                </p>
              </div>
              <Badge variant="outline" className="text-sm">
                ID: {employee.id}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-medium">{employee.experience.department}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">
                  {employee.personalInfo.contact.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mobile</p>
                <p className="font-medium">
                  {employee.personalInfo.contact.mobile}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hire Date</p>
                <p className="font-medium">{employee.experience.hireDate}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Tabs
        defaultValue="personal"
        className="space-y-4"
        dir={t("direction") === "rtl" ? "rtl" : "ltr"}
      >
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="personal">
            {t("personalInfo") || "Personal Info"}
          </TabsTrigger>
          <TabsTrigger value="education">
            {t("education") || "Education"}
          </TabsTrigger>
          <TabsTrigger value="experience">
            {t("experience") || "Experience"}
          </TabsTrigger>
          <TabsTrigger value="performance">
            {t("performanceAndSkills") || "Performance & Skills"}
          </TabsTrigger>
          <TabsTrigger value="access">
            {t("accessLevel") || "Access Level"}
          </TabsTrigger>
          <TabsTrigger value="hr">
            {t("hrAdmin") || "HR & Administrative"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoTab employee={employee} />
        </TabsContent>

        <TabsContent value="education">
          <EducationTab employee={employee} />
        </TabsContent>

        <TabsContent value="experience">
          <ExperienceTab employee={employee} />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceSkillsTab employee={employee} />
        </TabsContent>

        <TabsContent value="access">
          <AccessLevelTab employee={employee} />
        </TabsContent>

        <TabsContent value="hr">
          <HrAdministrativeTab employee={employee} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
