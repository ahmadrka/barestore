"use client";

import { useContext, useEffect, useState } from "react";
import { ToggleContext } from "@/context/ToggleProvider/ToggleProvider";
import { getUser } from "@/lib/api/users";
import styles from "./PanelNavbar.module.css";
import Image from "next/image";
import Link from "next/link";
import Icon from "../Icon/Icon";
import { UserProfile } from "@/type/users";

export default function PanelNavbar({ status }: { status: string }) {
  const context = useContext(ToggleContext)!;
  const [userData, setUserData] = useState<UserProfile | null>(null);

  const fetchData = async () => {
    try {
      const data = await getUser();
      if (data) setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <nav
      className={
        context.panelNavbar
          ? `${styles.parent}`
          : `${styles.parent} ${styles.parentActive}`
      }
    >
      <ul className={styles.list}>
        <li className={styles.logo}>
          <button className={styles.icon} onClick={context.togglePanelNavbar}>
            <Icon name="logo" width={32} />
          </button>
          <span>BareHouse</span>
        </li>
      </ul>
      <ul className={styles.list}>
        <li>
          <Link href={"/dashboard"}>
            <button
              className={
                status == "dashboard"
                  ? `${styles.iconActive}`
                  : `${styles.icon}`
              }
            >
              <Icon
                name={status == "dashboard" ? "dashboardActive" : "dashboard"}
                width={32}
              />
            </button>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href={"/products"}>
            <button
              className={
                status == "products" ? `${styles.iconActive}` : `${styles.icon}`
              }
            >
              <Icon
                name={status == "products" ? "clipboardActive" : "clipboard"}
                width={32}
              />
            </button>
            <span>Product</span>
          </Link>
        </li>
        <li>
          <Link href={"/staff"}>
            <button
              className={
                status == "staff" ? `${styles.iconActive}` : `${styles.icon}`
              }
            >
              <Icon
                name={status == "staff" ? "personActive" : "person"}
                width={32}
              />
            </button>
            <span>Staff</span>
          </Link>
        </li>
        <li>
          <Link href={"/statistic"}>
            <button
              className={
                status == "statistic"
                  ? `${styles.iconActive}`
                  : `${styles.icon}`
              }
            >
              <Icon
                name={status == "statistic" ? "piechartActive" : "piechart"}
                width={32}
              />
            </button>
            <span>Statistic</span>
          </Link>
        </li>
      </ul>
      <ul className={styles.list}>
        <li>
          <button className={styles.icon}>
            <div className={styles.profilePic}>
              {userData?.avatar ? (
                <Image
                  src={userData?.avatar ?? ""}
                  alt="Avatar"
                  width={32}
                  height={32}
                />
              ) : (
                <Icon name="personActive" width={32} />
              )}
            </div>
          </button>
          <span>{userData?.name ? userData.name : "Log In"}</span>
        </li>
      </ul>
    </nav>
  );
}
