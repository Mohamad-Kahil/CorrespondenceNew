import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface PhysicalStorageStepProps {
  documentData: any;
  updateDocumentData: (data: any) => void;
  onNext: () => void;
  processType: "inbound" | "outbound";
}

export function PhysicalStorageStep({
  documentData,
  updateDocumentData,
  onNext,
  processType,
}: PhysicalStorageStepProps) {
  const { t } = useLanguage();
  const [location, setLocation] = useState<string>("");
  const [store, setStore] = useState<string>("");
  const [cabinet, setCabinet] = useState<string>("");
  const [drawer, setDrawer] = useState<string>("");
  const [confirmationStep, setConfirmationStep] = useState(false);
  const [error, setError] = useState<string>("");

  // Mock data for storage options
  const locations = ["L01", "L02", "L03"];
  const stores = {
    L01: ["S001", "S002", "S003"],
    L02: ["S004", "S005"],
    L03: ["S006", "S007", "S008"],
  };
  const cabinets = {
    S001: ["C0001", "C0002"],
    S002: ["C0003", "C0004"],
    S003: ["C0005"],
    S004: ["C0006", "C0007"],
    S005: ["C0008"],
    S006: ["C0009", "C0010"],
    S007: ["C0011"],
    S008: ["C0012", "C0013"],
  };
  const drawers = {
    C0001: ["D01", "D02", "D03"],
    C0002: ["D04", "D05"],
    C0003: ["D06", "D07"],
    C0004: ["D08", "D09"],
    C0005: ["D10", "D11"],
    C0006: ["D12", "D13"],
    C0007: ["D14", "D15"],
    C0008: ["D16", "D17"],
    C0009: ["D18", "D19"],
    C0010: ["D20", "D21"],
    C0011: ["D22", "D23"],
    C0012: ["D24", "D25"],
    C0013: ["D26", "D27"],
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    setStore("");
    setCabinet("");
    setDrawer("");
    setError("");
  };

  const handleStoreChange = (value: string) => {
    setStore(value);
    setCabinet("");
    setDrawer("");
    setError("");
  };

  const handleCabinetChange = (value: string) => {
    setCabinet(value);
    setDrawer("");
    setError("");
  };

  const handleDrawerChange = (value: string) => {
    setDrawer(value);
    setError("");
  };

  const handleContinue = () => {
    if (!location || !store || !cabinet || !drawer) {
      setError(
        t("selectAllStorageLevels") || "Please select all storage levels",
      );
      return;
    }

    setConfirmationStep(true);
  };

  const handleConfirm = (confirmed: boolean) => {
    if (confirmed) {
      const storageAddress = `${location}${store}${cabinet}${drawer}`;
      updateDocumentData({ storageAddress });
      onNext();
    } else {
      setConfirmationStep(false);
      setLocation("");
      setStore("");
      setCabinet("");
      setDrawer("");
    }
  };

  if (confirmationStep) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          {t("confirmStorageLocation") || "Confirm Storage Location"}
        </h2>

        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>
            {t("selectedStorageLocation") || "Selected Storage Location"}
          </AlertTitle>
          <AlertDescription>
            {t("youHaveSelected") || "You have selected"}: {location} &gt;{" "}
            {store} &gt; {cabinet} &gt; {drawer}
          </AlertDescription>
        </Alert>

        <p>{t("isThisCorrect") || "Is this correct?"}</p>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => handleConfirm(false)}>
            {t("no") || "No"}
          </Button>
          <Button onClick={() => handleConfirm(true)}>
            {t("yes") || "Yes"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        {processType === "inbound"
          ? t("selectPhysicalStorageLocation") ||
            "Select Physical Storage Location"
          : t("selectRetainedCopyStorage") ||
            "Select Storage for Retained Copy"}
      </h2>

      <p className="text-muted-foreground">
        {processType === "inbound"
          ? t("selectStorageLocationInstructions") ||
            "Please select a physical storage location for the document."
          : t("selectRetainedCopyInstructions") ||
            "Please select a storage location for the retained copy of the document."}
      </p>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("error") || "Error"}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="location">
            {t("selectLocation") || "Select Location"}
          </Label>
          <Select value={location} onValueChange={handleLocationChange}>
            <SelectTrigger id="location">
              <SelectValue
                placeholder={t("selectLocation") || "Select Location"}
              />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="store">{t("selectStore") || "Select Store"}</Label>
          <Select
            value={store}
            onValueChange={handleStoreChange}
            disabled={!location}
          >
            <SelectTrigger id="store">
              <SelectValue placeholder={t("selectStore") || "Select Store"} />
            </SelectTrigger>
            <SelectContent>
              {location &&
                stores[location as keyof typeof stores]?.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cabinet">
            {t("selectCabinet") || "Select Cabinet"}
          </Label>
          <Select
            value={cabinet}
            onValueChange={handleCabinetChange}
            disabled={!store}
          >
            <SelectTrigger id="cabinet">
              <SelectValue
                placeholder={t("selectCabinet") || "Select Cabinet"}
              />
            </SelectTrigger>
            <SelectContent>
              {store &&
                cabinets[store as keyof typeof cabinets]?.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="drawer">{t("selectDrawer") || "Select Drawer"}</Label>
          <Select
            value={drawer}
            onValueChange={handleDrawerChange}
            disabled={!cabinet}
          >
            <SelectTrigger id="drawer">
              <SelectValue placeholder={t("selectDrawer") || "Select Drawer"} />
            </SelectTrigger>
            <SelectContent>
              {cabinet &&
                drawers[cabinet as keyof typeof drawers]?.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleContinue}>{t("continue") || "Continue"}</Button>
      </div>
    </div>
  );
}
