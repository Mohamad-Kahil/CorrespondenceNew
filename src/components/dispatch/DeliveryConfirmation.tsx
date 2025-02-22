import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { FileText, Camera, Upload } from "lucide-react";
import DocumentPreviewPanel from "../DocumentPreviewPanel";

interface DeliveryConfirmationProps {
  onConfirm: (data: any) => void;
}

const DeliveryConfirmation = ({ onConfirm }: DeliveryConfirmationProps) => {
  const { t } = useLanguage();
  const [scannedImage, setScannedImage] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [signature, setSignature] = useState("");

  const handleScan = () => {
    // Simulate scanning - in real app would integrate with scanner API
    setScannedImage(
      "https://images.unsplash.com/photo-1586941962765-d3896cc85ac8?w=800&auto=format&fit=crop",
    );
  };

  const handleConfirm = () => {
    onConfirm({
      scannedImage,
      notes,
      signature,
      confirmedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {t("deliveryConfirmation")}
            </h3>
            <div className="space-x-2">
              <Button onClick={handleScan} variant="outline">
                <Camera className="w-4 h-4 mr-2" />
                {t("scanDocument")}
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                {t("uploadDocument")}
              </Button>
            </div>
          </div>

          {scannedImage && (
            <div className="mt-4">
              <DocumentPreviewPanel
                documentImage={scannedImage}
                ocrText="Delivery confirmation document content..."
              />
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t("deliveryNotes")}</Label>
              <Textarea
                placeholder={t("enterDeliveryNotes")}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>{t("recipientSignature")}</Label>
              <Input
                placeholder={t("recipientSignature")}
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleConfirm} disabled={!scannedImage || !signature}>
          {t("confirmDelivery")}
        </Button>
      </div>
    </div>
  );
};

export default DeliveryConfirmation;
