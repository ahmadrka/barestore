import styles from "./MainHeader.module.css";
import Image from "next/image";

export default function MainHeader({ title = "Dashboard" }: { title: string }) {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
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
