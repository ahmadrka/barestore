"use client";

import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

/**
 * Hook to manage a specific preference inside a shared object in localStorage.
 * @param key The key within the preference object.
 * @param defaultValue The value to use if the key isn't set yet.
 */
export default function usePreference(key: string, defaultValue?: any) {
  const [preferences, setPreferences] = useLocalStorage<Record<string, any>>(
    "barestorePreference",
    {}
  );

  // Get the current value or fallback to default
  const value =
    preferences[key] !== undefined ? preferences[key] : defaultValue;

  const setValue = (newValue: any) => {
    setPreferences({
      ...preferences,
      [key]: newValue,
    });
  };

  return [value, setValue] as const;
}
