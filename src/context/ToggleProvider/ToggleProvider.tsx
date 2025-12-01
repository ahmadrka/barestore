"use client";

import { createContext, useState, useEffect } from "react";

type ToggleContextProp = {
  panelNavbar: boolean;
  togglePanelNavbar: () => void;
};

export const ToggleContext = createContext<ToggleContextProp | null>(null);

export default function ToggleProvider({ children }: { children: React.ReactNode }) {
  const [panelNavbar, setPanelNavbar] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("panelNavbar");
    if (saved !== null) {
      setPanelNavbar(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("panelNavbar", JSON.stringify(panelNavbar));
    }
  }, [panelNavbar, loaded]);

  const togglePanelNavbar = () => {
    setPanelNavbar(prev => !prev);
  };

  return (
    <ToggleContext.Provider value={{ panelNavbar, togglePanelNavbar }}>
      {children}
    </ToggleContext.Provider>
  );
}
