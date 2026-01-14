"use client";
import useLocalStorage from "./useLocalStorage";
export default function usePreferences() {
  const [preferences, setPreferences, isLoaded] = useLocalStorage<
    Record<string, any>
  >("barestorePreference", {});
  // Fungsi untuk mengupdate satu atau banyak key sekaligus
  const updatePreferences = (newPrefs: Record<string, any>) => {
    setPreferences({
      ...preferences,
      ...newPrefs,
    });
  };
  // Fungsi spesifik untuk mengeset satu key saja agar lebih mudah
  const setPreference = (key: string, value: any) => {
    setPreferences({
      ...preferences,
      [key]: value,
    });
  };
  return { preferences, setPreference, updatePreferences, isLoaded };
}
