"use client";
import { useEffect, useState } from "react";

export default function useToggle(key: string, initial: boolean = false) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initial;

    const stored = localStorage.getItem(key);
    if (stored !== null) return JSON.parse(stored);

    return initial;
  });

  const getToggle = () => {
    if (typeof window !== "undefined") {
    }
  };

  const setToggle = (v?: boolean) => {
    const newValue = v ?? !value;

    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    }
  };

  useEffect(() => {
    getToggle();
  }, [key]);

  return [value, setToggle] as const;
}
