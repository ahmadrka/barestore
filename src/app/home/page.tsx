"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/api/users";
import { getStores } from "@/lib/api/stores";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import button from "@/component/Styles/Button.module.css";
import { UserStore } from "@/type/userStores";
import { UserProfile } from "@/type/users";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import Icon from "@/component/Icon/Icon";
import usePreference from "@/hook/usePreference";

export default function SetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [stores, setStores] = useState<UserStore[] | null>(null);
  const [storeSelection, setStoreSelection] = usePreference("storeSelection");
  const [showSelection, setShowSelection] = usePreference("showSelection");

  const fetchData = async () => {
    try {
      const userData = await getUser();
      if (userData) setUserData(userData);

      const storesData = await getStores();
      if (storesData && Array.isArray(storesData)) {
        setStores(storesData as UserStore[]);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleStoreClick = (storeId: number) => {
    setStoreSelection(storeId);
    router.push(`/dashboard`);
  };

  useEffect(() => {
    if (showSelection != null && storeSelection != null) {
      router.push(`/dashboard`);
    }
  }, [showSelection, storeSelection, router]);

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  if (loading) return Loading();

  return (
    <div className={styles.parent}>
      <main className={styles.main}>
        <div className={styles.home}>
          <Image
            src={userData?.avatar || "/images/default/user-avatar.png"}
            alt={userData?.name || "User"}
            width={100}
            height={100}
          />
          <div className={styles.title}>
            <h1>Welcome, {userData?.name}</h1>
            <p>
              {stores?.length
                ? "select a store to start"
                : "join or create store to get started"}
            </p>
          </div>
          <div
            className={styles.itemList}
            style={{ display: stores?.length ? "flex" : "none" }}
          >
            {stores?.map((store) => {
              const days = [
                "sunday",
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
              ] as const;
              const now = new Date();
              const dayName = days[now.getDay()];
              const operatingHour = store.store.operatingHour[dayName];
              const currentTime = now.getHours() * 60 + now.getMinutes();
              const parseTime = (timeStr: string) => {
                const [hrs, mins] = timeStr.split(":").map(Number);
                return hrs * 60 + mins;
              };

              const isOpen =
                operatingHour.isOpen &&
                currentTime >= parseTime(operatingHour.open) &&
                currentTime <= parseTime(operatingHour.close);

              return (
                <button
                  key={store.storeId}
                  onClick={() => handleStoreClick(store.storeId)}
                  className={styles.item}
                >
                  <Image
                    src={
                      store.store.avatar || "/images/default/store-avatar.png"
                    }
                    alt={store.store.name || "Store"}
                    width={100}
                    height={100}
                    unoptimized
                  />
                  <span className={styles.title}>
                    <h2>{store.store.name}</h2>
                    <h3>{store.store.description}</h3>
                  </span>
                  <div
                    className={`${styles.status} ${
                      store.store.storeStatus !== "ACTIVE"
                        ? styles.inactive
                        : isOpen
                        ? styles.open
                        : styles.closed
                    }`}
                  >
                    <Icon
                      name={
                        store.store.storeStatus !== "ACTIVE"
                          ? "clockExclamation"
                          : isOpen
                          ? "clockCheck"
                          : "clockMinus"
                      }
                      width={20}
                    />
                    {store.store.storeStatus !== "ACTIVE"
                      ? "Inactive"
                      : isOpen
                      ? "Open"
                      : "Closed"}
                  </div>
                </button>
              );
            })}
          </div>

          <div className={stores?.length === 0 ? styles.nextZero : styles.next}>
            <Link href="/home/joinstore" className={button.primary}>
              {stores?.length === 0 && <Icon name="storeJoin" width={32} />}
              Join Store
            </Link>
            <Link href="/home/createstore" className={button.secondary}>
              {stores?.length === 0 && <Icon name="storeAdd" width={36} />}
              Create Store
            </Link>
          </div>
        </div>
        {stores?.length === 0
          ? null
          : showSelection == null && (
              <button
                onClick={() => setShowSelection(false)}
                className={styles.button}
              >
                <u>don't show this again</u>
              </button>
            )}
      </main>
    </div>
  );
}
