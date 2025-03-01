import React, { useState } from "react";
import TemplateSelector from "./TemplateSelector";
import LetterTemplate from "./LetterTemplate";
import { Button } from "../ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const TemplateLayout = () => {
  const { t, language } = useLanguage();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleCancel = () => {
    setSelectedTemplate(null);
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "formal-letter":
        return <LetterTemplate type="formal" onCancel={handleCancel} />;
      case "business-letter":
        return <LetterTemplate type="business" onCancel={handleCancel} />;
      case "memo":
        return <LetterTemplate type="memo" onCancel={handleCancel} />;
      default:
        return (
          <div className="p-6 space-y-6">
            <header className="p-6 border-b -mx-6 -mt-6 mb-6">
              <h1 className="text-2xl font-semibold">
                {t("documentTemplateSystem")}
              </h1>
            </header>
            <TemplateSelector onSelect={setSelectedTemplate} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {selectedTemplate && (
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-semibold">
            {selectedTemplate
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}{" "}
            Template
          </h1>
        </div>
      )}
      {renderTemplate()}
    </div>
  );
};

export default TemplateLayout;
