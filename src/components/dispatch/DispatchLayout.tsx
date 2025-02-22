import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card } from "../ui/card";
import DispatchWizard from "./DispatchWizard";

const DispatchLayout = () => {
  const { t } = useLanguage();
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="p-6 border-b">
          <h1 className="text-2xl font-semibold">
            {t("documentDispatchSystem")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("dispatchDescription")}
          </p>
        </header>

        <main>
          <DispatchWizard
            onComplete={(data) => {
              console.log("Document dispatch completed:", data);
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default DispatchLayout;
