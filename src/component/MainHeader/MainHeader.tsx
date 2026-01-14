"use client";

import styles from "./MainHeader.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function MainHeader({
  title = "Dashboard",
}: {
  title?: string;
}) {
  const pathname = usePathname();
  const allowedPathnames = ["/dashboard", "/products", "/staff", "/statistic"];
  const titleList = {
    "/dashboard": "Dashboard",
    "/products": "Products Management",
    "/staff": "Staff",
    "/statistic": "Statistic",
  };

  const activePath = allowedPathnames.find((path) => pathname.startsWith(path));
  const displayTitle = titleList[activePath as keyof typeof titleList] || title;

  return (
    <header
      className={styles.header}
      style={{
        display: activePath ? "flex" : "none",
      }}
    >
      <h1>{displayTitle}</h1>
      <div className={styles.storeProfile}>
        <div className={styles.title}>
          <h2>Asa Store</h2>
          <h3>Book Store</h3>
        </div>
        <Image
          src="/images/default/store-avatar.png"
          alt="store"
          width={64}
          height={64}
        />
      </div>
    </header>
  );
}
