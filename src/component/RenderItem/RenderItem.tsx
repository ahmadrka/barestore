"use client";
import { useEffect, useState } from "react";
// import { getProducts, getStoreProfile } from "@/lib/api/profile";
import styles from "./RenderItem.module.css";
import Image from "next/image";
import Icon from "../Icon/Icon";
import { useRouter } from "next/navigation";
import { ContextMenu } from "../ContextMenu/ContextMenu";
import type { Product } from "@/type/product";
import type { StoreProfile } from "@/type/store";

export default function RenderItem() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>();
  const [store, setStore] = useState<StoreProfile>();

  const openItem = (productId: number, storeId: number | undefined) => {
    router.push(`/products/${productId}.${storeId}`);
  };

  const openContextMenu = (id: number) => {
    console.log(`Context menu for ${id}`);
  };

  // const fetchData = async () => {
  //   try {
  //     const data = await getProducts();
  //     setProducts(data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }

  //   try {
  //     const data = await getStoreProfile();
  //     setStore(data);
  //   } catch (error) {
  //     console.error("Error fetching store profile:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className={styles.parent}>
      <div className={styles.info}>
        <span>Name</span>
        <span>Stock</span>
        <span>Last Updated</span>
      </div>
      <ul className={styles.itemList}>
        {products?.map((data) => (
          <li
            className={styles.item}
            key={data.productId}
            onDoubleClick={() => openItem(data.productId, store?.storeId)}
            onContextMenu={(e) => {
              e.preventDefault();
              openContextMenu(data.productId);
            }}
          >
            <div className={styles.itemTitle}>
              <Image
                src={
                  data.images[0]?.url || "/images/default/product-thumbnail.png"
                }
                width={42}
                height={42}
                alt="Thumbnail"
                unoptimized
              />
              <h3>{data.title}</h3>
            </div>
            <div className={styles.itemDescription}>
              <span>{data.stock || "N/A"}</span>
              <span className={styles.date}>
                {new Date(data.updatedAt || data.createdAt)
                  .toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })
                  .replace(",", " ")}{" "}
              </span>
              {/* <button>
                <Icon name="dots" width={20} />
              </button> */}
              <button>Open</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
