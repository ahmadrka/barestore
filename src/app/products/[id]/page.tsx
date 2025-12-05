import { notFound } from "next/navigation";
import styles from "./styles.module.css";
import PanelNavbar from "@/component/PanelNavbar/PanelNavbar";

export default async function getProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [productId, storeId] = (await params).id.split(".");

  if (isNaN(Number(productId)) || isNaN(Number(storeId))) {
    throw notFound();
  }

  return (
    <div className={styles.parent}>
      <PanelNavbar status="products" />
      <main className={styles.main}>
        getProduct : {productId} {storeId}
      </main>
    </div>
  );
}
