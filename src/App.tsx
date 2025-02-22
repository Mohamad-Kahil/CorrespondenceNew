import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { MainLayout } from "./components/layout/MainLayout";
import DispatchLayout from "./components/dispatch/DispatchLayout";
import TemplateLayout from "./components/template/TemplateLayout";
import { ExchangeLayout } from "./components/exchange/ExchangeLayout";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./components/auth/AuthProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { LoginPage } from "./components/auth/LoginPage";
import { WorkflowDashboard } from "./components/workflow/WorkflowDashboard";

function App() {
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <ThemeProvider>
      <AuthProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    {tempoRoutes}
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
                      <Route path="workflow" element={<WorkflowDashboard />} />
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
  );
}

export default App;
