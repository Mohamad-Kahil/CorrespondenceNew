import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "./tempo-routes";
import { MainLayout } from "./components/layout/MainLayout";
import { DocumentManagementLayout } from "./components/document-management/DocumentManagementLayout";
import TemplateLayout from "./components/template/TemplateLayout";
import { ExchangeLayout } from "./components/exchange/ExchangeLayout";
import { ExchangeLayout2 } from "./components/exchange/ExchangeLayout2";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./lib/i18n/LanguageContext";
import { AuthProvider } from "./components/auth/AuthProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { LoginPage } from "./components/auth/LoginPage";
import { WorkflowDashboard } from "./components/workflow/WorkflowDashboard";
import { WorkflowDesigner } from "./components/workflow/WorkflowDesigner";
import { ArchiveLayout } from "./components/archive/ArchiveLayout";
import { DigitalArchiveLayout } from "./components/digital-archive/DigitalArchiveLayout";
import { SystemAccessLayout } from "./components/system-access/SystemAccessLayout";
import { EmployeeProfileLayout } from "./components/employee-profile/EmployeeProfileLayout";
import { OrganizationLayout } from "./components/organizations/OrganizationLayout";
import { OrganizationInfoLayout } from "./components/organization-info/OrganizationInfoLayout";

function App() {
  // Handle Tempo routes
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  // Make sure we have a default route
  if (window.location.pathname === "/" && !import.meta.env.VITE_TEMPO) {
    window.location.href = "/login";
  }

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
                        <Route index element={<ExchangeLayout2 />} />
                        <Route path="exchange" element={<ExchangeLayout />} />
                        <Route
                          path="exchange/:folder"
                          element={<ExchangeLayout />}
                        />
                        <Route
                          path="exchange/:folder/:messageId"
                          element={<ExchangeLayout />}
                        />
                        <Route path="exchange2" element={<ExchangeLayout2 />} />
                        <Route
                          path="exchange2/:folder"
                          element={<ExchangeLayout2 />}
                        />
                        <Route
                          path="exchange2/:folder/:messageId"
                          element={<ExchangeLayout2 />}
                        />
                        <Route
                          path="workflow"
                          element={<WorkflowDashboard />}
                        />
                        <Route
                          path="workflow/design"
                          element={<WorkflowDesigner />}
                        />
                        <Route path="template" element={<TemplateLayout />} />
                        <Route
                          path="document-management"
                          element={<DocumentManagementLayout />}
                        />
                        <Route path="archive" element={<ArchiveLayout />} />
                        <Route
                          path="digital-archive"
                          element={<DigitalArchiveLayout />}
                        />
                        <Route
                          path="system-access"
                          element={<SystemAccessLayout />}
                        />
                        <Route
                          path="employee-profiles"
                          element={<EmployeeProfileLayout />}
                        />
                        <Route
                          path="organizations"
                          element={<OrganizationLayout />}
                        />
                        <Route
                          path="organization-info"
                          element={<OrganizationInfoLayout />}
                        />
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
