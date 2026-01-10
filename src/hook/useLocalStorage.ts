"use client";

import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(key);
    if (stored !== null) {
      try {
        setValue(JSON.parse(stored));
      } catch (error) {
        // If parsing fails, treat it as a plain string or the initial value
        setValue(stored as unknown as T);
      }
    }
  }, [key]);

  const setToggle = (v: T) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(v));
      setValue(v);
    }
  };

  return [value, setToggle] as const;
}
