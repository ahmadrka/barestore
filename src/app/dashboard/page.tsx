"use client";
import PanelNavbar from "@/component/PanelNavbar/PanelNavbar";
import styles from "./styles.module.css";
import Image from "next/image";
import MainHeader from "@/component/MainHeader/MainHeader";

export default function Dashboard() {
  return (
    <div className={styles.parent}>
      <PanelNavbar status="dashboard" />
      <main className={styles.main}>
        <MainHeader title="Dashboard" />
      </main>
    </div>
  );
}
