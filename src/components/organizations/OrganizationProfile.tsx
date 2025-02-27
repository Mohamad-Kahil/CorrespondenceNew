import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { OverviewTab } from "./tabs/OverviewTab";
import { PersonnelTab } from "./tabs/PersonnelTab";
import { AddressesTab } from "./tabs/AddressesTab";
import { AdditionalInfoTab } from "./tabs/AdditionalInfoTab";
import { Building2 } from "lucide-react";

interface OrganizationProfileProps {
  organizationId: string;
}

export function OrganizationProfile({
  organizationId,
}: OrganizationProfileProps) {
  const { t } = useLanguage();
  const [organization, setOrganization] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use mock data
    const mockOrganization = {
      id: organizationId,
      name: "Ministry of Interior",
      shortName: "MOI",
      type: "Ministry",
      region: "Kuwait",
      parentOrganization: null,
      securityClassification: "Top Secret",
      designatedPersonnel: [
        {
          id: "PER-00123",
          fullName: "Ahmed Al-Sabah",
          position: "Director",
          department: "International Relations",
          contact: {
            primaryEmail: "ahmed.alsabah@moi.gov.kw",
            secondaryEmail: "ahmed.alsabah@gmail.com",
            phone: "+965-2222-3333",
            mobile: "+965-9999-8888",
            fax: "+965-2222-4444",
          },
          officeAddressRef: "ADDR-001",
          accessLevel: {
            securityClearance: "5",
            authorizationLevel: "Top Secret",
            systemRoles: ["Admin", "Approver"],
          },
          status: "Active",
        },
        {
          id: "PER-00124",
          fullName: "Fatima Al-Rashid",
          position: "Deputy Director",
          department: "International Relations",
          contact: {
            primaryEmail: "fatima.alrashid@moi.gov.kw",
            secondaryEmail: "",
            phone: "+965-2222-3334",
            mobile: "+965-9999-7777",
            fax: "+965-2222-4444",
          },
          officeAddressRef: "ADDR-001",
          accessLevel: {
            securityClearance: "4",
            authorizationLevel: "Secret",
            systemRoles: ["Approver"],
          },
          status: "Active",
        },
      ],
      officeAddresses: [
        {
          id: "ADDR-001",
          name: "Headquarters",
          fullAddress:
            "Block 1, Street 2, Building 3, Floor 4, Kuwait City, Kuwait",
          contact: {
            phone: "+965-2222-3333",
          },
        },
        {
          id: "ADDR-002",
          name: "Regional Office",
          fullAddress: "Block 5, Street 6, Building 7, Floor 2, Jahra, Kuwait",
          contact: {
            phone: "+965-2222-5555",
          },
        },
      ],
      additionalInformation: {
        preferredLanguage: "Arabic",
        timeZone: "Kuwait/Riyadh",
        businessHours: "Sunday-Thursday: 08:00-16:00",
        notes:
          "Main government ministry responsible for internal security and law enforcement in Kuwait.",
      },
    };

    setOrganization(mockOrganization);
    setLoading(false);
  }, [organizationId]);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  if (!organization) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold mb-2">Organization Not Found</h2>
          <p className="text-muted-foreground">
            The organization with ID {organizationId} could not be found.
          </p>
        </div>
      </Card>
    );
  }

  // Function to get security badge color based on classification
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

  return (
    <div className="space-y-6" dir={t("direction")}>
      <Card className="p-6">
        <div className="flex items-start gap-6">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Building2 className="h-8 w-8 text-primary" />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{organization.name}</h2>
                <p className="text-muted-foreground">
                  {organization.type} • {organization.region}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant="outline" className="text-sm">
                  ID: {organization.id}
                </Badge>
                <Badge
                  className={getSecurityBadgeColor(
                    organization.securityClassification,
                  )}
                >
                  {organization.securityClassification}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("shortName") || "Short Name"}
                </p>
                <p className="font-medium">{organization.shortName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("personnel") || "Personnel"}
                </p>
                <p className="font-medium">
                  {organization.designatedPersonnel.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("addresses") || "Addresses"}
                </p>
                <p className="font-medium">
                  {organization.officeAddresses.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4" dir={t("direction")}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">
            {t("organizationOverview") || "Organization Overview"}
          </TabsTrigger>
          <TabsTrigger value="personnel">
            {t("designatedPersonnel") || "Designated Personnel"}
          </TabsTrigger>
          <TabsTrigger value="addresses">
            {t("officeAddresses") || "Office Addresses"}
          </TabsTrigger>
          <TabsTrigger value="additional">
            {t("additionalInformation") || "Additional Information"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab organization={organization} />
        </TabsContent>

        <TabsContent value="personnel">
          <PersonnelTab personnel={organization.designatedPersonnel} />
        </TabsContent>

        <TabsContent value="addresses">
          <AddressesTab addresses={organization.officeAddresses} />
        </TabsContent>

        <TabsContent value="additional">
          <AdditionalInfoTab
            additionalInfo={organization.additionalInformation}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
