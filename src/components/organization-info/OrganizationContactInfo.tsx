import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { organizationData } from "./data";
import { Trash } from "lucide-react";

export function OrganizationContactInfo() {
  const { t, language } = useLanguage();
  const { contact } = organizationData;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {t("primaryContactInformation") || "Primary Contact Information"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">{t("email") || "Email"}</Label>
              <Input
                id="email"
                type="email"
                defaultValue={contact.email}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t("phone") || "Phone"}</Label>
              <Input
                id="phone"
                defaultValue={contact.phone}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fax">{t("fax") || "Fax"}</Label>
              <Input id="fax" defaultValue={contact.fax} className="w-full" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">{t("website") || "Website"}</Label>
              <Input
                id="website"
                defaultValue={contact.website}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button>{t("saveChanges") || "Save Changes"}</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("addresses") || "Addresses"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {contact.addresses.map((address, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">
                  {t(address.type) || address.type}
                </h3>
                <Button variant="ghost" size="sm">
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`street-${index}`}>
                    {t("street") || "Street"}
                  </Label>
                  <Input
                    id={`street-${index}`}
                    defaultValue={address.street}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`city-${index}`}>{t("city") || "City"}</Label>
                  <Input
                    id={`city-${index}`}
                    defaultValue={address.city}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`state-${index}`}>
                    {t("state") || "State/Province"}
                  </Label>
                  <Input
                    id={`state-${index}`}
                    defaultValue={address.state}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`postalCode-${index}`}>
                    {t("postalCode") || "Postal Code"}
                  </Label>
                  <Input
                    id={`postalCode-${index}`}
                    defaultValue={address.postalCode}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`country-${index}`}>
                    {t("country") || "Country"}
                  </Label>
                  <Input
                    id={`country-${index}`}
                    defaultValue={address.country}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <Button variant="outline">
              {t("addNewAddress") || "Add New Address"}
            </Button>
            <Button>{t("saveChanges") || "Save Changes"}</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("socialMedia") || "Social Media"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contact.socialMedia.map((social, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`social-${index}`}>{social.platform}</Label>
                <Input
                  id={`social-${index}`}
                  defaultValue={social.url}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <Button variant="outline">
              {t("addSocialMedia") || "Add Social Media"}
            </Button>
            <Button>{t("saveChanges") || "Save Changes"}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
