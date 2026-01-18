"use client";

import styles from "./MainHeader.module.css";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import usePreferences from "@/hook/usePreferences";
import { getStores } from "@/lib/api/stores";
import { UserStore } from "@/type/userStore";
import { useEffect, useState } from "react";
import { StoreProfile } from "@/type/store";

export default function MainHeader({
  title = "Dashboard",
}: {
  title?: string;
}) {
  const router = useRouter();
  const [stores, setStores] = useState<StoreProfile>();
  const { preferences, setPreference, isLoaded } = usePreferences();

  const storeSelection = preferences.storeSelection;

  const changeStore = () => {
    setPreference("storeSelection", null);
  };

  const fetchData = async (id: number) => {
    try {
      const storesData = await getStores(id);
      if (storesData) {
        // Check if response is UserStore (has 'store' property) or StoreProfile
        const data = (storesData as any).store || storesData;
        setStores(data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const pathname = usePathname();
  const allowedPathnames = [
    "/dashboard",
    "/products",
    "/staff",
    "/statistic",
    "/transactions",
  ];
  const titleList = {
    "/dashboard": "Dashboard",
    "/products": "Products Management",
    "/staff": "Staff",
    "/statistic": "Statistic",
    "/transactions": "Transactions",
  };

  const activePath = allowedPathnames.find((path) => pathname.startsWith(path));
  const displayTitle = titleList[activePath as keyof typeof titleList] || title;

  useEffect(() => {
    if (storeSelection) {
      setStores(undefined); // Clear previous store data to avoid stale state display
      fetchData(Number(storeSelection));
    }
  }, [storeSelection, isLoaded]);

  return (
    <header
      className={styles.header}
      style={{
        display: activePath ? "flex" : "none",
      }}
    >
      <h1>{displayTitle}</h1>
      <DropdownMenu>
        <DropdownMenu.Trigger className={styles.storeProfile}>
          <div className={styles.title}>
            <h2>{stores?.name || "Loading..."}</h2>
            <h3>{stores?.description || "No Description"}</h3>
          </div>
          <Image
            src={stores?.avatar || "/images/default/store-avatar.png"}
            alt="store"
            width={64}
            height={64}
            unoptimized
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content position="right">
          <DropdownMenu.Section>
            <DropdownMenu.Item>Store Management</DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => changeStore()}>
              Change Store
            </DropdownMenu.Item>
          </DropdownMenu.Section>
        </DropdownMenu.Content>
      </DropdownMenu>
    </header>
  );
}
