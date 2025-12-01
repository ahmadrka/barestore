import PanelNavbar from "@/component/PanelNavbar/PanelNavbar";
import styles from "./styles.module.css";

export default function statistic() {
  return (
    <div className={styles.parent}>
      <PanelNavbar status="statistic" />
      <main className={styles.main}></main>
    </div>
  );
}
