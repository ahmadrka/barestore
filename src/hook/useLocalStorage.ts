"use client";

import { useEffect, useState } from "react";

export default function useLocalStorage(key: string, initial?: string) {
  const [value, setValue] = useState(initial || "");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(key);
    if (stored !== null) setValue(stored);
  }, []);

  const setToggle = (v: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, v);
      setValue(v);
    }
  };

  return [value, setToggle] as const;
}
