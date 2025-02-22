import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Plus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function StorageAddressManager() {
  const { t } = useLanguage();
  const [site, setSite] = useState("");
  const [store, setStore] = useState("");
  const [unit, setUnit] = useState("");

  const generateAddress = () => {
    const locationNum = site.padStart(2, "0");
    const storeNum = store.padStart(3, "0");
    const unitNum = unit.padStart(4, "0");
    return `L${locationNum}S${storeNum}U${unitNum}`;
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">
        {t("createStorageAddress")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label>{t("site")}</Label>
          <Select onValueChange={setSite} value={site}>
            <SelectTrigger>
              <SelectValue placeholder={t("selectSite")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Site 01</SelectItem>
              <SelectItem value="2">Site 02</SelectItem>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {}}
              >
                <Plus className="h-4 w-4 mr-2" />
                {t("addNewSite")}
              </Button>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>{t("store")}</Label>
          <Select onValueChange={setStore} value={store}>
            <SelectTrigger>
              <SelectValue placeholder={t("selectStore")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Store 001</SelectItem>
              <SelectItem value="2">Store 002</SelectItem>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {}}
              >
                <Plus className="h-4 w-4 mr-2" />
                {t("addNewStore")}
              </Button>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>{t("unit")}</Label>
          <Select onValueChange={setUnit} value={unit}>
            <SelectTrigger>
              <SelectValue placeholder={t("selectUnit")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Unit 0001</SelectItem>
              <SelectItem value="2">Unit 0002</SelectItem>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {}}
              >
                <Plus className="h-4 w-4 mr-2" />
                {t("addNewUnit")}
              </Button>
            </SelectContent>
          </Select>
        </div>
      </div>

      {(site || store || unit) && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            {t("generatedAddress")}:
          </p>
          <p className="text-lg font-mono font-bold mt-1">
            {generateAddress()}
          </p>
        </div>
      )}
    </Card>
  );
}
