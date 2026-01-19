"use client";

import { useEffect, useState, useCallback } from "react";

export default function useLocalStorage<T>(key: string, initial: T) {
  // Use a lazy initializer to read from localStorage immediately on the client
  const [value, setValue] = useState<T>(initial);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        try {
          setValue(JSON.parse(stored));
        } catch (error) {
          setValue(stored as unknown as T);
        }
      }
      setIsLoaded(true);
    }
  }, [key]);

  const setToggle = useCallback(
    (v: T | ((prev: T) => T)) => {
      if (typeof window !== "undefined") {
        setValue((prev) => {
          const newValue =
            typeof v === "function" ? (v as (prev: T) => T)(prev) : v;
          localStorage.setItem(key, JSON.stringify(newValue));
          return newValue;
        });
      }
    },
    [key]
  );

  return [value, setToggle, isLoaded] as const;
}
