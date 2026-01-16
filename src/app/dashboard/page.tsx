"use client";
import PanelNavbar from "@/component/PanelNavbar/PanelNavbar";
import styles from "./styles.module.css";
import Image from "next/image";
import MainHeader from "@/component/MainHeader/MainHeader";
import { useEffect } from "react";
import { getUser } from "@/lib/api/users";
import { InfoMenu } from "@/component/InfoMenu/InfoMenu";
import { UserProfile } from "@/type/user";
import { useState } from "react";
import Icon from "@/component/Icon/Icon";
import usePreferences from "@/hook/usePreferences";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import { StoreInfo } from "@/type/store";
import { getStoreInfo, getStores } from "@/lib/api/stores";

export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserProfile | null>();
  const [greeting, setGreeting] = useState<string>("");
  const [storeInfo, setStoreInfo] = useState<StoreInfo>();
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const { preferences, setPreference, isLoaded } = usePreferences();

  const storeSelection = preferences.storeSelection;

  const updateClock = () => {
    let clock = new Date().toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    clock = clock.replace(".", ":");

    const newDate = new Date().toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    setDate((prev) => {
      if (prev !== newDate) {
        return newDate;
      }
      return prev;
    });

    setTime(clock);

    const hour = new Date().getHours();
    let greet = "";

    if (hour >= 5 && hour < 12) greet = "Good Morning";
    else if (hour >= 12 && hour < 17) greet = "Good Afternoon";
    else if (hour >= 17 && hour < 20) greet = "Good Evening";
    else greet = "Good Night";

    setGreeting(greet);
  };

  const updateStoreInfo = async () => {
    if (!storeSelection) return;
    const data = await getStoreInfo(storeSelection);
    if (data) setStoreInfo(data);
  };

  useEffect(() => {
    if (isLoaded && !storeSelection) {
      router.replace("/home?redirect=/dashboard");
    }
  }, [isLoaded, storeSelection, router]);

  const fetchData = async () => {
    const data = await getUser();
    if (data) setUserData(data);
  };

  useEffect(() => {
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchData();
    if (storeSelection) updateStoreInfo();
  }, [isLoaded, storeSelection]);

  if (!isLoaded || (isLoaded && !storeSelection)) return <Loading />;

  return (
    <main className={styles.dashboard}>
      <div className={styles.dashboardMain}>
        <div className={styles.sectionContainer}>
          <section className={styles.avability}>
            <div className={styles.sectionIcon}>
              <Icon name="plus" width={75} height={75} />
              <Icon name="chevronRight" width={66} height={66} />
            </div>
            <div className={styles.sectionDescription}>
              <h1>Avability</h1>
              <h2>{storeInfo?.productsCount} Products</h2>
            </div>
          </section>
          <section className={styles.activeStaff}>
            <div className={styles.sectionIcon}>
              <Icon name="person" width={75} height={75} />
              <Icon name="chevronRight" width={66} height={66} />
            </div>
            <div className={styles.sectionDescription}>
              <h1>Active Staff</h1>
              <h2>{storeInfo?.memberCount} Active</h2>
            </div>
          </section>
          <section className={styles.readyStock}>
            <div className={styles.sectionIcon}>
              <Icon name="cardboard" width={75} height={75} />
              <Icon name="chevronRight" width={66} height={66} />
            </div>
            <div className={styles.sectionDescription}>
              <h1>Ready Stock</h1>
              <h2>{storeInfo?.readyStock} Items</h2>
            </div>
          </section>
          <section className={styles.outofStock}>
            <div className={styles.sectionIcon}>
              <Icon name="cardboard" width={75} height={75} />
              <Icon name="chevronRight" width={66} height={66} />
            </div>
            <div className={styles.sectionDescription}>
              <h1>Out of Stock</h1>
              <h2>{storeInfo?.outofStock} Items</h2>
            </div>
          </section>
          <section className={styles.categories}>
            <div className={styles.sectionIcon}>
              <Icon name="cardboard" width={75} height={75} />
              <Icon name="chevronRight" width={66} height={66} />
            </div>
            <div className={styles.sectionDescription}>
              <h1>Categories</h1>
              <h2>{storeInfo?.categoriesCount} Categories</h2>
            </div>
          </section>
          <section className={styles.workingHour}>
            <div className={styles.sectionIcon}>
              <Icon name="cardboard" width={75} height={75} />
              <Icon name="chevronRight" width={66} height={66} />
            </div>
            <div className={styles.sectionDescription}>
              <h1>Working Hour</h1>
              <h2>{storeInfo?.outofStock}</h2>
            </div>
          </section>
        </div>
      </div>
      <InfoMenu>
        <InfoMenu.Thumbnail
          src="/images/banner/store-banner.png"
          width={1600}
          height={900}
          aspectRatio={{ width: 16, height: 9 }}
        />
        <InfoMenu.Main className={styles.infoMenu}>
          <InfoMenu.Component className={styles.infoComponent}>
            <h1>Hi, {userData?.name || "There"} 👋</h1>
            <h2>{greeting}</h2>
          </InfoMenu.Component>
        </InfoMenu.Main>
      </InfoMenu>
    </main>
  );
}
