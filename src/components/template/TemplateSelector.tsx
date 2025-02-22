import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { FileText, Mail, FileSpreadsheet } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const getTemplates = (t: (key: string) => string) => [
  {
    id: "formal-letter",
    name: t("formalLetter"),
    icon: FileText,
    description: t("formalLetterDesc"),
  },
  {
    id: "business-letter",
    name: t("businessLetter"),
    icon: FileSpreadsheet,
    description: t("businessLetterDesc"),
  },
  {
    id: "memo",
    name: t("internalMemo"),
    icon: Mail,
    description: t("internalMemoDesc"),
  },
];

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void;
}

const TemplateSelector = ({ onSelect }: TemplateSelectorProps) => {
  const { t, language } = useLanguage();
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-6",
        language === "ar" && "direction-rtl",
      )}
    >
      {getTemplates(t).map((template) => (
        <Card
          key={template.id}
          className="p-6 hover:border-primary/50 cursor-pointer transition-colors"
          onClick={() => onSelect(template.id)}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 rounded-full bg-primary/10">
              <template.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">{template.name}</h3>
            <p className="text-sm text-muted-foreground">
              {template.description}
            </p>
            <Button
              variant="outline"
              className={cn(
                "w-full",
                language === "ar" && "flex-row-reverse gap-2",
              )}
            >
              {t("useTemplate")}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TemplateSelector;
