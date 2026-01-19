"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/api/users";
import { getStores } from "@/lib/api/stores";
import styles from "./styles.module.css";
import items from "@/component/Styles/ItemList.module.css";
import Image from "next/image";
import Link from "next/link";
import button from "@/component/Styles/Button.module.css";
import { UserStore } from "@/type/userStore";
import { UserProfile } from "@/type/user";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import Icon from "@/component/Icon/Icon";
import usePreferences from "@/hook/usePreferences";
import { useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "@/lib/helper/cookies";
import { Token } from "@/type/token";
import useLocalStorage from "@/hook/useLocalStorage";

export default function SetupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [stores, setStores] = useState<UserStore[] | null>(null);
  const { preferences, setPreference, isLoaded } = usePreferences();
  const [token, setToken] = useState<Token>();
  const [isAdmin, setIsAdmin, isAdminLoaded] = useLocalStorage<Token | null>(
    "isAdmin",
    null
  );

  const storeSelection = preferences.storeSelection;
  const showSelection = preferences.showSelection;

  const adminDashboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (token) setIsAdmin(token);
    router.replace("/dashboard");
  };

  const fetchData = async () => {
    try {
      const token = await getCookie("accessToken");
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          setToken(decoded);
          console.log("Decoded tokens: ", decoded);
          // Contoh akses data:
          // console.log(decoded.sub); // Biasanya ID User
          // console.log(decoded.role); // Role (Admin/User)
          // console.log(decoded.exp); // Waktu kadaluarsa (Unix timestamp)
        } catch (err) {
          console.error("Token decode error:", err);
        }
      }
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
    setIsAdmin(null);
    setPreference("storeSelection", storeId);
    router.replace(redirect || `/dashboard`);
  };

  useEffect(() => {
    if (isLoaded && showSelection === false && storeSelection) {
      const target = redirect || `/dashboard`;
      if (target !== "/home") {
        router.replace(target);
      }
    }
  }, [isLoaded, showSelection, storeSelection, router]);

  useEffect(() => {
    fetchData().finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading || !isLoaded) return <Loading />;

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
            className={items.itemList}
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
              const operatingHour = store.store.operatingHour?.[dayName];
              const currentTime = now.getHours() * 60 + now.getMinutes();
              const parseTime = (timeStr: string) => {
                const [hrs, mins] = timeStr.split(":").map(Number);
                return hrs * 60 + mins;
              };

              const isOpen = operatingHour
                ? operatingHour.isOpen &&
                  currentTime >= parseTime(operatingHour.open) &&
                  currentTime <= parseTime(operatingHour.close)
                : store.store.storeStatus === "ACTIVE";

              return (
                <button
                  key={store.storeId}
                  onClick={() => handleStoreClick(store.storeId)}
                  className={items.item}
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
                  <span className={items.title}>
                    <h2>{store.store.name}</h2>
                    <h3>{store.store.description}</h3>
                  </span>
                  <div
                    className={`${items.status} ${
                      store.store.storeStatus !== "ACTIVE"
                        ? items.inactive
                        : isOpen
                        ? items.open
                        : items.closed
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
          {(token?.role === "ADMIN" || token?.role === "SUPERADMIN") && (
            <button
              onClick={(e) => adminDashboard(e)}
              className={button.primary}
              style={{ width: "100%" }}
            >
              ADMIN DASHBOARD
            </button>
          )}
        </div>
        {stores?.length === 0
          ? null
          : showSelection == null && (
              <button
                onClick={() => {
                  setPreference("showSelection", false);
                }}
                className={styles.button}
              >
                <u>don't show this again</u>
              </button>
            )}
      </main>
    </div>
  );
}
