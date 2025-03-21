import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { organizationData } from "./data";
import { Trash, Plus } from "lucide-react";

export function OrganizationStructure() {
  const { t, language } = useLanguage();
  const { structure } = organizationData;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("departments") || "Departments"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {structure.departments.map((department, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">{department.name}</h3>
                <Button variant="ghost" size="sm">
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`dept-name-${index}`}>
                    {t("departmentName") || "Department Name"}
                  </Label>
                  <Input
                    id={`dept-name-${index}`}
                    defaultValue={department.name}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`dept-head-${index}`}>
                    {t("departmentHead") || "Department Head"}
                  </Label>
                  <Input
                    id={`dept-head-${index}`}
                    defaultValue={department.head}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`dept-desc-${index}`}>
                    {t("description") || "Description"}
                  </Label>
                  <Textarea
                    id={`dept-desc-${index}`}
                    defaultValue={department.description}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>{t("subDepartments") || "Sub-Departments"}</Label>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {department.subDepartments.map((subDept, subIndex) => (
                  <div
                    key={subIndex}
                    className="flex items-center gap-2 p-2 border rounded"
                  >
                    <Input
                      defaultValue={subDept}
                      className="flex-1"
                      placeholder={
                        t("subDepartmentName") || "Sub-department name"
                      }
                    />
                    <Button variant="ghost" size="sm">
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <Button variant="outline">
              {t("addDepartment") || "Add Department"}
            </Button>
            <Button>{t("saveChanges") || "Save Changes"}</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {t("organizationalChart") || "Organizational Chart"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-dashed rounded-lg flex flex-col items-center justify-center h-60">
            <p className="text-muted-foreground mb-2">
              {t("uploadOrgChart") || "Upload organizational chart"}
            </p>
            <Button variant="outline">
              {t("uploadFile") || "Upload File"}
            </Button>
          </div>

          <div className="flex justify-end">
            <Button>{t("saveChanges") || "Save Changes"}</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("keyPositions") || "Key Positions"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {structure.keyPositions.map((position, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{position.title}</h3>
                <Button variant="ghost" size="sm">
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`position-title-${index}`}>
                    {t("positionTitle") || "Position Title"}
                  </Label>
                  <Input
                    id={`position-title-${index}`}
                    defaultValue={position.title}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`position-name-${index}`}>
                    {t("name") || "Name"}
                  </Label>
                  <Input
                    id={`position-name-${index}`}
                    defaultValue={position.name}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`position-email-${index}`}>
                    {t("email") || "Email"}
                  </Label>
                  <Input
                    id={`position-email-${index}`}
                    defaultValue={position.email}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`position-phone-${index}`}>
                    {t("phone") || "Phone"}
                  </Label>
                  <Input
                    id={`position-phone-${index}`}
                    defaultValue={position.phone}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <Button variant="outline">
              {t("addKeyPosition") || "Add Key Position"}
            </Button>
            <Button>{t("saveChanges") || "Save Changes"}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
