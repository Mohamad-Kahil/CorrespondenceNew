import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { MainLayout } from "./components/layout/MainLayout";
import DispatchLayout from "./components/dispatch/DispatchLayout";
import TemplateLayout from "./components/template/TemplateLayout";
import { ExchangeLayout } from "./components/exchange/ExchangeLayout";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./lib/i18n/LanguageContext";
import { AuthProvider } from "./components/auth/AuthProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { LoginPage } from "./components/auth/LoginPage";
import { WorkflowDashboard } from "./components/workflow/WorkflowDashboard";

function App() {
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            }
          >
            {tempoRoutes}
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Routes>
                        <Route index element={<Home />} />
                        <Route path="exchange" element={<ExchangeLayout />} />
                        <Route
                          path="exchange/:folder"
                          element={<ExchangeLayout />}
                        />
                        <Route
                          path="exchange/:folder/:messageId"
                          element={<ExchangeLayout />}
                        />
                        <Route
                          path="workflow"
                          element={<WorkflowDashboard />}
                        />
                        <Route path="template" element={<TemplateLayout />} />
                        <Route path="dispatch" element={<DispatchLayout />} />
                      </Routes>
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
