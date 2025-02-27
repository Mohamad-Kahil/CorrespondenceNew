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
import { Search, Building2, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { AddOrganizationDialog } from "./AddOrganizationDialog";
import organizationsData from "@/data/organizations.json";

interface OrganizationTableProps {
  onSelectOrganization: (organizationId: string) => void;
}

type Organization = {
  id: string;
  name: string;
  shortName: string;
  type: string;
  region: string;
  parentOrganization: string | null;
  securityClassification:
    | "Top Secret"
    | "Secret"
    | "Confidential"
    | "Restricted";
};

export function OrganizationTable({
  onSelectOrganization,
}: OrganizationTableProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [groupedOrganizations, setGroupedOrganizations] = useState<
    Record<string, Organization[]>
  >({});
  const [isAddOrganizationOpen, setIsAddOrganizationOpen] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use mock data
    const mockOrganizations: Organization[] = [
      {
        id: "ORG-001",
        name: "Ministry of Interior",
        shortName: "MOI",
        type: "Ministry",
        region: "Kuwait",
        parentOrganization: null,
        securityClassification: "Top Secret",
      },
      {
        id: "ORG-002",
        name: "Ministry of Defense",
        shortName: "MOD",
        type: "Ministry",
        region: "Saudi Arabia",
        parentOrganization: null,
        securityClassification: "Top Secret",
      },
      {
        id: "ORG-003",
        name: "Kuwait Oil Company",
        shortName: "KOC",
        type: "Corporation",
        region: "Kuwait",
        parentOrganization: null,
        securityClassification: "Confidential",
      },
      {
        id: "ORG-004",
        name: "Saudi Aramco",
        shortName: "Aramco",
        type: "Corporation",
        region: "Saudi Arabia",
        parentOrganization: null,
        securityClassification: "Confidential",
      },
      {
        id: "ORG-005",
        name: "Ministry of Foreign Affairs",
        shortName: "MOFA",
        type: "Ministry",
        region: "UAE",
        parentOrganization: null,
        securityClassification: "Secret",
      },
      {
        id: "ORG-006",
        name: "Dubai Ports World",
        shortName: "DP World",
        type: "Corporation",
        region: "UAE",
        parentOrganization: null,
        securityClassification: "Restricted",
      },
    ];

    setOrganizations(mockOrganizations);

    // Group organizations by type
    const grouped = mockOrganizations.reduce(
      (acc, org) => {
        if (!acc[org.type]) {
          acc[org.type] = [];
        }
        acc[org.type].push(org);
        return acc;
      },
      {} as Record<string, Organization[]>,
    );

    setGroupedOrganizations(grouped);
  }, []);

  const handleAddOrganization = (newOrganization: Organization) => {
    // In a real application, this would make an API call
    // For now, we'll just update the local state
    const updatedOrganizations = [...organizations, newOrganization];
    setOrganizations(updatedOrganizations);

    // Update grouped organizations
    const type = newOrganization.type;
    const updatedGrouped = { ...groupedOrganizations };
    if (!updatedGrouped[type]) {
      updatedGrouped[type] = [];
    }
    updatedGrouped[type].push(newOrganization);
    setGroupedOrganizations(updatedGrouped);
  };

  // Get security badge color based on classification
  const getSecurityBadgeColor = (classification: string) => {
    switch (classification) {
      case "Top Secret":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Secret":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "Confidential":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Restricted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "";
    }
  };

  // Filter organizations based on search query
  const filteredOrganizations =
    searchQuery.trim() === ""
      ? organizations
      : organizations.filter(
          (org) =>
            org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            org.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            org.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            org.region.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  return (
    <Card className="p-6" dir={t("direction")}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {t("organizationDirectory") || "Organization Directory"}
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={
                t("searchOrganizations") || "Search organizations..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            onClick={() => setIsAddOrganizationOpen(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            {t("addOrganization") || "Add Organization"}
          </Button>
        </div>
      </div>

      {searchQuery.trim() !== "" ? (
        // Show flat list when searching
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("organizationId") || "Organization ID"}</TableHead>
              <TableHead>{t("name") || "Name"}</TableHead>
              <TableHead>{t("type") || "Type"}</TableHead>
              <TableHead>{t("region") || "Region"}</TableHead>
              <TableHead>
                {t("securityClassification") || "Security Classification"}
              </TableHead>
              <TableHead>{t("actions") || "Actions"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrganizations.map((org) => (
              <TableRow key={org.id}>
                <TableCell>{org.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{org.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {org.shortName}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{org.type}</TableCell>
                <TableCell>{org.region}</TableCell>
                <TableCell>
                  <Badge
                    className={getSecurityBadgeColor(
                      org.securityClassification,
                    )}
                  >
                    {org.securityClassification}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectOrganization(org.id)}
                  >
                    {t("viewDetails") || "View Details"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        // Show grouped by type when not searching
        <div className="space-y-8">
          {Object.entries(groupedOrganizations).map(
            ([type, typeOrganizations]) => (
              <div key={type} className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">
                  {t(type) || type}
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {t("organizationId") || "Organization ID"}
                      </TableHead>
                      <TableHead>{t("name") || "Name"}</TableHead>
                      <TableHead>{t("region") || "Region"}</TableHead>
                      <TableHead>
                        {t("securityClassification") ||
                          "Security Classification"}
                      </TableHead>
                      <TableHead>{t("actions") || "Actions"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {typeOrganizations.map((org) => (
                      <TableRow key={org.id}>
                        <TableCell>{org.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Building2 className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{org.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {org.shortName}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{org.region}</TableCell>
                        <TableCell>
                          <Badge
                            className={getSecurityBadgeColor(
                              org.securityClassification,
                            )}
                          >
                            {org.securityClassification}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onSelectOrganization(org.id)}
                          >
                            {t("viewDetails") || "View Details"}
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

      <AddOrganizationDialog
        open={isAddOrganizationOpen}
        onOpenChange={setIsAddOrganizationOpen}
        onAddOrganization={handleAddOrganization}
      />
    </Card>
  );
}
