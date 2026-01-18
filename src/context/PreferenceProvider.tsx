"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

type PreferenceContextType = {
  preferences: Record<string, any>;
  setPreference: (key: string, value: any) => void;
  updatePreferences: (newPrefs: Record<string, any>) => void;
  isLoaded: boolean;
};

const PreferenceContext = createContext<PreferenceContextType | null>(null);

const STORAGE_KEY = "barestorePreference";

export function PreferenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preferences, setPreferences] = useState<Record<string, any>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setPreferences(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse preferences", e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Sync with other tabs (optional but good)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setPreferences(JSON.parse(e.newValue));
        } catch (e) {}
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const setPreference = useCallback((key: string, value: any) => {
    setPreferences((prev) => {
      const next = { ...prev, [key]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const updatePreferences = useCallback((newPrefs: Record<string, any>) => {
    setPreferences((prev) => {
      const next = { ...prev, ...newPrefs };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      preferences,
      setPreference,
      updatePreferences,
      isLoaded,
    }),
    [preferences, setPreference, updatePreferences, isLoaded]
  );

  return (
    <PreferenceContext.Provider value={value}>
      {children}
    </PreferenceContext.Provider>
  );
}

export function usePreferenceContext() {
  const context = useContext(PreferenceContext);
  if (!context) {
    throw new Error(
      "usePreferenceContext must be used within a PreferenceProvider"
    );
  }
  return context;
}
