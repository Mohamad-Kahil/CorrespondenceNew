import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./lib/i18n/LanguageContext";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./components/auth/AuthProvider";

import { TempoDevtools } from "tempo-devtools";

// Initialize Tempo only in development
if (import.meta.env.DEV) {
  TempoDevtools.init();
}

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
