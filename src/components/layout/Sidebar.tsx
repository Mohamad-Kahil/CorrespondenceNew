import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  InboxIcon,
  RefreshCcw,
  Workflow,
  FileText,
  Moon,
  Sun,
  LogOut,
  Languages,
  Archive,
  Settings2,
  User,
  Building2,
} from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeProvider";
import { useAuth } from "../auth/AuthProvider";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const menuItems = [
  {
    name: "exchangeSystem",
    icon: RefreshCcw,
    path: "/exchange2",
  },
  {
    name: "workflow",
    icon: Workflow,
    path: "/workflow",
  },
  {
    name: "workflowDesign",
    icon: Settings2,
    path: "/workflow/design",
  },
  {
    name: "templates",
    icon: FileText,
    path: "/template",
  },
  {
    name: "inboundOutboundDocuments",
    icon: InboxIcon,
    path: "/document-management",
  },
  {
    name: "archiveStorage",
    icon: Archive,
    path: "/archive",
  },
  {
    name: "digitalArchive",
    icon: FileText,
    path: "/digital-archive",
  },
  {
    name: "systemAccess",
    icon: Settings2,
    path: "/system-access",
  },
  {
    name: "employeeProfiles",
    icon: User,
    path: "/employee-profiles",
  },
  {
    name: "Organizations",
    icon: Building2,
    path: "/organizations",
  },
  {
    name: "organizationInfo",
    icon: Building2,
    path: "/organization-info",
  },
];

export function Sidebar() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-card border-x border-border p-4 flex flex-col">
      <div className="mb-8 flex items-center justify-between px-4">
        <h2 className="text-lg font-semibold text-alert">Micro Digits</h2>
        <h2 className="text-lg font-semibold text-primary">
          {t("documentManagement")}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
          >
            <Languages className="h-4 w-4 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-primary" />
            ) : (
              <Moon className="h-4 w-4 text-primary" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.name}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2 text-primary hover:text-primary/80",
                isActive && "bg-secondary/50 text-primary font-medium",
              )}
              asChild
            >
              <Link to={item.path} className="flex items-center w-full gap-2">
                <item.icon className="h-4 w-4" />
                {t(item.name)}
              </Link>
            </Button>
          );
        })}
      </div>

      <div className="pt-4 border-t border-border space-y-2">
        <div className="px-4 py-2">
          <p className="text-sm text-muted-foreground">{t("signedInAs")}</p>
          <p className="text-sm font-medium text-foreground">{user?.email}</p>
        </div>
        <Button
          variant="ghost"
          className="w-full gap-2 text-destructive hover:text-destructive/80"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          {t("signOut")}
        </Button>
      </div>
    </div>
  );
}
