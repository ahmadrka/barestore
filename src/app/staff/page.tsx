"use client";
import { Suspense } from "react";
import PanelNavbar from "@/component/PanelNavbar/PanelNavbar";
// import PanelMenu from "@/component/PanelMenu-old/PanelMenu";
import styles from "./styles.module.css";
import Loading from "../loading";

export default function StaffContent() {
  const panelMenuProps = {
    storage: "staff",
    title: "Staff Management",
    subtitle: "1234 Members",
    sort: [
      { id: 1, name: "Last Online", value: "last_online" },
      { id: 2, name: "Newest", value: "newest" },
      { id: 3, name: "Oldest", value: "oldest" },
      { id: 4, name: "A-Z", value: "a_z" },
      { id: 5, name: "Z-A", value: "z_a" },
    ],
    filter: [
      { id: 1, name: "All", value: "all" },
      { id: 2, name: "Owner", value: "owner" },
      { id: 3, name: "Manager", value: "manager" },
      { id: 4, name: "Cashier", value: "cashier" },
      { id: 5, name: "Staff", value: "staff" },
    ],
    defaultView: "plot" as const,
  };

  return (
    <div className={styles.parent}>
      <main className={styles.main}>
        {/* <PanelMenu data={panelMenuProps} /> */}
      </main>
    </div>
  );
}
