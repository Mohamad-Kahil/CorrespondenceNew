import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { organizationData } from "./data";

export function OrganizationGeneralInfo() {
  const { t, language } = useLanguage();
  const { general } = organizationData;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("basicInformation") || "Basic Information"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="orgName">
                {t("organizationName") || "Organization Name"}
              </Label>
              <Input
                id="orgName"
                defaultValue={general.name}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="legalName">
                {t("legalName") || "Legal Name"}
              </Label>
              <Input
                id="legalName"
                defaultValue={general.legalName}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxId">{t("taxId") || "Tax ID"}</Label>
              <Input
                id="taxId"
                defaultValue={general.taxId}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">{t("industry") || "Industry"}</Label>
              <Input
                id="industry"
                defaultValue={general.industry}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="foundedDate">
                {t("foundedDate") || "Founded Date"}
              </Label>
              <Input
                id="foundedDate"
                type="date"
                defaultValue={general.foundedDate}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">
                {t("organizationSize") || "Organization Size"}
              </Label>
              <Input id="size" defaultValue={general.size} className="w-full" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              {t("description") || "Description"}
            </Label>
            <Textarea
              id="description"
              defaultValue={general.description}
              rows={4}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mission">{t("mission") || "Mission"}</Label>
            <Textarea
              id="mission"
              defaultValue={general.mission}
              rows={3}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vision">{t("vision") || "Vision"}</Label>
            <Textarea
              id="vision"
              defaultValue={general.vision}
              rows={3}
              className="w-full"
            />
          </div>

          <div className="flex justify-end">
            <Button>{t("saveChanges") || "Save Changes"}</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("legalStatus") || "Legal Status"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="legalForm">
                {t("legalForm") || "Legal Form"}
              </Label>
              <Input
                id="legalForm"
                defaultValue={general.legalStatus.legalForm}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationNumber">
                {t("registrationNumber") || "Registration Number"}
              </Label>
              <Input
                id="registrationNumber"
                defaultValue={general.legalStatus.registrationNumber}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationDate">
                {t("registrationDate") || "Registration Date"}
              </Label>
              <Input
                id="registrationDate"
                type="date"
                defaultValue={general.legalStatus.registrationDate}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationAuthority">
                {t("registrationAuthority") || "Registration Authority"}
              </Label>
              <Input
                id="registrationAuthority"
                defaultValue={general.legalStatus.registrationAuthority}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button>{t("saveChanges") || "Save Changes"}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
