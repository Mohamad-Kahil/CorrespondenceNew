import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  InboxIcon,
  RefreshCcw,
  Workflow,
  FileText,
  Send,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeProvider";
import { useAuth } from "../auth/AuthProvider";

const menuItems = [
  {
    name: "Inbound Document",
    icon: InboxIcon,
    path: "/",
  },
  {
    name: "Exchange System",
    icon: RefreshCcw,
    path: "/exchange",
  },
  {
    name: "Workflow",
    icon: Workflow,
    path: "/workflow",
  },
  {
    name: "Template",
    icon: FileText,
    path: "/template",
  },
  {
    name: "Dispatch",
    icon: Send,
    path: "/dispatch",
  },
];

export function Sidebar() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-card border-r border-border p-4 flex flex-col">
      <div className="mb-8 flex justify-between items-center px-4">
        <h2 className="text-lg font-semibold text-primary">
          Document Management
        </h2>
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
              <Link to={item.path}>
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          );
        })}
      </div>

      <div className="pt-4 border-t border-border space-y-2">
        <div className="px-4 py-2">
          <p className="text-sm text-muted-foreground">Signed in as</p>
          <p className="text-sm font-medium text-foreground">{user?.email}</p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-destructive hover:text-destructive/80"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
