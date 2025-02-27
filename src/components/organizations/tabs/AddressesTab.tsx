import React from "react";
import { Card } from "../../ui/card";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { MapPin } from "lucide-react";

interface AddressesTabProps {
  addresses: any[];
}

export function AddressesTab({ addresses }: AddressesTabProps) {
  const { t } = useLanguage();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        {t("officeAddresses") || "Office Addresses"}
      </h3>

      <div className="space-y-6">
        {addresses.map((address) => (
          <div key={address.id} className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>

              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h5 className="font-semibold">{address.name}</h5>
                    <p className="text-sm text-muted-foreground">
                      {address.id}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <h6 className="text-sm font-medium">
                    {t("addressDetails") || "Address Details"}
                  </h6>
                  <div className="space-y-2 mt-2">
                    <p className="text-sm">
                      <span className="text-muted-foreground">
                        {t("fullAddress") || "Full Address"}:
                      </span>{" "}
                      {address.fullAddress}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">
                        {t("phone") || "Phone"}:
                      </span>{" "}
                      {address.contact.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
