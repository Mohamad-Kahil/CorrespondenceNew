import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RecipientFormStepProps {
  documentData: any;
  updateDocumentData: (data: any) => void;
  onNext: () => void;
}

export function RecipientFormStep({
  documentData,
  updateDocumentData,
  onNext,
}: RecipientFormStepProps) {
  const { t } = useLanguage();
  const [recipientName, setRecipientName] = useState(
    documentData.recipientName || "",
  );
  const [recipientTitle, setRecipientTitle] = useState(
    documentData.recipientTitle || "",
  );
  const [recipientOrganization, setRecipientOrganization] = useState(
    documentData.recipientOrganization || "",
  );
  const [deliveryMethod, setDeliveryMethod] = useState(
    documentData.deliveryMethod || "",
  );
  const [deliveryAddress, setDeliveryAddress] = useState(
    documentData.deliveryAddress || "",
  );
  const [contactEmail, setContactEmail] = useState(
    documentData.contactEmail || "",
  );
  const [contactPhone, setContactPhone] = useState(
    documentData.contactPhone || "",
  );
  const [specialInstructions, setSpecialInstructions] = useState(
    documentData.specialInstructions || "",
  );
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (
      !recipientName ||
      !recipientOrganization ||
      !deliveryMethod ||
      !deliveryAddress
    ) {
      setError(t("fillRequiredFields") || "Please fill all required fields");
      return;
    }

    updateDocumentData({
      recipientName,
      recipientTitle,
      recipientOrganization,
      deliveryMethod,
      deliveryAddress,
      contactEmail,
      contactPhone,
      specialInstructions,
    });

    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        {t("recipientFormPreparation") || "Recipient Form Preparation"}
      </h2>

      <p className="text-muted-foreground">
        {t("recipientFormInstructions") ||
          "Provide the recipient details: full name, title, organization/department, delivery address, contact information, delivery method, and any special instructions."}
      </p>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("error") || "Error"}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="recipientName" className="flex items-center">
              {t("recipientName") || "Recipient Name"}
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Input
              id="recipientName"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder={t("enterRecipientName") || "Enter recipient's name"}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipientTitle">
              {t("recipientTitle") || "Recipient Title"}
            </Label>
            <Input
              id="recipientTitle"
              value={recipientTitle}
              onChange={(e) => setRecipientTitle(e.target.value)}
              placeholder={
                t("enterRecipientTitle") || "Enter recipient's title"
              }
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="recipientOrganization"
              className="flex items-center"
            >
              {t("recipientOrganization") ||
                "Recipient Organization/Department"}
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Input
              id="recipientOrganization"
              value={recipientOrganization}
              onChange={(e) => setRecipientOrganization(e.target.value)}
              placeholder={
                t("enterRecipientOrganization") ||
                "Enter recipient's organization or department"
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryMethod" className="flex items-center">
              {t("deliveryMethod") || "Delivery Method"}
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Select
              value={deliveryMethod}
              onValueChange={(value) => setDeliveryMethod(value)}
            >
              <SelectTrigger id="deliveryMethod">
                <SelectValue
                  placeholder={
                    t("selectDeliveryMethod") || "Select delivery method"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mail">{t("mail") || "Mail"}</SelectItem>
                <SelectItem value="courier">
                  {t("courier") || "Courier"}
                </SelectItem>
                <SelectItem value="diplomaticPouch">
                  {t("diplomaticPouch") || "Diplomatic Pouch"}
                </SelectItem>
                <SelectItem value="handDelivery">
                  {t("handDelivery") || "Hand Delivery"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="deliveryAddress" className="flex items-center">
            {t("deliveryAddress") || "Delivery Address"}
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Textarea
            id="deliveryAddress"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder={
              t("enterDeliveryAddress") || "Enter complete delivery address"
            }
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contactEmail">
              {t("contactEmail") || "Contact Email"}
            </Label>
            <Input
              id="contactEmail"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder={t("enterContactEmail") || "Enter contact email"}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPhone">
              {t("contactPhone") || "Contact Phone"}
            </Label>
            <Input
              id="contactPhone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder={t("enterContactPhone") || "Enter contact phone"}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialInstructions">
            {t("specialInstructions") || "Special Instructions"}
          </Label>
          <Textarea
            id="specialInstructions"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder={
              t("enterSpecialInstructions") ||
              "Enter any special delivery instructions"
            }
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit}>{t("continue") || "Continue"}</Button>
      </div>
    </div>
  );
}
