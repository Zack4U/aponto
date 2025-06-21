import React from "react";
import {
  Home,
  List,
  Settings,
  Bell,
  Users,
  BarChart3,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "tickets", label: "Tickets", icon: List },
  { id: "analytics", label: "Análisis", icon: BarChart3 },
  { id: "users", label: "Usuarios", icon: Users },
  { id: "notifications", label: "Notificaciones", icon: Bell },
  { id: "settings", label: "Configuración", icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-20 rounded-3xl flex flex-col items-center py-6 space-y-4 ml-4 my-5 bg-theme-alt">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105",
              isActive
                ? "bg-theme-light text-theme-light shadow-lg"
                : "bg-theme text-theme-alt hover:bg-theme-light hover:text-theme-light"
            )}
            title={item.label}
          >
            <Icon size={24} />
          </button>
        );
      })}
      <button
        onClick={toggleTheme}
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105 bg-theme text-theme-alt hover:bg-theme-light hover:text-theme-light"
        )}
        aria-label={theme === "dark" ? "light" : "dark"}
      >
        {theme === "dark" ? (
          <Sun size={20} className="text-yellow-400" />
        ) : (
          <Moon size={20} className="text-theme-alt" />
        )}
      </button>
    </div>
  );
};
