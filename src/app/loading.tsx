import styles from "@/style/Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.parent}>
      <main className={styles.main}>
        <div className={styles.loader}></div>
      </main>
    </div>
  );
}
