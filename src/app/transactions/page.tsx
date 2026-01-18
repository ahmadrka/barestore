"use client";

import { getStores } from "@/lib/api/stores";
import { getUser } from "@/lib/api/users";
import { UserStore } from "@/type/userStore";
import { useEffect, useState } from "react";
import usePreferences from "@/hook/usePreferences";

export default function Transactions() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [stores, setStores] = useState<UserStore[]>([]);
  const { preferences, setPreference, isLoaded } = usePreferences();

  const storeSelection = preferences.storeSelection;

  const fetchData = async () => {
    try {
      const storesData = await getStores();
      if (storesData && Array.isArray(storesData)) {
        setStores(storesData as UserStore[]);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData().finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1>Transactions</h1>
    </div>
  );
}
