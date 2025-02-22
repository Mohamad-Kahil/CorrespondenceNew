import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Printer, RefreshCw } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";

interface BarcodeGeneratorProps {
  documentId?: string;
  onGenerate?: () => void;
  onPrint?: () => void;
}

const BarcodeGenerator = ({
  documentId = "DOC-2024-001",
  onGenerate = () => console.log("Generate barcode"),
  onPrint = () => console.log("Print barcode"),
}: BarcodeGeneratorProps) => {
  const { t, language } = useLanguage();

  return (
    <Card className="w-[400px] h-[300px] p-6 bg-card border border-border flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t("generateBarcode")}</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onGenerate}
                className="h-8 w-8"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("regenerateBarcode")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex-1 flex items-center justify-center border rounded-md bg-background/50">
        {/* Placeholder for barcode image */}
        <svg
          className="w-48 h-24"
          viewBox="0 0 100 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="10" y="5" width="2" height="40" fill="black" />
          <rect x="15" y="5" width="1" height="40" fill="black" />
          <rect x="20" y="5" width="3" height="40" fill="black" />
          <rect x="25" y="5" width="2" height="40" fill="black" />
          <rect x="30" y="5" width="1" height="40" fill="black" />
          <rect x="35" y="5" width="3" height="40" fill="black" />
          <rect x="40" y="5" width="2" height="40" fill="black" />
          <rect x="45" y="5" width="1" height="40" fill="black" />
          <text x="50" y="48" fontSize="6" fill="black" textAnchor="middle">
            {documentId}
          </text>
        </svg>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onPrint}
          className={cn(
            "w-full",
            language === "ar" && "flex-row-reverse gap-2",
          )}
        >
          <Printer className="h-4 w-4" />
          {t("printBarcode")}
        </Button>
      </div>
    </Card>
  );
};

export default BarcodeGenerator;
