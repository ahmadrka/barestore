"use client";
import PanelNavbar from "@/component/PanelNavbar/PanelNavbar";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/api/profile";

export default function dashboard() {
  const [userData, setUserData] = useState<UserProfile | null>();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [greeting, setGreeting] = useState("");

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

  const fetchData = async () => {
    try {
      const data = await getUser(1);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.parent}>
      <PanelNavbar status="dashboard" />
      <main className={styles.main}>
        <div className={styles.mainChild}>
          <section className={`${styles.section} ${styles.header}`}>
            <div className={styles.status}>
              <span className={styles.clock}>
                <span>{time}</span>
              </span>
              <span className={styles.date}>{date}</span>
            </div>
            <div className={styles.greeting}>
              <span>Hi, {userData?.name}</span>
              <h1>{greeting}</h1>
            </div>
          </section>
          <section className={styles.section}>Store Status</section>
          <section className={styles.section}>Staff Online</section>
          <section className={styles.section}>Working Hour</section>
          <section className={styles.section}>Selling Per Hour</section>
          <section className={styles.section}>Selling Per Day</section>
          <section className={styles.section}>Selling Per Week</section>
          <section className={styles.section}>Stock In</section>
          <section className={styles.section}>Stock Total</section>
          <section className={styles.section}>Out Of Stock</section>
        </div>
      </main>
    </div>
  );
}
