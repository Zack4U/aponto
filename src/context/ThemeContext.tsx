import React, { createContext, useContext, useState, useEffect } from "react";

// Tipos para el tema
export type Theme = "light" | "dark";

interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryDark: string;
  background: string;
  backgroundAlt: string;
  text: string;
  textAlt: string;
  textPrimary: string;
  textLight: string;
  textDark: string;
  border: string;
  glass: string;
  glassBorder: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: ThemeColors;
}

// Solo tonos morados para Aponto
const lightColors: ThemeColors = {
  primary: "#7c3aed", // morado principal
  primaryHover: "#6d28d9", // morado más oscuro
  primaryLight: "#a78bfa", // morado claro
  primaryDark: "#4c1d95", // morado profundo
  background: "#fff",
  backgroundAlt: "#e1e1e1e1",
  text: "#171717",
  textAlt: "#4b5563",
  textPrimary: "#6d28d9",
  textLight: "#fff",
  textDark: "#171717",
  border: "#e5e7eb",
  glass: "rgba(237, 233, 254, 0.6)",
  glassBorder: "rgba(226, 232, 240, 0.25)",
};

const darkColors: ThemeColors = {
  primary: "#6d28d9", // morado más oscuro que el light
  primaryHover: "#4c1d95", // aún más oscuro
  primaryLight: "#7c3aed", // tono intermedio, más oscuro que el light
  primaryDark: "#3b176b", // morado profundo, más oscuro
  background: "#18181b",
  backgroundAlt: "#27272a",
  text: "#ededed",
  textAlt: "#a1a1aa",
  textPrimary: "#a78bfa",
  textLight: "#fff",
  textDark: "#171717",
  border: "#27272a",
  glass: "rgba(49, 46, 129, 0.6)",
  glassBorder: "rgba(39, 39, 42, 0.25)",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // El tema inicia como undefined para evitar mismatch SSR/CSR
  const [theme, setTheme] = useState<Theme | undefined>(undefined);

  useEffect(() => {
    // Solo se ejecuta en cliente
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    setTheme((savedTheme as Theme) || systemTheme);
  }, []);

  const colors = theme === "dark" ? darkColors : lightColors;

  useEffect(() => {
    if (!theme) return;
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Actualizar variables CSS
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [theme, colors]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Evitar renderizar hijos hasta que el tema esté definido
  if (!theme) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
