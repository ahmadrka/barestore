import { usePreferenceContext } from "@/context/PreferenceProvider";

export default function usePreferences() {
  return usePreferenceContext();
}
