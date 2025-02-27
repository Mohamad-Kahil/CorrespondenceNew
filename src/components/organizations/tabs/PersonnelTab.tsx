import React from "react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

interface PersonnelTabProps {
  personnel: any[];
}

export function PersonnelTab({ personnel }: PersonnelTabProps) {
  const { t } = useLanguage();

  // Function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Retired":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      case "Reassigned":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "";
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        {t("designatedPersonnel") || "Designated Personnel"}
      </h3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("name") || "Name"}</TableHead>
            <TableHead>{t("position") || "Position"}</TableHead>
            <TableHead>{t("department") || "Department"}</TableHead>
            <TableHead>{t("contact") || "Contact"}</TableHead>
            <TableHead>{t("status") || "Status"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {personnel.map((person) => (
            <TableRow key={person.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.fullName.replace(/ /g, "")}`}
                      alt={person.fullName}
                    />
                    <AvatarFallback>
                      {person.fullName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{person.fullName}</div>
                    <div className="text-xs text-muted-foreground">
                      {person.id}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{person.position}</TableCell>
              <TableCell>{person.department}</TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{person.contact.primaryEmail}</div>
                  <div>{person.contact.mobile}</div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusBadgeColor(person.status)}>
                  {person.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {personnel.length > 0 && (
        <div className="mt-8 space-y-6">
          <Separator />
          <h4 className="text-md font-medium">
            {t("personnelDetails") || "Personnel Details"}
          </h4>

          <div className="space-y-6">
            {personnel.map((person) => (
              <div key={person.id} className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.fullName.replace(/ /g, "")}`}
                      alt={person.fullName}
                    />
                    <AvatarFallback>
                      {person.fullName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h5 className="font-semibold">{person.fullName}</h5>
                        <p className="text-sm text-muted-foreground">
                          {person.position} • {person.department}
                        </p>
                      </div>
                      <Badge className={getStatusBadgeColor(person.status)}>
                        {person.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <h6 className="text-sm font-medium">
                          {t("contactInformation") || "Contact Information"}
                        </h6>
                        <div className="space-y-1 mt-2">
                          <p className="text-sm">
                            <span className="text-muted-foreground">
                              {t("primaryEmail") || "Primary Email"}:
                            </span>{" "}
                            {person.contact.primaryEmail}
                          </p>
                          {person.contact.secondaryEmail && (
                            <p className="text-sm">
                              <span className="text-muted-foreground">
                                {t("secondaryEmail") || "Secondary Email"}:
                              </span>{" "}
                              {person.contact.secondaryEmail}
                            </p>
                          )}
                          <p className="text-sm">
                            <span className="text-muted-foreground">
                              {t("phone") || "Phone"}:
                            </span>{" "}
                            {person.contact.phone}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">
                              {t("mobile") || "Mobile"}:
                            </span>{" "}
                            {person.contact.mobile}
                          </p>
                          {person.contact.fax && (
                            <p className="text-sm">
                              <span className="text-muted-foreground">
                                {t("fax") || "Fax"}:
                              </span>{" "}
                              {person.contact.fax}
                            </p>
                          )}
                          <p className="text-sm">
                            <span className="text-muted-foreground">
                              {t("officeAddressRef") || "Office Address Ref"}:
                            </span>{" "}
                            {person.officeAddressRef}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h6 className="text-sm font-medium">
                          {t("accessLevel") || "Access Level"}
                        </h6>
                        <div className="space-y-1 mt-2">
                          <p className="text-sm">
                            <span className="text-muted-foreground">
                              {t("securityClearance") || "Security Clearance"}:
                            </span>{" "}
                            {t("level")} {person.accessLevel.securityClearance}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">
                              {t("authorizationLevel") || "Authorization Level"}
                              :
                            </span>{" "}
                            {person.accessLevel.authorizationLevel}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {person.accessLevel.systemRoles.map(
                              (role: string) => (
                                <Badge
                                  key={role}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {role}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
