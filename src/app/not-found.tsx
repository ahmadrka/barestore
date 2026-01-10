import styles from "@/component/Styles/NotFound.module.css";

export default function notFound() {
  return (
    <div className={styles.parent}>
      <main className={styles.main}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        {/* <p>
          Sorry, page you looking for is not available or broken. Please try
          again later.
        </p> */}
      </main>
    </div>
  );
}
