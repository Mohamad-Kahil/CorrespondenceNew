import { createContext, useContext, useState } from "react";

type Language = "en" | "es" | "fr";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const initialState: LanguageContextType = {
  language: "en",
  setLanguage: () => null,
};

const LanguageContext = createContext<LanguageContextType>(initialState);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const value = {
    language,
    setLanguage: (language: Language) => {
      setLanguage(language);
    },
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};
