"use client";
import { useState } from "react";
import { Sidebar } from "@/components/layouts/Sidebar";
import { ThemeProvider } from "../context/ThemeContext";
import { Generalbar } from "@/components/layouts/Generalbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <html lang="es">
      <body className="antialiased min-h-screen bg-theme text-theme transition-colors">
        <ThemeProvider>
          <div className="flex min-h-screen">
            {/* Barra lateral fija */}
            <div className="fixed top-0 left-0 h-screen flex flex-row z-30">
              <Sidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </div>
            {/* Espacio reservado para la barra lateral y generalbar */}
            <div className="flex flex-1 ml-[100px]">
              <Generalbar />
              <main className="w-full">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
