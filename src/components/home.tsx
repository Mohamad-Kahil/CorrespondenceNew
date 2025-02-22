import React from "react";
import DocumentIntakeWizard from "./DocumentIntakeWizard";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="p-6 border-b">
          <h1 className="text-2xl font-semibold">
            {t("documentIntakeSystem")}
          </h1>
          <p className="text-muted-foreground mt-2">{t("intakeDescription")}</p>
        </header>

        <main>
          <DocumentIntakeWizard
            onComplete={(data) => {
              console.log("Document intake completed:", data);
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default Home;
